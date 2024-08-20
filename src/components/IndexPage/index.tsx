import React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { IndexPageErrorBoundary } from "./IndexPageErrorBoundary";
import { IndexPageFallback } from "./IndexPageFallback";
import { IndexPageView } from "./View";
import { usePageView, useSavedDataManager } from "./hooks";
import { SavedDataManager } from "./utils";

const siteUrl = "https://gakumas-lesson-simulator.netlify.app/";
const siteTitle = "学マスレッスンシミュレーター（β）";
const siteSummary =
  "学園アイドルマスター（学マス）のレッスンを自由に設定して、シミュレーションできるツールです。";
const ogImageUrl = `${siteUrl}og-image.png`;

const IndexPageOnSavedData: React.FC<{
  savedDataManager: SavedDataManager;
}> = (props) => {
  const pageViewProps = usePageView(props.savedDataManager);
  return <IndexPageView {...pageViewProps} />;
};

export const IndexPage: React.FC<PageProps> = () => {
  const savedDataManager = useSavedDataManager();
  return (
    <IndexPageErrorBoundary fallback={<IndexPageFallback />}>
      {savedDataManager.isLoading ? (
        <div>Loading...</div>
      ) : (
        <IndexPageOnSavedData savedDataManager={savedDataManager} />
      )}
    </IndexPageErrorBoundary>
  );
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
