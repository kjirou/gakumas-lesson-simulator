import { LessonDisplay } from "gakumas-core";
import React from "react";
import { idolParameterKindToTextColorClassName } from "../utils";

type Props = LessonDisplay["currentTurn"];

export const TurnInformation: React.FC<Props> = (props) => {
  const idolParameterKindTextColorClassName =
    idolParameterKindToTextColorClassName(props.idolParameterKind);
  // ターン追加を主表示へ切り替えるかのフラグ
  const switchToAdditionalTurns =
    props.remainingOriginalTurns === 0 && props.additionalTurns > 0;
  return (
    <div className={`text-center ${idolParameterKindTextColorClassName}`}>
      <h3 className="text-xs">残りターン</h3>
      <div className="mt-1">
        {!switchToAdditionalTurns ? (
          <span className="text-3xl">{props.remainingOriginalTurns}</span>
        ) : (
          <span className="text-3xl">{props.remainingAdditionalTurns}</span>
        )}
        {!switchToAdditionalTurns && props.additionalTurns > 0 && (
          <span className="text-sm font-bold">+{props.additionalTurns}</span>
        )}
      </div>
      <div className="mt-1 text-xs">({props.turnNumber}ターン目)</div>
    </div>
  );
};
