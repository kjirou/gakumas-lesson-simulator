import {
  ProducerItem,
  ProducerItemData,
  generateProducerItemDescription,
  generateProducerItemName,
  getProducerItemContentData,
} from "gakumas-core";
import React from "react";
import { producerItemPossessionKindToText, rarityToText } from "../utils";
import { DescriptionDialog } from "../DescriptionDialog";

const ProducerItemDescriptionDialogRaw: React.FC<{
  data: ProducerItemData;
  enhanced: boolean;
  onClickBackdrop: Parameters<typeof DescriptionDialog>[0]["onClickBackdrop"];
}> = (props) => {
  const producerItemContent = getProducerItemContentData(
    props.data,
    props.enhanced,
  );
  const description = generateProducerItemDescription({
    condition: producerItemContent.condition,
    cost: producerItemContent.cost,
    effects: producerItemContent.effects,
    times: producerItemContent.times,
    trigger: producerItemContent.trigger,
  });
  return (
    <DescriptionDialog onClickBackdrop={props.onClickBackdrop}>
      <ul className="flex flex-col">
        <li>{generateProducerItemName(props.data.name, props.enhanced)}</li>
        <li>
          <span>{rarityToText(props.data.rarity)}</span>
          <span className="pl-1 pr-1">/</span>
          <span>
            {producerItemPossessionKindToText(
              props.data.producerItemPossessionKind,
            )}
          </span>
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

export const ProducerItemDescriptionDialog = React.memo(
  ProducerItemDescriptionDialogRaw,
);
