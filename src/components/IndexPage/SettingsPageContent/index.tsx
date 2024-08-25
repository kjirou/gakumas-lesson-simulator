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
import { ProducerItemManager } from "./ProducerItemManager";
import { ResetSettingsButton } from "./ResetSettingsButton";
import { ScoreBonusInputSet } from "./ScoreBonusInputSet";
import { SpecialTrainingLevelSelect } from "./SpecialTrainingLevelSelect";
import { TalentAwakeningLevelSelect } from "./TalentAwakeningLevelSelect";
import { TurnManager } from "./TurnManager";

type CardManagerProps = React.ComponentProps<typeof CardManager>;
type ClearScoreThresholdsInputSetProps = React.ComponentProps<
  typeof ClearScoreThresholdsInputSet
>;
type ExportDataLinkProps = React.ComponentProps<typeof ExportDataLink>;
type IdolSelectProps = React.ComponentProps<typeof IdolSelect>;
type ImportDataButtonProps = React.ComponentProps<typeof ImportDataButton>;
type LifeInputProps = React.ComponentProps<typeof LifeInput>;
type MaxLifeInputProps = React.ComponentProps<typeof MaxLifeInput>;
type ProducerItemManagerProps = React.ComponentProps<
  typeof ProducerItemManager
>;
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
type TurnManagerProps = React.ComponentProps<typeof TurnManager>;

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
  producerItemManager: ProducerItemManagerProps;
  resetSettingsButtonProps: ResetSettingsButtonProps;
  scoreBonusInputSet: ScoreBonusInputSetProps;
  specialTrainingLevelSelect: SpecialTrainingLevelSelectProps;
  talentAwakeningLevelSelect: TalentAwakeningLevelSelectProps;
  turnManager: TurnManagerProps;
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
        </TabList>
        <TabPanels>
          <TabPanelOnPageContent>
            <Fieldset className="space-y-1">
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
            <ul className="absolute bottom-[0px] text-sm">
              <li>
                <span>不具合報告等は</span>
                <a
                  className="underline text-blue-500"
                  href="https://x.com/kjirou"
                  target="_blank"
                >
                  X
                </a>
                <span>か</span>
                <a
                  className="underline text-blue-500"
                  href="https://github.com/kjirou/gakumas-lesson-simulator"
                  target="_blank"
                >
                  GitHub
                </a>
                <span>のIssuesへお願いします。</span>
              </li>
              <li>
                更新履歴は
                <a
                  href="https://github.com/kjirou/gakumas-lesson-simulator/commits/main/"
                  className="underline text-blue-500"
                  target="_blank"
                >
                  ココ
                </a>
                か
                <a
                  href="https://github.com/kjirou/gakumas-core/commits/main/"
                  className="underline text-blue-500"
                  target="_blank"
                >
                  ココ
                </a>
                を見るとわかるカモ...
              </li>
              <li>学マスレッスンシミュレーター（β）</li>
            </ul>
          </TabPanelOnPageContent>
          <TabPanelOnPageContent>
            <TurnManager {...props.turnManager} />
          </TabPanelOnPageContent>
          <TabPanelOnPageContent>
            <CardManager {...props.cardManager} />
          </TabPanelOnPageContent>
          <TabPanelOnPageContent>
            <ProducerItemManager {...props.producerItemManager} />
          </TabPanelOnPageContent>
        </TabPanels>
      </TabGroup>
    </PageContent>
  );
};

export const SettingsPageContent = React.memo(SettingsPageContentRaw);
