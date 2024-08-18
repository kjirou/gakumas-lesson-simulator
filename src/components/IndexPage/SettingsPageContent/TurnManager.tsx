import { Button, Select } from "@headlessui/react";
import { IdolParameterKind } from "gakumas-core";
import React, { useCallback } from "react";
import {
  SettingInputValues,
  SettingInputValueSetters,
  idolParameterKindSelectOptions,
  idolParameterKindToText,
  idolParameterKindToTextColorClassName,
} from "../utils";

type Props = {
  setTurnsInputValue: SettingInputValueSetters["setTurnsInputValue"];
  turnsInputValue: SettingInputValues["turnsInputValue"];
};

// TODO: 応援/トラブルの管理
const TurnManagerRaw: React.FC<Props> = (props) => {
  const handleChangeIdolParameterKindSelect = useCallback(
    (index: number, value: IdolParameterKind) => {
      props.setTurnsInputValue((turnsState) => {
        const newTurnsState = [...turnsState];
        newTurnsState[index] = value;
        return newTurnsState;
      });
    },
    [],
  );
  const handleClickTurnAdditionButton = useCallback((index: number) => {
    props.setTurnsInputValue((turnsState) => {
      const newTurn = turnsState[index];
      const newTurnsState = [...turnsState];
      newTurnsState.splice(index + 1, 0, newTurn);
      return newTurnsState;
    });
  }, []);
  const handleClickTurnRemovalButton = useCallback((index: number) => {
    props.setTurnsInputValue((turnsState) => {
      return turnsState.length > 1
        ? turnsState.filter((_, i) => i !== index)
        : turnsState;
    });
  }, []);
  return (
    <ul className="mt-1 flex flex-col gap-1">
      {props.turnsInputValue.map((idolParameterKind, index) => {
        return (
          <li key={index} className="flex gap-1 text-sm">
            <div className="w-1/12">{index + 1}</div>
            <Select
              className={
                "border " +
                idolParameterKindToTextColorClassName(idolParameterKind)
              }
              value={idolParameterKind}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                handleChangeIdolParameterKindSelect(
                  index,
                  event.target.value as IdolParameterKind,
                );
              }}
            >
              {idolParameterKindSelectOptions.map((option) => {
                return (
                  <option key={option} value={option}>
                    {idolParameterKindToText(option)}
                  </option>
                );
              })}
            </Select>
            <Button
              className="border"
              onClick={() => {
                handleClickTurnAdditionButton(index);
              }}
            >
              追加
            </Button>
            <Button
              className="border"
              onClick={() => {
                handleClickTurnRemovalButton(index);
              }}
            >
              削除
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export const TurnManager = React.memo(TurnManagerRaw);
