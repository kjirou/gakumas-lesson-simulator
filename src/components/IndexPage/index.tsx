import React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { IndexPageView } from "./View";
import { useIndexPage } from "./hooks";

const siteUrl = "https://gakumas-lesson-simulator.netlify.app/";
const siteTitle = "学マスレッスンシミュレーター";
const siteSummary =
  "学園アイドルマスター（学マス）のレッスンを自由に設定して、シミュレーションできるツールです。";
const ogImageUrl = `${siteUrl}og-image.png`;

export const IndexPage: React.FC<PageProps> = () => {
  const props = useIndexPage();
  return <IndexPageView {...props} />;
};

export const IndexPageHead: HeadFC = () => (
  <>
    <html lang="ja" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={siteSummary} />
    <meta
      name="keywords"
      content="学園アイドルマスター,学マス,gakumas,gakumasu,シミュレーター,クローン"
    />
    <meta property="og:title" content={siteTitle} />
    <meta property="og:description" content={siteSummary} />
    <meta property="og:image" content={ogImageUrl} />
    <meta property="twitter:card" content="summary" />
    <title>{siteTitle}</title>
    <body className="flex justify-center" />
  </>
);
