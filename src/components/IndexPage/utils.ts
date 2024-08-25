/**
 * 大体ここにあるものは、gakumas-core 側で実装しないとダメなやつ
 */

import {
  ActionCost,
  CardData,
  CardEffectDisplay,
  CardSummaryKind,
  CharacterData,
  CharacterDataId,
  GamePlay,
  Idol,
  IdolData,
  IdolDataId,
  IdolParameterKind,
  Lesson,
  ModifierDisplay,
  ProducePlan,
  ProducerItemData,
  cards,
  getCharacterDataById,
  getIdolParameterKindOnTurn,
  getLesson,
  hasActionEnded,
  idols,
  initializeGamePlay,
  isCardDataIdType,
  isIdolDataIdType,
  isLessonEnded,
  isProducerItemDataIdType,
} from "gakumas-core";

export const localStorageSavedDataKey = "GakumasLessonSimulator";

/** 0を超える数なら "+" 付きの、0未満の数なら "-" 付きの、数値を表す文字列を返す */
export const formatSignedNumber = (value: number): string => {
  return value >= 0 ? `+${value}` : `${value}`;
};

export const idolParameterKindToText = (kind: IdolParameterKind): string => {
  switch (kind) {
    case "dance":
      return "ダンス";
    case "visual":
      return "ビジュアル";
    case "vocal":
      return "ボーカル";
    default:
      const unreachable: never = kind;
      throw new Error("Unreachable statement");
  }
};

export const idolParameterKindToTextColorClassName = (
  kind: IdolParameterKind,
): string => {
  switch (kind) {
    case "dance":
      return "text-gimDance";
    case "visual":
      return "text-gimVisual";
    case "vocal":
      return "text-gimVocal";
    default:
      const unreachable: never = kind;
      throw new Error("Unreachable statement");
  }
};

const rarityToText = (kind: "c" | "r" | "sr" | "ssr"): string => {
  return kind.toUpperCase();
};

export const actionCostKindToText = (kind: ActionCost["kind"]): string => {
  switch (kind) {
    case "focus":
      return "集中";
    case "goodCondition":
      return "好調";
    case "life":
      return "体力消費";
    case "motivation":
      return "やる気";
    case "normal":
      return "コスト";
    case "positiveImpression":
      return "好印象";
    default:
      const unreachable: never = kind;
      throw new Error("Unreachable statement");
  }
};

export const cardPossessionKindToText = (
  kind: CardData["cardPossessionKind"],
): string => {
  switch (kind) {
    case "free":
      return "フリー";
    case "logic":
      return "ロジック";
    case "sense":
      return "センス";
    default:
      const unreachable: never = kind;
      throw new Error("Unreachable statement");
  }
};

export const cardSummaryKindToText = (kind: CardSummaryKind): string => {
  switch (kind) {
    case "active":
      return "アクティブ";
    case "mental":
      return "メンタル";
    case "trouble":
      return "トラブル";
    default:
      const unreachable: never = kind;
      throw new Error("Unreachable statement");
  }
};

export const producerItemPossessionKindToText = (
  kind: ProducerItemData["producerItemPossessionKind"],
): string => {
  switch (kind) {
    case "free":
      return "フリー";
    case "logic":
      return "ロジック";
    case "sense":
      return "センス";
    default:
      const unreachable: never = kind;
      throw new Error("Unreachable statement");
  }
};

// NOTE: 通常は kind に対してアイコンがあれば良い。本実装では手間削減で文字列にするために構造体を返している。
export const getCardEffectDisplayKindIcon = (
  kind: CardEffectDisplay["kind"],
): { iconColorClassName: string; label: string } => {
  switch (kind) {
    case "drainLife":
      return {
        label: "体力減少",
        iconColorClassName: "text-gimDebuff",
      };
    case "drawCards":
      return {
        label: "ドロー",
        iconColorClassName: "text-gimBuff",
      };
    case "enhanceHand":
      return {
        label: "手札強化",
        iconColorClassName: "text-gimBuff",
      };
    case "exchangeHand":
      return {
        label: "手札交換",
        iconColorClassName: "text-gimBuff",
      };
    case "generateCard":
      return {
        label: "生成",
        iconColorClassName: "text-gimDebuff",
      };
    case "generateTroubleCard":
      return {
        label: "生成",
        iconColorClassName: "text-gimBuff",
      };
    case "increaseRemainingTurns":
      return {
        label: "ターン＋",
        iconColorClassName: "text-gimBuff",
      };
    case "modifier-additionalCardUsageCount":
      return {
        label: "使用数＋",
        iconColorClassName: "text-gimBuff",
      };
    case "modifier-debuffProtection":
      return {
        label: "低下無効",
        iconColorClassName: "text-gimBuff",
      };
    case "modifier-delayedEffect":
      return {
        label: "発動予約",
        iconColorClassName: "text-gimBuff",
      };
    case "modifier-doubleEffect":
      return {
        label: "追加発動",
        iconColorClassName: "text-gimBuff",
      };
    case "modifier-doubleLifeConsumption":
      return {
        label: "消費増加",
        iconColorClassName: "text-gimDebuff",
      };
    case "modifier-effectActivationBeforeCardEffectActivation":
    case "modifier-effectActivationOnTurnEnd":
      return {
        label: "持続効果",
        iconColorClassName: "text-gimEffectactivationbuff",
      };
    case "modifier-excellentCondition":
      return {
        label: "絶好調",
        iconColorClassName: "text-gimBuff",
      };
    case "modifier-focus":
      return {
        label: "集中",
        iconColorClassName: "text-gimBuff",
      };
    case "modifier-goodCondition":
      return {
        label: "好調",
        iconColorClassName: "text-gimBuff",
      };
    case "modifier-halfLifeConsumption":
      return {
        label: "消費減少",
        iconColorClassName: "text-gimBuff",
      };
    case "modifier-lifeConsumptionReduction":
      return {
        label: "消費削減",
        iconColorClassName: "text-gimBuff",
      };
    case "modifier-mightyPerformance":
      return {
        label: "スコア増加",
        iconColorClassName: "text-gimBuff",
      };
    case "modifier-motivation":
      return {
        label: "やる気",
        iconColorClassName: "text-gimBuff",
      };
    case "modifier-noVitalityIncrease":
      return {
        label: "元気無効",
        iconColorClassName: "text-gimBuff",
      };
    case "modifier-positiveImpression":
      return {
        label: "好印象",
        iconColorClassName: "text-gimBuff",
      };
    case "multiplyModifier":
      return {
        label: "バフ乗算",
        iconColorClassName: "text-gimBuff",
      };
    case "perform-score":
      return {
        label: "スコア＋",
        iconColorClassName: "text-gimBuff",
      };
    case "perform-vitality":
      return {
        label: "元気＋",
        iconColorClassName: "text-gimBuff",
      };
    case "performLeveragingModifier":
    case "performLeveragingVitality":
      return {
        label: "ボム",
        iconColorClassName: "text-gimBuff",
      };
    case "recoverLife":
      return {
        label: "体力回復",
        iconColorClassName: "text-gimBuff",
      };
    default:
      return {
        label: "その他",
        iconColorClassName: "text-gimBuff",
      };
  }
};

export const getModifierDisplayKindIcon = (kind: ModifierDisplay["kind"]) => {
  const cardEffectDisplayKind = `modifier-${kind}` as const;
  return getCardEffectDisplayKindIcon(cardEffectDisplayKind);
};

export const createCharacterFullName = (
  characterDataId: CharacterData["id"],
): string => {
  const characterData = getCharacterDataById(characterDataId);
  return `${characterData.lastName} ${characterData.firstName}`;
};

export type InitializeGamePlayParams = Parameters<typeof initializeGamePlay>[0];

export type SelectableIdol = {
  fullName: string;
  idolId: IdolData["id"];
  rarity: string;
  title: IdolData["title"];
};

export const selectableIdols: SelectableIdol[] = idols.map((idol) => {
  return {
    fullName: createCharacterFullName(idol.characterId),
    idolId: idol.id,
    rarity: rarityToText(idol.rarity),
    title: idol.title,
  };
});

export const idolParameterKindSelectOptions = [
  "vocal",
  "dance",
  "visual",
] as const satisfies IdolParameterKind[];

export const specialTrainingLevelSelectOptions = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
] as const;

export const talentAwakeningLevelSelectOptions = [
  "0",
  "1",
  "2",
  "3",
  "4",
] as const;

/**
 * アプリケーションの設定値に使われている入力値群
 *
 * - ここにある値は、全て保存の対象になる
 */
export type SettingInputValues = {
  cardsInputValue: InitializeGamePlayParams["cards"];
  clearScoreInputValue: string;
  idolDataIdInputValue: IdolDataId;
  isDeckOrderFixedInputValue: boolean;
  isScoreBonusEnabledInputValue: boolean;
  lifeInputValue: string;
  maxLifeInputValue: string;
  perfectScoreInputValue: string;
  producerItemsInputValue: InitializeGamePlayParams["producerItems"];
  scoreBonusInputValueSet: Record<IdolParameterKind, string>;
  specialTrainingLevelInputValue: (typeof specialTrainingLevelSelectOptions)[number];
  talentAwakeningLevelInputValue: (typeof talentAwakeningLevelSelectOptions)[number];
  turnsInputValue: InitializeGamePlayParams["turns"];
};

export type SettingInputValueSetters = {
  setCardsInputValue: React.Dispatch<
    React.SetStateAction<SettingInputValues["cardsInputValue"]>
  >;
  setClearScoreInputValue: React.Dispatch<
    React.SetStateAction<SettingInputValues["clearScoreInputValue"]>
  >;
  setIdolDataIdInputValue: React.Dispatch<
    React.SetStateAction<SettingInputValues["idolDataIdInputValue"]>
  >;
  setIsDeckOrderFixedInputValue: React.Dispatch<
    React.SetStateAction<SettingInputValues["isDeckOrderFixedInputValue"]>
  >;
  setIsScoreBonusEnabledInputValue: React.Dispatch<
    React.SetStateAction<SettingInputValues["isScoreBonusEnabledInputValue"]>
  >;
  setLifeInputValue: React.Dispatch<
    React.SetStateAction<SettingInputValues["lifeInputValue"]>
  >;
  setMaxLifeInputValue: React.Dispatch<
    React.SetStateAction<SettingInputValues["maxLifeInputValue"]>
  >;
  setPerfectScoreInputValue: React.Dispatch<
    React.SetStateAction<SettingInputValues["perfectScoreInputValue"]>
  >;
  setProducerItemsInputValue: React.Dispatch<
    React.SetStateAction<SettingInputValues["producerItemsInputValue"]>
  >;
  setScoreBonusInputValueSet: React.Dispatch<
    React.SetStateAction<SettingInputValues["scoreBonusInputValueSet"]>
  >;
  setSpecialTrainingLevelInputValue: React.Dispatch<
    React.SetStateAction<SettingInputValues["specialTrainingLevelInputValue"]>
  >;
  setTalentAwakeningLevelInputValue: React.Dispatch<
    React.SetStateAction<SettingInputValues["talentAwakeningLevelInputValue"]>
  >;
  setTurnsInputValue: React.Dispatch<
    React.SetStateAction<SettingInputValues["turnsInputValue"]>
  >;
};

/**
 * 主に設定値の保存のために、ローカルストレージやファイルへ保存するJSON形式のデータ
 */
export type SavedData = {
  settingInputValues: SettingInputValues;
};

export const defaultSavedData: SavedData = {
  settingInputValues: {
    cardsInputValue: [],
    clearScoreInputValue: "",
    idolDataIdInputValue: "hanamisaki-ssr-1",
    isDeckOrderFixedInputValue: false,
    isScoreBonusEnabledInputValue: false,
    lifeInputValue: "",
    maxLifeInputValue: "",
    perfectScoreInputValue: "",
    producerItemsInputValue: [],
    scoreBonusInputValueSet: {
      vocal: "100",
      dance: "100",
      visual: "100",
    },
    specialTrainingLevelInputValue: "3",
    talentAwakeningLevelInputValue: "2",
    turnsInputValue: ["vocal", "dance", "visual"],
  },
};

export type SavedDataManager = {
  clearSavedData: () => void;
  isLoading: boolean;
  savedData: SavedData;
  setImportedJson: (state: string) => void;
};

/**
 * 再帰的に、target に self のプロパティがない時は self の値をコピーし、また target に self にないプロパティがあれば削除する
 *
 * - 存否判定で埋めることしかしていないので、プロパティの型が異なる時は判別できない
 * - 配列を含む場合、そこから処理をしない
 */
export const tailorTargetToSelf = (
  self: { [k in string]: any },
  target: { [k in string]: any },
) => {
  const newData: { [k in string]: any } = {};
  for (const key in self) {
    const selfValue = self[key];
    if (!(key in target)) {
      newData[key] = selfValue;
    } else {
      const targetValue = target[key];
      if (
        typeof targetValue === "object" &&
        !Array.isArray(targetValue) &&
        targetValue !== null
      ) {
        newData[key] = tailorTargetToSelf(selfValue, targetValue);
      } else {
        newData[key] = targetValue;
      }
    }
  }
  return newData;
};

/**
 * オブジェクトを強制的に SavedData として解釈して変換する
 *
 * - かなり限定的な対応
 *   - やること
 *     - 再帰的に値を走査して、 defaultSavedData にあるプロパティを defaultSavedData からコピーする
 *     - 再帰的に値を走査して、 defaultSavedData にないプロパティを削除する
 *     - 存在しないIDは、他のIDへ置換したり、無視したりする
 *   - 例えば対応できないこと
 *     - 同名プロパティの値が異なる
 *     - 配列の要素の中のオブジェクトにキー欠落がある
 * - 網羅的な解決は、どこかでエラーが出たら、UI側でローカルストレージを削除できるようにするという方針
 */
export const forceInterpretObjectAsSavedData = (obj: Object): SavedData => {
  let newSavedData = tailorTargetToSelf(defaultSavedData, obj) as SavedData;
  if (!isIdolDataIdType(newSavedData.settingInputValues.idolDataIdInputValue)) {
    newSavedData.settingInputValues.idolDataIdInputValue =
      defaultSavedData.settingInputValues.idolDataIdInputValue;
  }
  newSavedData = {
    ...newSavedData,
    settingInputValues: {
      ...newSavedData.settingInputValues,
      cardsInputValue: newSavedData.settingInputValues.cardsInputValue.filter(
        (cardData) => isCardDataIdType(cardData.id),
      ),
      producerItemsInputValue:
        newSavedData.settingInputValues.producerItemsInputValue.filter(
          (producerItemData) => isProducerItemDataIdType(producerItemData.id),
        ),
    },
  };
  return newSavedData;
};

export const canCardBeEnhancedWithSpecialTrainingLevel = (
  inputValue: SettingInputValues["specialTrainingLevelInputValue"],
) => Number(inputValue) >= 3;

export const canProducerItemBeEnhancedWithTalentAwakeningLevel = (
  inputValue: SettingInputValues["talentAwakeningLevelInputValue"],
) => Number(inputValue) >= 2;

/**
 * スキルカードデータリストから、プロデュース中に取得可能な重複不可のものだけを抽出する
 */
export const filterCardsDataToNonDuplicativeOnly = (
  producePlan: ProducePlan,
) => {
  return cards.filter((cardData) => {
    return (
      cardData.nonDuplicative &&
      cardData.cardProviderKind === "others" &&
      (cardData.cardPossessionKind === "free" ||
        cardData.cardPossessionKind === producePlan.kind)
    );
  });
};
