import { LessonDisplay } from "gakumas-core";
import React, { useCallback } from "react";

type Props = {
  lifeRecoveredBySkippingTurn: LessonDisplay["lifeRecoveredBySkippingTurn"];
  onClick: () => void;
};

export const SkipButton: React.FC<Props> = (props) => {
  const onClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.stopPropagation();
      props.onClick();
    },
    [props.onClick],
  );
  return (
    <div
      className="w-[48px] h-[48px] absolute border text-center bg-white cursor-pointer select-none"
      onClick={onClick}
    >
      <h3 className="m-0.5 text-xs">SKIP</h3>
      <div className="text-lg font-bold text-emerald-500">
        {props.lifeRecoveredBySkippingTurn}
      </div>
    </div>
  );
};
