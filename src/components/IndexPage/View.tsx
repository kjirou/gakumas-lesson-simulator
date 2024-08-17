import React from "react";
import { LessonPageContent } from "./LessonPageContent";
import { SettingsPageContent } from "./SettingsPageContent";

type LessonPageContentProps = React.ComponentProps<typeof LessonPageContent>;
type SettingsPageContentProps = React.ComponentProps<
  typeof SettingsPageContent
>;

type Props = {
  lessonPageContent: LessonPageContentProps;
  settingsPageContent: SettingsPageContentProps;
};

export const IndexPageView: React.FC<Props> = (props) => {
  return (
    <main className="flex gap-2">
      <LessonPageContent {...props.lessonPageContent} />
      <SettingsPageContent {...props.settingsPageContent} />
    </main>
  );
};
