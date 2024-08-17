import { ProducerItemDisplay } from "gakumas-core";
import React from "react";

type Props = {
  producerItems: ProducerItemDisplay[];
};

export const ProducerItemList: React.FC<Props> = ({ producerItems }) => {
  return (
    <ul className="p-1 text-sm">
      {producerItems.map((producerItem) => (
        <li key={producerItem.id}>
          <span
            className={
              producerItem.remainingTimes !== 0 ||
              producerItem.remainingTimes === undefined
                ? undefined
                : "text-slate-300"
            }
          >
            {producerItem.name}
          </span>
          {producerItem.remainingTimes !== undefined &&
            producerItem.remainingTimes !== 0 && (
              <span className="ml-1 font-bold text-emerald-500">
                {producerItem.remainingTimes}
              </span>
            )}
        </li>
      ))}
    </ul>
  );
};
