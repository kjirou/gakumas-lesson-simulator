import { ProducerItemDisplay } from "gakumas-core";
import React from "react";

type Props = {
  producerItems: ProducerItemDisplay[];
};

export const ProducerItemList: React.FC<Props> = ({ producerItems }) => {
  return (
    <ul className="p-1 text-sm">
      {producerItems.map((producerItem) => (
        <li key={producerItem.id} className="flex gap-1 items-center">
          <span
            className={
              producerItem.remainingTimes !== 0 ||
              producerItem.remainingTimes === undefined
                ? ""
                : "text-slate-300"
            }
          >
            {producerItem.name}
          </span>
          {producerItem.optionalTexts.map((optionalText, index) => (
            <span key={index} className="text-xs text-slate-500">
              {optionalText}
            </span>
          ))}
          {producerItem.remainingTimes !== undefined &&
            producerItem.remainingTimes !== 0 && (
              <span className="flex-1 font-bold text-right text-emerald-500">
                {producerItem.remainingTimes}
              </span>
            )}
        </li>
      ))}
    </ul>
  );
};
