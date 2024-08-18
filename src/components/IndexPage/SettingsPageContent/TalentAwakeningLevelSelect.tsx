import { Select } from "@headlessui/react";
import React from "react";
import {
  SettingInputValues,
  SettingInputValueSetters,
  talentAwakeningLevelSelectOptions,
} from "../utils";

type Props = {
  setTalentAwakeningLevelInputValue: SettingInputValueSetters["setTalentAwakeningLevelInputValue"];
  talentAwakeningLevelInputValue: SettingInputValues["talentAwakeningLevelInputValue"];
};

const TalentAwakeningLevelSelectRaw: React.FC<Props> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setTalentAwakeningLevelInputValue(
      event.currentTarget
        .value as SettingInputValues["talentAwakeningLevelInputValue"],
    );
  };
  return (
    <Select
      className="text-sm border"
      value={props.talentAwakeningLevelInputValue}
      onChange={handleChange}
    >
      {talentAwakeningLevelSelectOptions.map((value) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      })}
    </Select>
  );
};

export const TalentAwakeningLevelSelect = React.memo(
  TalentAwakeningLevelSelectRaw,
);
