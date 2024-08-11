import { type CardPlayPreviewDisplay, type LessonDisplay } from "gakumas-core";
import React from "react";
import { CardsInHand } from "./CardsInHand";
import { CardPlayPreview } from "./CardPlayPreview";

type CardInHandsProps = React.ComponentProps<typeof CardsInHand>;

type CardPlayPreviewProps = React.ComponentProps<typeof CardPlayPreview>;

const PageContent: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className="w-[360px] h-[720px] relative bg-slate-50">
      {props.children}
    </div>
  );
};

type Props = {
  cardPlayPreview?: CardPlayPreviewProps;
  hand: LessonDisplay["hand"];
  life: LessonDisplay["life"];
  maxLife: number;
  modifiers: LessonDisplay["modifiers"];
  onClickCardInHand: CardInHandsProps["onClick"];
  producerItems: LessonDisplay["producerItems"];
  remainingTurns: LessonDisplay["remainingTurns"];
  remainingTurnsChange: LessonDisplay["remainingTurnsChange"];
  score: LessonDisplay["score"];
  selectedCardIndex?: number;
  vitality: LessonDisplay["vitality"];
};

export const IndexPageView: React.FC<Props> = (props) => {
  return (
    <main className="flex gap-2">
      <PageContent>
        <div className="h-[40px]"></div>
        <div className="h-[160px] flex justify-center items-center bg-slate-100">
          <ul className="flex-1">
            <li>
              残りターン数:
              <br />
              {props.remainingTurns}
              {props.remainingTurnsChange !== 0 &&
                `(${props.remainingTurnsChange})`}
            </li>
          </ul>
          <div className="flex-1 flex justify-center">
            <div className="text-3xl font-bold">{props.score}</div>
          </div>
          <ul className="flex-1">
            <li>
              体力: {props.life}/{props.maxLife}
            </li>
            <li>元気: {props.vitality}</li>
          </ul>
        </div>
        <div className="h-[280px] flex">
          <ul className="flex-1 w-6/12">
            {props.modifiers.map((modifier) => (
              <li key={modifier.id}>
                {[
                  modifier.name,
                  ...(modifier.representativeValueText !== undefined
                    ? [modifier.representativeValueText]
                    : []),
                ].join(" ")}
              </li>
            ))}
          </ul>
          <ul className="flex-1 w-6/12">
            {props.producerItems.map((producerItem) => (
              <li key={producerItem.id}>
                {[
                  producerItem.name,
                  producerItem.remainingTimes !== undefined
                    ? producerItem.remainingTimes + "回"
                    : "-",
                ].join(" ")}
              </li>
            ))}
          </ul>
        </div>
        <CardsInHand
          hand={props.hand}
          onClick={props.onClickCardInHand}
          selectedCardIndex={props.selectedCardIndex}
        />
        <div className="h-[80px]"></div>
        {props.cardPlayPreview && (
          <CardPlayPreview {...props.cardPlayPreview} />
        )}
      </PageContent>
      <PageContent>Right Side</PageContent>
    </main>
  );
};
