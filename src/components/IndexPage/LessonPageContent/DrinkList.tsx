import { Button, Select } from "@headlessui/react";
import { DrinkDisplay } from "gakumas-core";
import React, { useCallback, useState } from "react";
import {} from "../utils";
import { DescriptionDialog } from "../DescriptionDialog";

const DrinkDescriptionDialogRaw: React.FC<{
  drink: DrinkDisplay;
  onClickBackdrop: () => void;
}> = (props) => {
  return (
    <DescriptionDialog onClickBackdrop={props.onClickBackdrop}>
      <ul className="flex flex-col">
        <li>{props.drink.name}</li>
      </ul>
      <hr />
      <div>
        {props.drink.description.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </DescriptionDialog>
  );
};

const DrinkDescriptionDialog = React.memo(DrinkDescriptionDialogRaw);

type Props = {
  drinks: DrinkDisplay[];
  onClickDrinkUsageButton: () => void;
  selectedDrinkIndex: number;
  setSelectedDrinkIndex: (newState: number) => void;
};

const DrinkListRaw: React.FC<Props> = (props) => {
  const [shownDrinkDescriptionDialog, setShownDrinkDescriptionDialog] =
    useState<React.ComponentProps<typeof DrinkDescriptionDialog> | undefined>(
      undefined,
    );
  const handleChangeSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newSelectedDrinkIndex = Number(event.currentTarget.value);
      props.setSelectedDrinkIndex(newSelectedDrinkIndex);
    },
    [],
  );
  const handleClickDrinkDescriptionButton = useCallback(() => {
    const drink = props.drinks[props.selectedDrinkIndex];
    setShownDrinkDescriptionDialog({
      drink,
      onClickBackdrop: () => {
        setShownDrinkDescriptionDialog(undefined);
      },
    });
  }, [props.drinks, props.selectedDrinkIndex]);
  return (
    <>
      <div className="flex gap-1">
        <Select
          className="text-sm border"
          value={props.selectedDrinkIndex}
          onChange={handleChangeSelect}
        >
          {props.drinks.map((drink, index) => {
            return (
              <option key={index} value={index}>
                {drink.name}
              </option>
            );
          })}
        </Select>
        <Button
          className="border select-none"
          onClick={handleClickDrinkDescriptionButton}
        >
          説明
        </Button>
        <Button
          className="border select-none"
          onClick={props.onClickDrinkUsageButton}
        >
          使用
        </Button>
      </div>
      {shownDrinkDescriptionDialog && (
        <DrinkDescriptionDialog {...shownDrinkDescriptionDialog} />
      )}
    </>
  );
};

export const DrinkList = React.memo(DrinkListRaw);
