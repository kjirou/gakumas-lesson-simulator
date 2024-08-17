import { LessonDisplay } from "gakumas-core";
import React from "react";

type Props = {
  willEnd: boolean;
};

export const ActionEndOrNotPreview: React.FC<Props> = (props) => {
  return (
    <div className="w-[48px] h-[48px] absolute flex justify-center items-center text-center">
      <div
        className={`text-sm font-bold ${props.willEnd ? "text-black" : "text-emerald-500"}`}
      >
        ターン
        <br />
        {props.willEnd ? "終了" : "継続"}
      </div>
    </div>
  );
};
