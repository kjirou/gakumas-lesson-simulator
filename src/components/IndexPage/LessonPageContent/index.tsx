import { Button } from "@headlessui/react";
import {
  GamePlay,
  LessonDisplay,
  endTurn,
  generateCardPlayPreviewDisplay,
  generateLessonDisplay,
  getIdolParameterKindOnTurn,
  getLesson,
  getNextPhase,
  initializeGamePlay,
  playCard,
  skipTurn,
  startTurn,
} from "gakumas-core";
import React, { useCallback, useEffect, useState } from "react";
import { PageContent } from "../PageContent";
import { ActionEndOrNotPreview } from "./ActionEndOrNotPreview";
import { CardListInHand } from "./CardListInHand";
import { CardPlayPreview } from "./CardPlayPreview";
import { IdolInformation } from "./IdolInformation";
import { ModifierList } from "./ModifierList";
import { ProducerItemList } from "./ProducerItemList";
import { ScoreInformation } from "./ScoreInformation";
import { SkipButton } from "./SkipButton";
import { TurnInformation } from "./TurnInformation";
import { InitializeGamePlayParams, createCharacterFullName } from "../utils";

type ActionEndOrNotPreviewProps = React.ComponentProps<
  typeof ActionEndOrNotPreview
>;
type CardListInHandProps = React.ComponentProps<typeof CardListInHand>;
type CardPlayPreviewProps = React.ComponentProps<typeof CardPlayPreview>;
type IdolInformationProps = React.ComponentProps<typeof IdolInformation>;
type ModifierListProps = React.ComponentProps<typeof ModifierList>;
type ProducerItemListProps = React.ComponentProps<typeof ProducerItemList>;
type ScoreInformationProps = React.ComponentProps<typeof ScoreInformation>;
type SkipButtonProps = React.ComponentProps<typeof SkipButton>;
type TurnInformationProps = React.ComponentProps<typeof TurnInformation>;

type Props = {
  gamePlaySettings: InitializeGamePlayParams;
};

const LessonPageContentRaw: React.FC<Props> = (props) => {
  const [gamePlay, setGamePlay] = useState<GamePlay>(() =>
    initializeGamePlay(props.gamePlaySettings),
  );
  // 状態遷移をアニメーションで表現したい場合は、画面表示用のこの状態も gamePlay とは別に保持する必要がある
  // ゲームの内部処理上は即座に終わって gamePlay に反映するので、 gamePlay やそれから生成する lesson に紐づく表示はその瞬間に変わってしまうため
  const [lessonDisplay, setLessonDisplay] = useState<LessonDisplay>(() =>
    generateLessonDisplay(gamePlay),
  );
  const [selectedCardIndex, setSelectedCardIndex] = useState<
    number | undefined
  >();
  const nextPhase = getNextPhase(gamePlay);
  const lesson = getLesson(gamePlay);
  useEffect(() => {
    switch (nextPhase) {
      case "playerInput": {
        break;
      }
      case "lessonEnd": {
        break;
      }
      case "turnEnd": {
        const newGamePlay = endTurn(gamePlay);
        setGamePlay(newGamePlay);
        setLessonDisplay(generateLessonDisplay(newGamePlay));
        break;
      }
      case "lessonStart":
      case "turnStart": {
        const newGamePlay = startTurn(gamePlay);
        setGamePlay(newGamePlay);
        setLessonDisplay(generateLessonDisplay(newGamePlay));
        break;
      }
      default:
        const unreachable: never = nextPhase;
        throw new Error("Unreachable statement");
    }
  }, [lesson.turnNumber, nextPhase]);
  // TODO: lessonDisplay から取得する
  const idolParameterKind = getIdolParameterKindOnTurn(lesson);
  const isActionEnabled = nextPhase === "playerInput";
  const turnInformation: TurnInformationProps = lessonDisplay.currentTurn;
  const producerItemList: ProducerItemListProps = {
    producerItems: lessonDisplay.producerItems,
  };
  let scoreInformation: ScoreInformationProps = {
    score: lessonDisplay.score,
    idolParameterKind,
    scoreBonus: lessonDisplay.scoreBonus,
  };
  let idolInformation: IdolInformationProps = {
    fullName: createCharacterFullName(lesson.idol.data.characterId),
    life: lessonDisplay.life,
    maxLife: lessonDisplay.maxLife,
    vitality: lessonDisplay.vitality,
  };
  let modifierList: ModifierListProps = { modifiers: lessonDisplay.modifiers };
  let cardPlayPreview: CardPlayPreviewProps | undefined = undefined;
  let actionEndOrNotPreview: ActionEndOrNotPreviewProps | undefined = undefined;
  if (selectedCardIndex !== undefined) {
    const cardPlayPreviewDisplay = generateCardPlayPreviewDisplay(
      gamePlay,
      selectedCardIndex,
    );
    scoreInformation = {
      ...scoreInformation,
      score: cardPlayPreviewDisplay.lessonDelta.score.after,
      scoreDelta: cardPlayPreviewDisplay.lessonDelta.score.delta,
    };
    idolInformation = {
      ...idolInformation,
      life: cardPlayPreviewDisplay.lessonDelta.life.after,
      lifeDelta: cardPlayPreviewDisplay.lessonDelta.life.delta,
      vitality: cardPlayPreviewDisplay.lessonDelta.vitality.after,
      vitalityDelta: cardPlayPreviewDisplay.lessonDelta.vitality.delta,
    };
    modifierList = { modifiers: cardPlayPreviewDisplay.lessonDelta.modifires };
    cardPlayPreview = {
      onClick: () => {},
      preview: cardPlayPreviewDisplay,
    };
    actionEndOrNotPreview = {
      willEnd: cardPlayPreviewDisplay.hasActionEnded,
    };
  }
  const onClickLessonPageContent = useCallback(() => {
    setSelectedCardIndex(undefined);
  }, []);
  const onClickRestartLessonButton = useCallback(() => {
    setSelectedCardIndex(undefined);
    const newGamePlay = initializeGamePlay(props.gamePlaySettings);
    setGamePlay(newGamePlay);
    setLessonDisplay(generateLessonDisplay(newGamePlay));
  }, [props.gamePlaySettings]);
  const onClickCardInHand = useCallback(
    (selectedCardIndex_: number) => {
      if (isActionEnabled) {
        if (selectedCardIndex_ === selectedCardIndex) {
          const cardInHandDisplay = lessonDisplay.hand[selectedCardIndex_];
          if (cardInHandDisplay.playable) {
            const newGamePlay = playCard(gamePlay, selectedCardIndex_);
            setSelectedCardIndex(undefined);
            setGamePlay(newGamePlay);
            setLessonDisplay(generateLessonDisplay(newGamePlay));
          }
        } else {
          setSelectedCardIndex(selectedCardIndex_);
        }
      }
    },
    [selectedCardIndex, isActionEnabled],
  );
  const onClickSkipButton = useCallback(() => {
    if (isActionEnabled) {
      const newGamePlay = skipTurn(gamePlay);
      setSelectedCardIndex(undefined);
      setGamePlay(newGamePlay);
      setLessonDisplay(generateLessonDisplay(newGamePlay));
    }
  }, [gamePlay]);
  const skipButton: SkipButtonProps = {
    lifeRecoveredBySkippingTurn: lessonDisplay.lifeRecoveredBySkippingTurn,
    onClick: onClickSkipButton,
  };
  const cardListInHand: CardListInHandProps = {
    hand: lessonDisplay.hand,
    idolParameterKind,
    selectedCardIndex,
    onClick: onClickCardInHand,
  };
  return (
    <PageContent onClick={onClickLessonPageContent}>
      <div className="h-[40px] flex">
        <Button
          className="p-2 text-xs border"
          onClick={onClickRestartLessonButton}
        >
          リスタート
        </Button>
      </div>
      <div className="h-[160px] flex justify-center items-center bg-slate-100">
        <div className="flex-1">
          <TurnInformation {...turnInformation} />
        </div>
        <div className="flex-1 h-full">
          <ScoreInformation {...scoreInformation} />
        </div>
        <div className="flex-1">
          <IdolInformation {...idolInformation} />
        </div>
      </div>
      <div className="h-[280px] flex">
        <div className="flex-1 w-6/12">
          <ModifierList {...modifierList} />
        </div>
        <div className="flex-1 w-6/12">
          <ProducerItemList {...producerItemList} />
        </div>
      </div>
      <CardListInHand {...cardListInHand} />
      <div className="h-[80px]"></div>
      {actionEndOrNotPreview && (
        <div className="absolute top-[412px] left-[4px] z-5">
          <ActionEndOrNotPreview {...actionEndOrNotPreview} />
        </div>
      )}
      <div className="absolute top-[412px] right-[52px] z-5">
        <SkipButton {...skipButton} />
      </div>
      {cardPlayPreview && <CardPlayPreview {...cardPlayPreview} />}
      {nextPhase === "lessonEnd" && (
        <div className="absolute w-full top-[330px] text-lg text-center text-slate-500">
          レッスン終了
        </div>
      )}
    </PageContent>
  );
};

export const LessonPageContent = React.memo(LessonPageContentRaw);
