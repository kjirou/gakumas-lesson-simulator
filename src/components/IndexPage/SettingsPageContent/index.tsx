import {
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
import React from "react";
import { PageContent } from "../PageContent";
import { CardManager } from "./CardManager";
import { ClearScoreThresholdsInputSet } from "./ClearScoreThresholdsInputSet";
import { ExportDataLink } from "./ExportDataLink";
import { IdolSelect } from "./IdolSelect";
import { ImportDataButton } from "./ImportDataButton";
import { LifeInput } from "./LifeInput";
import { MaxLifeInput } from "./MaxLifeInput";
import { ResetSettingsButton } from "./ResetSettingsButton";
import { ScoreBonusInputSet } from "./ScoreBonusInputSet";
import { SpecialTrainingLevelSelect } from "./SpecialTrainingLevelSelect";
import { TalentAwakeningLevelSelect } from "./TalentAwakeningLevelSelect";

type CardManagerProps = React.ComponentProps<typeof CardManager>;
type ClearScoreThresholdsInputSetProps = React.ComponentProps<
  typeof ClearScoreThresholdsInputSet
>;
type ExportDataLinkProps = React.ComponentProps<typeof ExportDataLink>;
type IdolSelectProps = React.ComponentProps<typeof IdolSelect>;
type ImportDataButtonProps = React.ComponentProps<typeof ImportDataButton>;
type LifeInputProps = React.ComponentProps<typeof LifeInput>;
type MaxLifeInputProps = React.ComponentProps<typeof MaxLifeInput>;
type ResetSettingsButtonProps = React.ComponentProps<
  typeof ResetSettingsButton
>;
type ScoreBonusInputSetProps = React.ComponentProps<typeof ScoreBonusInputSet>;
type SpecialTrainingLevelSelectProps = React.ComponentProps<
  typeof SpecialTrainingLevelSelect
>;
type TalentAwakeningLevelSelectProps = React.ComponentProps<
  typeof TalentAwakeningLevelSelect
>;

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
  cardManager: CardManagerProps;
  clearScoreThresholdsInputSet: ClearScoreThresholdsInputSetProps;
  exportDataLink: ExportDataLinkProps;
  idolSelect: IdolSelectProps;
  importDataButton: ImportDataButtonProps;
  lifeInput: LifeInputProps;
  maxLifeInput: MaxLifeInputProps;
  resetSettingsButtonProps: ResetSettingsButtonProps;
  scoreBonusInputSet: ScoreBonusInputSetProps;
  specialTrainingLevelSelect: SpecialTrainingLevelSelectProps;
  talentAwakeningLevelSelect: TalentAwakeningLevelSelectProps;
};

const SettingsPageContentRaw: React.FC<Props> = (props) => {
  return (
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
                <Label className="text-sm">特訓:</Label>
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
            <CardManager {...props.cardManager} />
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
  );
};

export const SettingsPageContent = React.memo(SettingsPageContentRaw);
