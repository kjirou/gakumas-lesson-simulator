import { Button as HeadlessUiButton } from "@headlessui/react";
import React from "react";

type HeadlessUiButtonProps = React.ComponentProps<typeof HeadlessUiButton>;

type Props = {
  additionalClassName?: string;
} & HeadlessUiButtonProps;

const ButtonRaw: React.FC<Props> = (props) => {
  const { additionalClassName, ...headlessUiButtonProps } = props;
  let className = "bg-white border select-none";
  if (props.additionalClassName !== undefined) {
    className = [className, props.additionalClassName].join(" ");
  }
  return (
    <HeadlessUiButton className={className} {...headlessUiButtonProps}>
      {props.children}
    </HeadlessUiButton>
  );
};

export const Button = React.memo(ButtonRaw);
