import { Idol } from "gakumas-core";
import React from "react";

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
        <span className="ml-1 font-bold text-green-500">{props.life}</span>/
        <span className="font-bold">{props.maxLife}</span>
        {props.lifeDelta !== undefined &&
          props.lifeDelta !== 0 &&
          (props.lifeDelta > 0 ? (
            <span className="text-green-500">(+{props.lifeDelta})</span>
          ) : (
            <span className="text-red-500">({props.lifeDelta})</span>
          ))}
      </li>
      <li>
        <span>元気:</span>
        <span className="ml-1 font-bold text-teal-500">{props.vitality}</span>
        {props.vitalityDelta !== undefined &&
          props.vitalityDelta !== 0 &&
          (props.vitalityDelta > 0 ? (
            <span className="text-teal-500">(+{props.vitalityDelta})</span>
          ) : (
            <span className="text-red-500">({props.vitalityDelta})</span>
          ))}
      </li>
    </ul>
  );
};
