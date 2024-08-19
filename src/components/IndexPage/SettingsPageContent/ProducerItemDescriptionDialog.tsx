import {
  ProducerItem,
  ProducerItemData,
  generateProducerItemDescription,
  generateProducerItemName,
  getProducerItemContentData,
} from "gakumas-core";
import React from "react";
import { producerItemPossessionKindToText } from "../utils";
import { DescriptionDialog } from "./DescriptionDialog";

const ProducerItemDescriptionDialogRaw: React.FC<{
  data: ProducerItemData;
  enhanced: boolean;
  onClickBackdrop: Parameters<typeof DescriptionDialog>[0]["onClickBackdrop"];
}> = (props) => {
  const producerItem: ProducerItem = {
    id: "",
    data: props.data,
    enhanced: props.enhanced,
    activationCount: 0,
  };
  const producerItemContent = getProducerItemContentData(producerItem);
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
        <li>{generateProducerItemName(producerItem)}</li>
        <li>
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
