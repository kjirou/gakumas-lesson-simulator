import { Input } from "@headlessui/react";
import React from "react";
import { SettingInputValues, SettingInputValueSetters } from "../utils";

type Props = {
  maxLifeInputValue: SettingInputValues["maxLifeInputValue"];
  setMaxLifeInputValue: SettingInputValueSetters["setMaxLifeInputValue"];
};

const MaxLifeInputRaw: React.FC<Props> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setMaxLifeInputValue(event.currentTarget.value);
  };
  return (
    <Input
      className="w-[48px] text-sm border"
      value={props.maxLifeInputValue}
      type="number"
      onChange={handleChange}
    />
  );
};

export const MaxLifeInput = React.memo(MaxLifeInputRaw);
