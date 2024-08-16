import React from "react";
import { createJsonDataUri } from "./utils";

const downloadFileName = "gakumas-lesson-simulator.json";

type Props = {
  data: Object;
};

export const ExportDataLinkRaw: React.FC<Props> = (props) => {
  const dataUri = createJsonDataUri(props.data);
  return (
    <a
      className="text-xs underline text-blue-500"
      download={downloadFileName}
      href={dataUri}
    >
      {downloadFileName}
    </a>
  );
};

export const ExportDataLink = React.memo(ExportDataLinkRaw);
