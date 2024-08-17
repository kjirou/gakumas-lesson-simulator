import { Select } from "@headlessui/react";
import React from "react";
import { specialTrainingLevelSelectOptions } from "../utils";

type Props = {
  setSpecialTrainingLevelInputValue: (
    state: (typeof specialTrainingLevelSelectOptions)[number],
  ) => void;
  specialTrainingLevelInputValue: (typeof specialTrainingLevelSelectOptions)[number];
};

const SpecialTrainingLevelSelectRaw: React.FC<Props> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setSpecialTrainingLevelInputValue(
      event.currentTarget
        .value as (typeof specialTrainingLevelSelectOptions)[number],
    );
  };
  return (
    <Select
      className="text-sm border"
      value={props.specialTrainingLevelInputValue}
      onChange={handleChange}
    >
      {specialTrainingLevelSelectOptions.map((value) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      })}
    </Select>
  );
};

export const SpecialTrainingLevelSelect = React.memo(
  SpecialTrainingLevelSelectRaw,
);
