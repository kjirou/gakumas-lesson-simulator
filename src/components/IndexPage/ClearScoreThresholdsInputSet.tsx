import { Input } from "@headlessui/react";
import { IdolParameterKind } from "gakumas-core";
import React from "react";

type Props = {
  clearScoreInputValue: string;
  perfectScoreInputValue: string;
  setClearScoreInputValue: (state: string) => void;
  setPerfectScoreInputValue: (state: string) => void;
};

const ClearScoreThresholdsInputSetRaw: React.FC<Props> = (props) => {
  return (
    <ul className="flex gap-2 text-sm">
      <li>
        <span>クリア:</span>
        <Input
          className="w-[48px] border text-right"
          value={props.clearScoreInputValue}
          type="number"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.setClearScoreInputValue(event.currentTarget.value);
          }}
        />
      </li>
      <li>
        <span>パーフェクト:</span>
        <Input
          className="w-[48px] border text-right"
          value={props.perfectScoreInputValue}
          type="number"
          disabled={props.clearScoreInputValue === ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.setPerfectScoreInputValue(event.currentTarget.value);
          }}
        />
      </li>
    </ul>
  );
};

export const ClearScoreThresholdsInputSet = React.memo(
  ClearScoreThresholdsInputSetRaw,
);
