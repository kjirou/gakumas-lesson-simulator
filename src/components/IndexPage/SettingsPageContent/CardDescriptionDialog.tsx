import {
  Card,
  CardData,
  generateCardDescription,
  generateCardName,
  getCardContentData,
} from "gakumas-core";
import React from "react";
import {
  actionCostKindToText,
  cardPossessionKindToText,
  cardSummaryKindToText,
} from "../utils";
import { DescriptionDialog } from "./DescriptionDialog";

const CardDescriptionDialogRaw: React.FC<{
  data: CardData;
  enhanced: boolean;
  onClickBackdrop: Parameters<typeof DescriptionDialog>[0]["onClickBackdrop"];
}> = (props) => {
  const enhancementCount = props.enhanced ? 1 : 0;
  const cardContent = getCardContentData(props.data, enhancementCount);
  const description = generateCardDescription({
    cost: cardContent.cost,
    condition: cardContent.condition,
    effects: cardContent.effects,
    innate: cardContent.innate,
    nonDuplicative: props.data.nonDuplicative,
    usableOncePerLesson: cardContent.usableOncePerLesson,
  });
  return (
    <DescriptionDialog onClickBackdrop={props.onClickBackdrop}>
      <ul className="flex flex-col">
        <li>{generateCardName(props.data.name, enhancementCount)}</li>
        <li>
          <span>{cardPossessionKindToText(props.data.cardPossessionKind)}</span>
          <span className="pl-1 pr-1">/</span>
          <span>{cardSummaryKindToText(props.data.cardSummaryKind)}</span>
        </li>
        <li className="text-red-500">
          <span>{actionCostKindToText(cardContent.cost.kind)}:</span>
          <span className="ml-1">{cardContent.cost.value}</span>
        </li>
      </ul>
      <hr />
      <div>
        {description.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </DescriptionDialog>
  );
};

export const CardDescriptionDialog = React.memo(CardDescriptionDialogRaw);
