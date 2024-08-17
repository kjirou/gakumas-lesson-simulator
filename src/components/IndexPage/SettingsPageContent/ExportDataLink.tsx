import React, { useEffect } from "react";

const downloadFileName = "gakumas-lesson-simulator.json";

export const createJsonDataUri = (jsonObject: Object): string => {
  const blob = new Blob([JSON.stringify(jsonObject)], { type: "text/json" });
  return window.URL.createObjectURL(blob);
};

type Props = {
  data: Object;
};

export const ExportDataLinkRaw: React.FC<Props> = (props) => {
  const [dataUri, setDataUri] = React.useState<string>("");
  useEffect(() => {
    setDataUri(createJsonDataUri(props.data));
    return () => {
      window.URL.revokeObjectURL(dataUri);
    };
  }, [props.data]);
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
