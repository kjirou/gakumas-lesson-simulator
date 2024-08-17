import { Input } from "@headlessui/react";
import React from "react";
import { SavedDataManager } from "../utils";

type Props = {
  setImportedJson: SavedDataManager["setImportedJson"];
};

const ImportDataButtonRaw: React.FC<Props> = (props) => {
  return (
    <Input
      className="text-sm border"
      type="file"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            props.setImportedJson(String(fileReader.result));
          };
          fileReader.readAsText(file);
        }
        event.target.value = "";
      }}
    />
  );
};

export const ImportDataButton = React.memo(ImportDataButtonRaw);
