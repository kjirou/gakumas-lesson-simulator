import { type CardInHandDisplay, LessonDisplay } from "gakumas-core";
import React, { useCallback, useMemo } from "react";
import { actionCostKindToText, cardEffectDisplayKindToText } from "./utils";

type CardInHandProps = {
  card: CardInHandDisplay;
  left: number;
  onClick: () => void;
  top: number;
  zIndex: number;
};

const CardInHand: React.FC<CardInHandProps> = (props) => {
  const style = useMemo(
    () => ({
      left: props.left,
      top: props.top,
      zIndex: props.zIndex,
    }),
    [props.left, props.top, props.zIndex],
  );
  const onClick = useCallback(() => {
    props.onClick();
  }, [props.onClick]);
  return (
    <div
      className="w-[100px] h-[150px] absolute border bg-white cursor-pointer"
      onClick={onClick}
      style={style}
    >
      <ul>
        <li className="text-sm">{props.card.name}</li>
        <li className="text-xs text-red-500">
          {actionCostKindToText(props.card.cost.kind)}: -{props.card.cost.value}
        </li>
        {props.card.scores.length > 0 && (
          <li className="text-xs">
            スコア:{" "}
            {props.card.scores
              .map((score) => {
                return (
                  score.value + (score.times >= 2 ? `x${score.times}` : "")
                );
              })
              .join(", ")}
          </li>
        )}
        {props.card.vitality !== undefined && (
          <li className="text-xs">元気: {props.card.vitality}</li>
        )}
        {props.card.effects.length > 0 && (
          <li className="text-xs">
            {props.card.effects.map((effect) => {
              const className = effect.applyable
                ? "text-emerald-500"
                : "text-red-500";
              return (
                <span className={className}>
                  ({cardEffectDisplayKindToText(effect.kind)})
                </span>
              );
            })}
          </li>
        )}
      </ul>
    </div>
  );
};

const calculateLeft = (
  containerWidth: number,
  cardWidth: number,
  cardGap: number,
  cardCount: number,
  index: number,
) => {
  const cardsFullWidth = cardWidth * cardCount + cardGap * (cardCount - 1);
  const cardsActualWidth = Math.min(containerWidth, cardsFullWidth);
  const startLeft = (containerWidth - cardsActualWidth) / 2;
  const marginPerCard =
    cardCount !== 1 ? (cardsActualWidth - cardWidth) / (cardCount - 1) : 0;
  return startLeft + marginPerCard * index;
};

export const CardInHands: React.FC<{
  hand: LessonDisplay["hand"];
  onClick: (cardIndex: number) => void;
  selectedCardIndex: number | undefined;
}> = (props) => {
  const cardList = useMemo(() => {
    return props.hand.map((card, index) => {
      const { top, zIndex } =
        props.selectedCardIndex === index
          ? { top: 0, zIndex: 9 }
          : { top: 10, zIndex: index };
      const left = calculateLeft(360, 100, 20, props.hand.length, index);
      return {
        card,
        left,
        onClick: () => props.onClick(index),
        top,
        zIndex,
      };
    });
  }, [props.hand, props.onClick]);
  return (
    <div className="h-[160px] relative bg-slate-100">
      {cardList.map((item, index) => {
        return <CardInHand key={index} {...item} />;
      })}
    </div>
  );
};
