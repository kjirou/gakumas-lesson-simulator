import { Select } from "@headlessui/react";
import { IdolDataId, isIdolDataIdType } from "gakumas-core";
import React from "react";
import { selectableIdols } from "./utils";

type Props = {
  idolDataIdInputValue: IdolDataId;
  setIdolDataIdInputValue: (idolDataId: IdolDataId) => void;
};

const IdolSelectRaw: React.FC<Props> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const IdolDataId = event.currentTarget.value;
    if (isIdolDataIdType(IdolDataId)) {
      props.setIdolDataIdInputValue(IdolDataId);
    }
  };
  return (
    <Select
      className="text-sm border"
      value={props.idolDataIdInputValue}
      onChange={handleChange}
    >
      {selectableIdols.map((selectableIdol) => {
        const name = `${selectableIdol.fullName} ${selectableIdol.rarity} ${selectableIdol.title}`;
        return (
          <option key={selectableIdol.idolId} value={selectableIdol.idolId}>
            {name}
          </option>
        );
      })}
    </Select>
  );
};

export const IdolSelect = React.memo(IdolSelectRaw);
