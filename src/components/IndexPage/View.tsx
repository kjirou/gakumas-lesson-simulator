import { LessonDisplay } from "gakumas-core";
import React from "react";
import { ActionEndOrNotPreview } from "./ActionEndOrNotPreview";
import { CardListInHand } from "./CardListInHand";
import { CardPlayPreview } from "./CardPlayPreview";
import { IdolInformation } from "./IdolInformation";
import { ModifierList } from "./ModifierList";
import { ProducerItemList } from "./ProducerItemList";
import { ScoreInformation } from "./ScoreInformation";
import { SkipButton } from "./SkipButton";
import { TurnInformation } from "./TurnInformation";

type ActionEndOrNotPreviewProps = React.ComponentProps<
  typeof ActionEndOrNotPreview
>;
type CardInHandsProps = React.ComponentProps<typeof CardListInHand>;
type CardPlayPreviewProps = React.ComponentProps<typeof CardPlayPreview>;
type IdolInformationProps = React.ComponentProps<typeof IdolInformation>;
type ScoreInformationProps = React.ComponentProps<typeof ScoreInformation>;
type SkipButtonProps = React.ComponentProps<typeof SkipButton>;
type TurnInformationProps = React.ComponentProps<typeof TurnInformation>;

const PageContent: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ children, onClick }) => {
  return (
    <div className="w-[360px] h-[720px] relative bg-slate-50" onClick={onClick}>
      {children}
    </div>
  );
};

type Props = {
  actionEndOrNotPreview?: ActionEndOrNotPreviewProps;
  cardPlayPreview?: CardPlayPreviewProps;
  hand: LessonDisplay["hand"];
  idolInformation: IdolInformationProps;
  modifiers: LessonDisplay["modifiers"];
  onClickCardInHand: CardInHandsProps["onClick"];
  onClickLessonPageContent: () => void;
  producerItems: LessonDisplay["producerItems"];
  scoreInformation: ScoreInformationProps;
  selectedCardIndex?: number;
  skipButton: SkipButtonProps;
  turnInformation: TurnInformationProps;
};

export const IndexPageView: React.FC<Props> = (props) => {
  return (
    <main className="flex gap-2">
      <PageContent onClick={props.onClickLessonPageContent}>
        <div className="h-[40px]"></div>
        <div className="h-[160px] flex justify-center items-center bg-slate-100">
          <div className="flex-1">
            <TurnInformation {...props.turnInformation} />
          </div>
          <div className="flex-1 h-full">
            <ScoreInformation {...props.scoreInformation} />
          </div>
          <div className="flex-1">
            <IdolInformation {...props.idolInformation} />
          </div>
        </div>
        <div className="h-[280px] flex">
          <div className="flex-1 w-6/12">
            <ModifierList modifiers={props.modifiers} />
          </div>
          <div className="flex-1 w-6/12">
            <ProducerItemList producerItems={props.producerItems} />
          </div>
        </div>
        <CardListInHand
          hand={props.hand}
          onClick={props.onClickCardInHand}
          selectedCardIndex={props.selectedCardIndex}
        />
        <div className="h-[80px]"></div>
        {props.actionEndOrNotPreview && (
          <div className="absolute top-[412px] left-[4px] z-5">
            <ActionEndOrNotPreview {...props.actionEndOrNotPreview} />
          </div>
        )}
        <div className="absolute top-[412px] right-[52px] z-5">
          <SkipButton {...props.skipButton} />
        </div>
        {props.cardPlayPreview && (
          <CardPlayPreview {...props.cardPlayPreview} />
        )}
      </PageContent>
      <PageContent>Right Side</PageContent>
    </main>
  );
};
