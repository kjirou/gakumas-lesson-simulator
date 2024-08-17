/**
 * 大体ここにあるものは、gakumas-core 側で実装しないとダメなやつ
 */

import {
  ActionCost,
  CardEffectDisplay,
  CharacterData,
  CharacterDataId,
  GamePlay,
  Idol,
  IdolData,
  IdolDataId,
  IdolParameterKind,
  Lesson,
  ModifierDisplay,
  getCharacterDataById,
  getIdolParameterKindOnTurn,
  getLesson,
  hasActionEnded,
  idols,
  initializeGamePlay,
  isLessonEnded,
} from "gakumas-core";

export const idolParameterKindToTextColorClassName = (
  kind: IdolParameterKind,
): string => {
  switch (kind) {
    case "dance":
      return "text-blue-500";
    case "visual":
      return "text-yellow-500";
    case "vocal":
      return "text-red-500";
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
      return "通常コスト";
    case "positiveImpression":
      return "好印象";
    default:
      const unreachable: never = kind;
      throw new Error("Unreachable statement");
  }
};

export const cardEffectDisplayKindToText = (
  kind: CardEffectDisplay["kind"],
): string => {
  switch (kind) {
    case "drainLife":
      return "体力減少";
    case "drawCards":
      return "ドロー";
    case "enhanceHand":
      return "手札強化";
    case "exchangeHand":
      return "手札交換";
    case "generateCard":
    case "generateTroubleCard":
      return "生成";
    case "increaseRemainingTurns":
      return "ターン＋";
    case "modifier-additionalCardUsageCount":
      return "使用数＋";
    case "modifier-debuffProtection":
      return "低下無効";
    case "modifier-delayedEffect":
      return "発動予約";
    case "modifier-doubleEffect":
      return "追加発動";
    case "modifier-doubleLifeConsumption":
      return "消費増加";
    case "modifier-effectActivationBeforeCardEffectActivation":
    case "modifier-effectActivationOnTurnEnd":
      return "持続効果";
    case "modifier-excellentCondition":
      return "絶好調";
    case "modifier-focus":
      return "集中";
    case "modifier-goodCondition":
      return "好調";
    case "modifier-halfLifeConsumption":
      return "消費減少";
    case "modifier-lifeConsumptionReduction":
      return "消費削減";
    case "modifier-mightyPerformance":
      return "スコア増加";
    case "modifier-motivation":
      return "やる気";
    case "modifier-noVitalityIncrease":
      return "元気無効";
    case "modifier-positiveImpression":
      return "好印象";
    case "multiplyModifier":
      return "バフ乗算";
    case "perform-score":
      return "スコア";
    case "perform-vitality":
      return "元気";
    case "performLeveragingModifier":
    case "performLeveragingVitality":
      return "ボム";
    case "recoverLife":
      return "体力回復";
    default:
      return "その他";
  }
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
 * 主に設定値の保存のために、ローカルストレージやファイルへ保存するJSON形式のデータ
 *
 * - 基本的には、入力値群を表現したものなので、個々の値は string か boolean になる
 */
export type SavedData = {
  clearScoreThresholds: {
    clear: string;
    perfect: string;
  };
  idolDataId: IdolDataId;
  life: string;
  maxLife: string;
  scoreBonus: {
    isEnabled: boolean;
    values: Record<IdolParameterKind, string>;
  };
  specialTrainingLevel: (typeof specialTrainingLevelSelectOptions)[number];
  talentAwakeningLevel: (typeof talentAwakeningLevelSelectOptions)[number];
};

export const defaultSavedData: SavedData = {
  clearScoreThresholds: {
    clear: "",
    perfect: "",
  },
  idolDataId: "hanamisaki-ssr-1",
  life: "",
  maxLife: "",
  scoreBonus: {
    isEnabled: false,
    values: {
      vocal: "100",
      dance: "100",
      visual: "100",
    },
  },
  specialTrainingLevel: "3",
  talentAwakeningLevel: "2",
};

export type SavedDataManager = {
  clearSavedData: () => void;
  isLoading: boolean;
  savedData: SavedData;
  setImportedJson: (state: string) => void;
};