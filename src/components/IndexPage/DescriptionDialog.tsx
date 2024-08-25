import React from "react";

const DescriptionDialogRaw: React.FC<{
  children: React.ReactNode;
  onClickBackdrop?: () => void;
}> = (props) => {
  return (
    <>
      <div
        className="absolute w-full h-full top-0 left-0 z-30 flex justify-center items-center"
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();
          if (props.onClickBackdrop) {
            props.onClickBackdrop();
          }
        }}
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
      <div className="absolute w-full h-full top-0 left-0 z-20 bg-black opacity-5" />
    </>
  );
};

export const DescriptionDialog = React.memo(DescriptionDialogRaw);
