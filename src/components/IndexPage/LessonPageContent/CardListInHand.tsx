import { type CardInHandDisplay, LessonDisplay } from "gakumas-core";
import React, { useCallback, useMemo } from "react";
import { actionCostKindToText, cardEffectDisplayKindToText } from "../utils";

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
  const onClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.stopPropagation();
      props.onClick();
    },
    [props.onClick],
  );
  const backgroundColor = props.card.playable ? "bg-white" : "bg-slate-200";
  return (
    <div
      className={`w-[100px] h-[150px] absolute border ${backgroundColor} select-none cursor-pointer`}
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
            {props.card.effects.map((effect, index) => {
              const className = effect.activatable
                ? "text-emerald-500"
                : "text-red-500";
              return (
                <span key={index} className={className}>
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

/**
 * 手札のカードの左端の座標を計算する
 *
 * - コンテナに収まる限りは、カードとその間隔を考慮して中央へ配置する
 * - コンテナに収まらない場合は、最初と最後のカードがコンテナの端に配置される前提で、その間を均等に配置する
 *
 * @param containerWidth 手札のコンテナの幅
 * @param cardWidth カードの幅
 * @param gap カード間の隙間
 * @param numberOfCards 手札のカードの枚数
 * @param cardIndex 計算対象の手札のカードのインデックス
 */
export const calculateCardInHandLeft = (
  containerWidth: number,
  cardWidth: number,
  gap: number,
  numberOfCards: number,
  cardIndex: number,
) => {
  const cardsFullWidth = cardWidth * numberOfCards + gap * (numberOfCards - 1);
  const cardsActualWidth = Math.min(containerWidth, cardsFullWidth);
  const startLeft = (containerWidth - cardsActualWidth) / 2;
  const marginPerCard =
    numberOfCards !== 1
      ? (cardsActualWidth - cardWidth) / (numberOfCards - 1)
      : 0;
  return startLeft + marginPerCard * cardIndex;
};

export const CardListInHand: React.FC<{
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
      const left = calculateCardInHandLeft(
        360,
        100,
        20,
        props.hand.length,
        index,
      );
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
