import { Input } from "@headlessui/react";
import React from "react";
import { SettingInputValues, SettingInputValueSetters } from "../utils";

type Props = {
  lifeInputValue: SettingInputValues["lifeInputValue"];
  setLifeInputValue: SettingInputValueSetters["setLifeInputValue"];
};

const LifeInputRaw: React.FC<Props> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setLifeInputValue(event.currentTarget.value);
  };
  return (
    <Input
      className="w-[48px] text-sm border"
      value={props.lifeInputValue}
      type="number"
      onChange={handleChange}
    />
  );
};

export const LifeInput = React.memo(LifeInputRaw);
