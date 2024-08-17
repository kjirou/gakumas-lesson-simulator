import { ModifierDisplay } from "gakumas-core";
import React from "react";

type Props = {
  modifiers: ModifierDisplay[];
};

export const ModifierList: React.FC<Props> = ({ modifiers }) => {
  return (
    <ul className="p-1 text-sm">
      {modifiers.map((modifier) => (
        <li key={modifier.id}>
          <span>{modifier.name}</span>
          {modifier.representativeValueText !== undefined && (
            <span className="ml-1 font-bold text-emerald-500">
              {modifier.representativeValueText}
            </span>
          )}
          {modifier.change &&
            modifier.change.representativeValueDelta !== undefined &&
            modifier.change.representativeValueDelta !== 0 &&
            (modifier.change.representativeValueDelta > 0 ? (
              <span className="text-emerald-500">
                (+{modifier.change.representativeValueDelta})
              </span>
            ) : (
              <span className="text-red-500">
                ({modifier.change.representativeValueDelta})
              </span>
            ))}
        </li>
      ))}
    </ul>
  );
};
