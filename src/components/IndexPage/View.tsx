import {
  Button,
  Field,
  Fieldset,
  Label,
  Legend,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { LessonDisplay } from "gakumas-core";
import React from "react";
import { ActionEndOrNotPreview } from "./ActionEndOrNotPreview";
import { CardListInHand } from "./CardListInHand";
import { CardPlayPreview } from "./CardPlayPreview";
import { ClearScoreThresholdsInputSet } from "./ClearScoreThresholdsInputSet";
import { ExportDataLink } from "./ExportDataLink";
import { IdolSelect } from "./IdolSelect";
import { IdolInformation } from "./IdolInformation";
import { ImportDataButton } from "./ImportDataButton";
import { LifeInput } from "./LifeInput";
import { MaxLifeInput } from "./MaxLifeInput";
import { ModifierList } from "./ModifierList";
import { ProducerItemList } from "./ProducerItemList";
import { ResetSettingsButton } from "./ResetSettingsButton";
import { ScoreBonusInputSet } from "./ScoreBonusInputSet";
import { ScoreInformation } from "./ScoreInformation";
import { SkipButton } from "./SkipButton";
import { SpecialTrainingLevelSelect } from "./SpecialTrainingLevelSelect";
import { TalentAwakeningLevelSelect } from "./TalentAwakeningLevelSelect";
import { TurnInformation } from "./TurnInformation";

type ActionEndOrNotPreviewProps = React.ComponentProps<
  typeof ActionEndOrNotPreview
>;
type CardInHandsProps = React.ComponentProps<typeof CardListInHand>;
type CardPlayPreviewProps = React.ComponentProps<typeof CardPlayPreview>;
type ClearScoreThresholdsInputSetProps = React.ComponentProps<
  typeof ClearScoreThresholdsInputSet
>;
type ExportDataLinkProps = React.ComponentProps<typeof ExportDataLink>;
type IdolInformationProps = React.ComponentProps<typeof IdolInformation>;
type IdolSelectProps = React.ComponentProps<typeof IdolSelect>;
type ImportDataButtonProps = React.ComponentProps<typeof ImportDataButton>;
type LifeInputProps = React.ComponentProps<typeof LifeInput>;
type MaxLifeInputProps = React.ComponentProps<typeof MaxLifeInput>;
type ResetSettingsButtonProps = React.ComponentProps<
  typeof ResetSettingsButton
>;
type ScoreBonusInputSetProps = React.ComponentProps<typeof ScoreBonusInputSet>;
type ScoreInformationProps = React.ComponentProps<typeof ScoreInformation>;
type SkipButtonProps = React.ComponentProps<typeof SkipButton>;
type TurnInformationProps = React.ComponentProps<typeof TurnInformation>;
type SpecialTrainingLevelSelectProps = React.ComponentProps<
  typeof SpecialTrainingLevelSelect
>;
type TalentAwakeningLevelSelectProps = React.ComponentProps<
  typeof TalentAwakeningLevelSelect
>;

const PageContent: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ children, onClick }) => {
  return (
    <div className="w-[360px] h-[720px] relative bg-slate-50" onClick={onClick}>
      {children}
    </div>
  );
};

const TabOnPageContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Tab className="flex-none p-2 text-xs bg-slate-200 data-[selected]:bg-slate-50 cursor-pointer">
      {children}
    </Tab>
  );
};

const TabPanelOnPageContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <TabPanel className="h-[680px] bg-slate-50">{children}</TabPanel>;
};

type Props = {
  actionEndOrNotPreview?: ActionEndOrNotPreviewProps;
  cardPlayPreview?: CardPlayPreviewProps;
  clearScoreThresholdsInputSet: ClearScoreThresholdsInputSetProps;
  exportDataLink: ExportDataLinkProps;
  hand: LessonDisplay["hand"];
  idolSelect: IdolSelectProps;
  idolInformation: IdolInformationProps;
  importDataButton: ImportDataButtonProps;
  lifeInput: LifeInputProps;
  maxLifeInput: MaxLifeInputProps;
  modifiers: LessonDisplay["modifiers"];
  onClickCardInHand: CardInHandsProps["onClick"];
  onClickLessonPageContent: () => void;
  onClickRestartLessonButton: () => void;
  producerItems: LessonDisplay["producerItems"];
  resetSettingsButtonProps: ResetSettingsButtonProps;
  scoreBonusInputSet: ScoreBonusInputSetProps;
  scoreInformation: ScoreInformationProps;
  selectedCardIndex?: number;
  skipButton: SkipButtonProps;
  specialTrainingLevelSelect: SpecialTrainingLevelSelectProps;
  talentAwakeningLevelSelect: TalentAwakeningLevelSelectProps;
  turnInformation: TurnInformationProps;
};

export const IndexPageView: React.FC<Props> = (props) => {
  return (
    <main className="flex gap-2">
      <PageContent onClick={props.onClickLessonPageContent}>
        <div className="h-[40px] flex">
          <Button
            className="p-2 text-xs border"
            onClick={props.onClickRestartLessonButton}
          >
            リスタート
          </Button>
        </div>
        <div className="h-[160px] flex justify-center items-center bg-slate-100">
          <div className="flex-1">
            <TurnInformation {...props.turnInformation} />
          </div>
          <div className="flex-1 h-full">
            <ScoreInformation {...props.scoreInformation} />
          </div>
          <div className="flex-1">
            <IdolInformation {...props.idolInformation} />
          </div>
        </div>
        <div className="h-[280px] flex">
          <div className="flex-1 w-6/12">
            <ModifierList modifiers={props.modifiers} />
          </div>
          <div className="flex-1 w-6/12">
            <ProducerItemList producerItems={props.producerItems} />
          </div>
        </div>
        <CardListInHand
          hand={props.hand}
          onClick={props.onClickCardInHand}
          selectedCardIndex={props.selectedCardIndex}
        />
        <div className="h-[80px]"></div>
        {props.actionEndOrNotPreview && (
          <div className="absolute top-[412px] left-[4px] z-5">
            <ActionEndOrNotPreview {...props.actionEndOrNotPreview} />
          </div>
        )}
        <div className="absolute top-[412px] right-[52px] z-5">
          <SkipButton {...props.skipButton} />
        </div>
        {props.cardPlayPreview && (
          <CardPlayPreview {...props.cardPlayPreview} />
        )}
      </PageContent>
      <PageContent>
        <TabGroup>
          <TabList className="h-[40px] flex">
            <TabOnPageContent>基本</TabOnPageContent>
            <TabOnPageContent>ターン</TabOnPageContent>
            <TabOnPageContent>カード</TabOnPageContent>
            <TabOnPageContent>Pアイ</TabOnPageContent>
            <TabOnPageContent>Pドリ</TabOnPageContent>
          </TabList>
          <TabPanels>
            <TabPanelOnPageContent>
              <Fieldset className="space-y-1">
                <Legend className="text-lg font-bold">基本設定</Legend>
                <Field>
                  <Label className="block text-sm">アイドル:</Label>
                  <div>
                    <IdolSelect {...props.idolSelect} />
                  </div>
                </Field>
                <Field>
                  <Label className="text-sm">特訓段階:</Label>
                  <SpecialTrainingLevelSelect
                    {...props.specialTrainingLevelSelect}
                  />
                </Field>
                <Field>
                  <Label className="text-sm">才能開花:</Label>
                  <TalentAwakeningLevelSelect
                    {...props.talentAwakeningLevelSelect}
                  />
                </Field>
                <Field>
                  <Label className="text-sm">体力:</Label>
                  <LifeInput {...props.lifeInput} />
                </Field>
                <Field>
                  <Label className="text-sm">最大体力:</Label>
                  <MaxLifeInput {...props.maxLifeInput} />
                </Field>
                <Field>
                  <Label className="text-sm">スコアボーナス:</Label>
                  <ScoreBonusInputSet {...props.scoreBonusInputSet} />
                </Field>
                <Field>
                  <Label className="text-sm">クリア/パーフェクト基準:</Label>
                  <ClearScoreThresholdsInputSet
                    {...props.clearScoreThresholdsInputSet}
                  />
                </Field>
                <Field>
                  <Label className="text-sm">データインポート:</Label>
                  <ImportDataButton {...props.importDataButton} />
                </Field>
                <Field>
                  <Label className="text-sm">データエクスポート:</Label>
                  <ExportDataLink {...props.exportDataLink} />
                </Field>
                <Field>
                  <Label className="text-sm">初期設定へ戻す:</Label>
                  <ResetSettingsButton {...props.resetSettingsButtonProps} />
                </Field>
              </Fieldset>
            </TabPanelOnPageContent>
            <TabPanelOnPageContent>ターン・応援/トラブル</TabPanelOnPageContent>
            <TabPanelOnPageContent>
              スキルカード検索＆追加＆削除・整列・強化On/Off・固有追加・初期カードセット追加・整列順に引く
            </TabPanelOnPageContent>
            <TabPanelOnPageContent>
              Pアイテム検索＆追加＆削除・固有追加
            </TabPanelOnPageContent>
            <TabPanelOnPageContent>
              Pドリンク検索＆追加＆削除
            </TabPanelOnPageContent>
          </TabPanels>
        </TabGroup>
      </PageContent>
    </main>
  );
};
