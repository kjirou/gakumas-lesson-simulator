import { ModifierDisplay } from "gakumas-core";
import React from "react";
import { formatSignedNumber, getModifierDisplayKindIcon } from "../utils";

type Props = {
  modifiers: ModifierDisplay[];
};

export const ModifierList: React.FC<Props> = ({ modifiers }) => {
  return (
    <ul className="p-1 text-sm">
      {modifiers.map((modifier) => {
        const icon = getModifierDisplayKindIcon(modifier.kind);
        return (
          <li key={modifier.id}>
            <span className={icon.iconColorClassName}>{modifier.name}</span>
            {modifier.representativeValueText !== undefined && (
              <span className={`ml-1 font-bold ${icon.iconColorClassName}`}>
                {modifier.representativeValueText}
              </span>
            )}
            {modifier.change &&
              modifier.change.representativeValueDelta !== undefined &&
              modifier.change.representativeValueDelta !== 0 && (
                <span
                  className={
                    modifier.change.representativeValueDelta > 0
                      ? "text-gimBuff"
                      : "text-gimDecrease"
                  }
                >
                  (
                  {formatSignedNumber(modifier.change.representativeValueDelta)}
                  )
                </span>
              )}
          </li>
        );
      })}
    </ul>
  );
};
