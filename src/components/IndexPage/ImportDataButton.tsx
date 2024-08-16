import { Input } from "@headlessui/react";
import { IdolDataId, isIdolDataIdType } from "gakumas-core";
import React from "react";
import { useSavedDataManager } from "./hooks";
import { selectableIdols } from "./utils";

type Props = {
  setImportedJson: ReturnType<typeof useSavedDataManager>["setImportedJson"];
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
