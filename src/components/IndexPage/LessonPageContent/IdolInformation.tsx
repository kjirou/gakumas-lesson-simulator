import { Idol } from "gakumas-core";
import React from "react";
import { formatSignedNumber } from "../utils";

type Props = {
  fullName: string;
  life: Idol["life"];
  lifeDelta?: number;
  maxLife: Idol["life"];
  vitality: Idol["vitality"];
  vitalityDelta?: number;
};

export const IdolInformation: React.FC<Props> = (props) => {
  return (
    <ul>
      <li className="text-sm">{props.fullName}</li>
      <li className="mt-2">
        <span>体力:</span>
        <span className="ml-1 font-bold text-gimLife">{props.life}</span>/
        <span className="font-bold">{props.maxLife}</span>
        {props.lifeDelta !== undefined && props.lifeDelta !== 0 && (
          <span
            className={
              props.lifeDelta > 0 ? "text-gimLife" : "text-gimDecrease"
            }
          >
            ({formatSignedNumber(props.lifeDelta)})
          </span>
        )}
      </li>
      <li>
        <span>元気:</span>
        <span className="ml-1 font-bold text-gimVitality">
          {props.vitality}
        </span>
        {props.vitalityDelta !== undefined && props.vitalityDelta !== 0 && (
          <span
            className={
              props.vitalityDelta > 0 ? "text-gimVitality" : "text-gimDecrease"
            }
          >
            ({formatSignedNumber(props.vitalityDelta)})
          </span>
        )}
      </li>
    </ul>
  );
};
