import {
  CardPlayPreviewDisplay,
  GamePlay,
  LessonDisplay,
  ModifierDisplay,
  endTurn,
  generateCardPlayPreviewDisplay,
  generateLessonDisplay,
  getCardSetDataById,
  getIdolParameterKindOnTurn,
  getLesson,
  getNextPhase,
  initializeGamePlay,
  playCard,
  skipTurn,
  startTurn,
} from "gakumas-core";
import React, { useCallback, useEffect, useState } from "react";
import { IndexPageView } from "./View";
import { createCharacterFullName } from "./utils";

type Props = React.ComponentProps<typeof IndexPageView>;

export const useIndexPage = (): Props => {
  const [gamePlay, setGamePlay] = useState<GamePlay>(() => {
    const cardSetData = getCardSetDataById("defaultLogicMotivation");
    let gamePlay = initializeGamePlay({
      idolDataId: "kuramotochina-ssr-1",
      specialTrainingLevel: 3,
      talentAwakeningLevel: 2,
      cards: [
        { id: "hombanzenya", enhanced: true },
        { id: "hombanzenya" },
        { id: "genkinaaisatsu", enhanced: true },
        { id: "watashigasuta", enhanced: true },
        { id: "watashigasuta", enhanced: true },
        { id: "watashigasuta" },
        { id: "kokumintekiaidoru" },
        ...cardSetData.cardDataIds.map((cardDataId: any) => ({
          id: cardDataId,
        })),
      ],
      producerItems: [{ id: "masukottohikonin" }],
      turns: ["dance", "visual", "vocal", "dance", "dance", "dance", "dance"],
      // clearScoreThresholds: { clear: 100, perfect: 200 },
      clearScoreThresholds: { clear: 1700 },
      scoreBonus: { vocal: 400, dance: 1500, visual: 1200 },
    });
    return gamePlay;
  });
  // 状態遷移をアニメーションで表現したい場合は、画面表示用のこの状態も gamePlay とは別に保持する必要がある
  // ゲームの内部処理上は即座に終わって gamePlay に反映するので、 gamePlay やそれから生成する lesson に紐づく表示はその瞬間に変わってしまうため
  const [lessonDisplay, setLessonDisplay] = useState<LessonDisplay>(() => {
    return generateLessonDisplay(gamePlay);
  });
  const [selectedCardIndex, setSelectedCardIndex] =
    useState<Props["selectedCardIndex"]>();
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
  const isActionEnabled = nextPhase === "playerInput";
  let scoreInformation: Props["scoreInformation"] = {
    score: lessonDisplay.score,
    idolParameterKind: getIdolParameterKindOnTurn(lesson),
    scoreBonus: lessonDisplay.scoreBonus,
  };
  let idolInformation: Props["idolInformation"] = {
    fullName: createCharacterFullName(lesson.idol.original.data.characterId),
    life: lessonDisplay.life,
    maxLife: lesson.idol.original.maxLife,
    vitality: lessonDisplay.vitality,
  };
  let modifiers: Props["modifiers"] = lessonDisplay.modifiers;
  let cardPlayPreview: Props["cardPlayPreview"] = undefined;
  let actionEndOrNotPreview: Props["actionEndOrNotPreview"] = undefined;
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
    modifiers = cardPlayPreviewDisplay.lessonDelta.modifires;
    cardPlayPreview = {
      onClick: () => {},
      preview: cardPlayPreviewDisplay,
    };
    actionEndOrNotPreview = {
      willEnd: cardPlayPreviewDisplay.hasActionEnded,
    };
  }
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
  const onClickLessonPageContent = useCallback(() => {
    setSelectedCardIndex(undefined);
  }, []);
  const onClickSkipButton = useCallback(() => {
    if (isActionEnabled) {
      const newGamePlay = skipTurn(gamePlay);
      setSelectedCardIndex(undefined);
      setGamePlay(newGamePlay);
      setLessonDisplay(generateLessonDisplay(newGamePlay));
    }
  }, [gamePlay]);
  return {
    actionEndOrNotPreview,
    cardPlayPreview,
    hand: lessonDisplay.hand,
    idolInformation,
    modifiers,
    onClickCardInHand,
    onClickLessonPageContent,
    producerItems: lessonDisplay.producerItems,
    scoreInformation,
    selectedCardIndex,
    skipButton: {
      lifeRecoveredBySkippingTurn: lessonDisplay.lifeRecoveredBySkippingTurn,
      onClick: onClickSkipButton,
    },
    turnInformation: lessonDisplay.currentTurn,
  };
};
