import React from "react";

const DescriptionDialogRaw: React.FC<{
  children: React.ReactNode;
  onClickBackdrop?: () => void;
}> = (props) => {
  return (
    <div
      className="absolute w-full h-full top-0 left-0 flex justify-center items-center"
      onClick={props.onClickBackdrop}
    >
      <div
        className="w-10/12 p-1 text-sm border bg-white"
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export const DescriptionDialog = React.memo(DescriptionDialogRaw);
