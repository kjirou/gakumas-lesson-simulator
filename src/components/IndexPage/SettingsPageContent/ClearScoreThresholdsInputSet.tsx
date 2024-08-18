import { Input } from "@headlessui/react";
import React from "react";
import { SettingInputValues, SettingInputValueSetters } from "../utils";

type Props = {
  clearScoreInputValue: SettingInputValues["clearScoreInputValue"];
  perfectScoreInputValue: SettingInputValues["perfectScoreInputValue"];
  setClearScoreInputValue: SettingInputValueSetters["setClearScoreInputValue"];
  setPerfectScoreInputValue: SettingInputValueSetters["setPerfectScoreInputValue"];
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
