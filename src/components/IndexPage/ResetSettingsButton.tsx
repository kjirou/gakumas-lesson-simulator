import { Button } from "@headlessui/react";
import React from "react";
import { SavedDataManager } from "./utils";

type Props = {
  clearSavedData: SavedDataManager["clearSavedData"];
};

const ResetSettingsButtonRaw: React.FC<Props> = (props) => {
  return (
    <Button
      className="w-[48px] text-sm border"
      onClick={() => {
        props.clearSavedData();
      }}
    >
      戻す
    </Button>
  );
};

export const ResetSettingsButton = React.memo(ResetSettingsButtonRaw);
