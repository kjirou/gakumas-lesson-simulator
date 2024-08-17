import { Idol, IdolParameterKind } from "gakumas-core";
import React from "react";
import { idolParameterKindToTextColorClassName } from "../utils";

type Props = {
  idolParameterKind: IdolParameterKind;
  score: number;
  scoreBonus?: number;
  scoreDelta?: number;
};

export const ScoreInformation: React.FC<Props> = (props) => {
  const idolParameterKindTextColorClassName =
    idolParameterKindToTextColorClassName(props.idolParameterKind);
  return (
    <div className={`relative h-full ${idolParameterKindTextColorClassName}`}>
      <div className="w-full absolute top-[60px] text-3xl font-bold text-center">
        {props.score}
      </div>
      {props.scoreDelta !== undefined && props.scoreDelta !== 0 && (
        <div className="w-full absolute top-[92px] text-lg font-bold text-center">
          (+{props.scoreDelta})
        </div>
      )}
      {props.scoreBonus !== undefined && (
        <div className="w-full absolute bottom-[4px] text-center">
          {props.scoreBonus}%
        </div>
      )}
    </div>
  );
};
