import { type CardPlayPreviewDisplay } from "gakumas-core";
import React from "react";
import { actionCostKindToText } from "../utils";

type Props = {
  onClick: () => void;
  preview: CardPlayPreviewDisplay;
};

export const CardPlayPreview: React.FC<Props> = ({ onClick, preview }) => {
  return (
    <div
      className="w-[260px] h-[160px] absolute top-[300px] left-[50px] z-10 border bg-white cursor-pointer"
      onClick={onClick}
    >
      <ul className="flex flex-col">
        <li className="text-sm">{preview.card.name}</li>
        <li className="text-sm text-red-500">
          {actionCostKindToText(preview.card.cost.kind)}: -
          {preview.card.cost.value}
        </li>
      </ul>
      <hr />
      <div className="text-xs">
        {preview.card.description.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
};
