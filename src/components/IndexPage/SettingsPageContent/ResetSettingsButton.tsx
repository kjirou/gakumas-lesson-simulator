import React from "react";
import { Button } from "../Button";
import { SavedDataManager } from "../utils";

type Props = {
  clearSavedData: SavedDataManager["clearSavedData"];
};

const ResetSettingsButtonRaw: React.FC<Props> = (props) => {
  return (
    <Button
      additionalClassName="w-[48px] text-sm"
      onClick={() => {
        props.clearSavedData();
      }}
    >
      戻す
    </Button>
  );
};

export const ResetSettingsButton = React.memo(ResetSettingsButtonRaw);
