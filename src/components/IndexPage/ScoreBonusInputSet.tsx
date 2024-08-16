import { Input } from "@headlessui/react";
import React from "react";
import { SavedData } from "./utils";

type Props = {
  isScoreBonusEnabledInputValue: boolean;
  scoreBonusInputValueSet: SavedData["scoreBonus"]["values"];
  setIsScoreBonusEnabledInputValue: (state: boolean) => void;
  setScoreBonusInputValueSet: (
    state: SavedData["scoreBonus"]["values"],
  ) => void;
};

const ScoreBonusInputSetRaw: React.FC<Props> = (props) => {
  return (
    <ul className="flex gap-2 text-sm">
      <li>
        <span>有効:</span>
        <input
          className="size-4 border"
          type="checkbox"
          checked={props.isScoreBonusEnabledInputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.setIsScoreBonusEnabledInputValue(event.currentTarget.checked);
          }}
        />
      </li>
      <li>
        <span>Vo:</span>
        <Input
          className="w-[56px] border text-right"
          value={props.scoreBonusInputValueSet.vocal}
          type="number"
          disabled={!props.isScoreBonusEnabledInputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.setScoreBonusInputValueSet({
              ...props.scoreBonusInputValueSet,
              vocal: event.currentTarget.value,
            });
          }}
        />
      </li>
      <li>
        <span>Da:</span>
        <Input
          className="w-[56px] border text-right"
          value={props.scoreBonusInputValueSet.dance}
          type="number"
          disabled={!props.isScoreBonusEnabledInputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.setScoreBonusInputValueSet({
              ...props.scoreBonusInputValueSet,
              dance: event.currentTarget.value,
            });
          }}
        />
      </li>
      <li>
        <span>Vi:</span>
        <Input
          className="w-[56px] border text-right"
          value={props.scoreBonusInputValueSet.visual}
          type="number"
          disabled={!props.isScoreBonusEnabledInputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.setScoreBonusInputValueSet({
              ...props.scoreBonusInputValueSet,
              visual: event.currentTarget.value,
            });
          }}
        />
      </li>
    </ul>
  );
};

export const ScoreBonusInputSet = React.memo(ScoreBonusInputSetRaw);
