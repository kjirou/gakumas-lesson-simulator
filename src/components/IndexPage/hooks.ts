import { IdolDataId, getCardSetDataById } from "gakumas-core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IndexPageView } from "./View";
import {
  InitializeGamePlayParams,
  SavedData,
  SavedDataManager,
  defaultSavedData,
  specialTrainingLevelSelectOptions,
  talentAwakeningLevelSelectOptions,
} from "./utils";

type Props = React.ComponentProps<typeof IndexPageView>;

const localStorageSavedDataKey = "GakumasLessonSimulator";

/**
 * ゲームへ反映しているセーブデータとそれを操作する関数群を一式で返す
 *
 * - ローカルストレージまたは手動でインポートしたJSONファイルからロードできる
 * - TODO: JSONファイルのバリデーション・フォールバック
 * - TODO: 可能な範囲でマイグレーション対応
 */
export const useSavedDataManager = (): SavedDataManager => {
  // false はロード中
  const [localStorageJson, setLocalStorageJson] = useState<
    string | undefined | false
  >(false);
  const [importedJson, setImportedJson] = useState<string | undefined>(
    undefined,
  );
  const clearSavedData = useCallback(() => {
    setLocalStorageJson(undefined);
    setImportedJson(undefined);
  }, []);
  useEffect(() => {
    try {
      const json = localStorage.getItem(localStorageSavedDataKey);
      setLocalStorageJson(json || undefined);
    } catch (error) {
      console.error(error);
      window.alert(
        "ブラウザのローカルストレージから、データの読み込みに失敗しました。",
      );
    }
  }, []);
  const savedData = useMemo(() => {
    const rawJson = importedJson || localStorageJson;
    if (rawJson) {
      // TODO: バリデーションとフォールバック
      const savedData: SavedData = JSON.parse(rawJson);
      return savedData;
    }
    return defaultSavedData;
  }, [localStorageJson, importedJson]);
  return {
    clearSavedData,
    isLoading: localStorageJson === false,
    savedData,
    setImportedJson,
  };
};

/**
 * アプリケーションの設定値に使われている入力値群
 *
 * - 設定値は、全て保存の対象にする
 */
type SettingInputValues = {
  clearScoreInputValue: string;
  idolDataIdInputValue: IdolDataId;
  isScoreBonusEnabledInputValue: boolean;
  lifeInputValue: string;
  maxLifeInputValue: string;
  perfectScoreInputValue: string;
  scoreBonusInputValueSet: SavedData["scoreBonus"]["values"];
  specialTrainingLevelInputValue: (typeof specialTrainingLevelSelectOptions)[number];
  talentAwakeningLevelInputValue: (typeof talentAwakeningLevelSelectOptions)[number];
};

type SettingInputValueSetters = {
  setClearScoreInputValue: (
    value: SettingInputValues["clearScoreInputValue"],
  ) => void;
  setIdolDataIdInputValue: (
    value: SettingInputValues["idolDataIdInputValue"],
  ) => void;
  setIsScoreBonusEnabledInputValue: (
    value: SettingInputValues["isScoreBonusEnabledInputValue"],
  ) => void;
  setLifeInputValue: (value: SettingInputValues["lifeInputValue"]) => void;
  setMaxLifeInputValue: (
    value: SettingInputValues["maxLifeInputValue"],
  ) => void;
  setPerfectScoreInputValue: (
    value: SettingInputValues["perfectScoreInputValue"],
  ) => void;
  setScoreBonusInputValueSet: (
    value: SettingInputValues["scoreBonusInputValueSet"],
  ) => void;
  setSpecialTrainingLevelInputValue: (
    value: SettingInputValues["specialTrainingLevelInputValue"],
  ) => void;
  setTalentAwakeningLevelInputValue: (
    value: SettingInputValues["talentAwakeningLevelInputValue"],
  ) => void;
};

const convertInputValuesToSavedData = (
  params: SettingInputValues,
): SavedData => {
  return {
    clearScoreThresholds: {
      clear: params.clearScoreInputValue,
      perfect: params.perfectScoreInputValue,
    },
    idolDataId: params.idolDataIdInputValue,
    life: params.lifeInputValue,
    maxLife: params.maxLifeInputValue,
    scoreBonus: {
      isEnabled: params.isScoreBonusEnabledInputValue,
      values: params.scoreBonusInputValueSet,
    },
    specialTrainingLevel: params.specialTrainingLevelInputValue,
    talentAwakeningLevel: params.talentAwakeningLevelInputValue,
  };
};

/**
 * initializeGamePlay に渡す引数を生成する
 *
 * @param inputValues メモ化されている値であること
 */
const useGamePlaySettings = (
  inputValues: SettingInputValues,
): InitializeGamePlayParams => {
  return useMemo(() => {
    const scoreBonus = inputValues.isScoreBonusEnabledInputValue
      ? {
          vocal: Number(inputValues.scoreBonusInputValueSet.vocal),
          dance: Number(inputValues.scoreBonusInputValueSet.dance),
          visual: Number(inputValues.scoreBonusInputValueSet.visual),
        }
      : undefined;
    const clearScore =
      inputValues.clearScoreInputValue !== ""
        ? Number(inputValues.clearScoreInputValue)
        : undefined;
    const perfectScore =
      clearScore !== undefined && inputValues.perfectScoreInputValue !== ""
        ? Number(inputValues.perfectScoreInputValue)
        : undefined;
    const clearScoreThresholds =
      clearScore !== undefined
        ? {
            clear: clearScore,
            perfect: perfectScore,
          }
        : undefined;
    return {
      cards: [],
      // cards: [
      //   { id: "hombanzenya", enhanced: true },
      //   { id: "hombanzenya" },
      //   { id: "genkinaaisatsu", enhanced: true },
      //   { id: "watashigasuta", enhanced: true },
      //   { id: "watashigasuta", enhanced: true },
      //   { id: "watashigasuta" },
      //   { id: "kokumintekiaidoru" },
      //   ...getCardSetDataById("defaultLogicMotivation").cardDataIds.map(
      //     (cardDataId: any) => ({
      //       id: cardDataId,
      //     }),
      //   ),
      // ],
      clearScoreThresholds,
      idolDataId: inputValues.idolDataIdInputValue,
      life:
        inputValues.lifeInputValue !== ""
          ? Number(inputValues.lifeInputValue)
          : undefined,
      maxLife:
        inputValues.maxLifeInputValue !== ""
          ? Number(inputValues.maxLifeInputValue)
          : undefined,
      producerItems: [],
      scoreBonus,
      specialTrainingLevel: Number(inputValues.specialTrainingLevelInputValue),
      talentAwakeningLevel: Number(inputValues.talentAwakeningLevelInputValue),
      turns: ["vocal", "dance", "visual"],
    };
  }, [inputValues]);
};

const useSettingVariables = (
  savedData: SavedData,
): {
  gamePlaySettings: InitializeGamePlayParams;
  newSavedData: SavedData;
  settingInputValues: SettingInputValues;
  setters: SettingInputValueSetters;
} => {
  const [idolDataIdInputValue, setIdolDataIdInputValue] = useState<
    SettingInputValues["idolDataIdInputValue"]
  >(savedData.idolDataId);
  const [specialTrainingLevelInputValue, setSpecialTrainingLevelInputValue] =
    useState<SettingInputValues["specialTrainingLevelInputValue"]>(
      savedData.specialTrainingLevel,
    );
  const [talentAwakeningLevelInputValue, setTalentAwakeningLevelInputValue] =
    useState<SettingInputValues["talentAwakeningLevelInputValue"]>(
      savedData.talentAwakeningLevel,
    );
  const [lifeInputValue, setLifeInputValue] = useState<
    SettingInputValues["lifeInputValue"]
  >(savedData.life);
  const [maxLifeInputValue, setMaxLifeInputValue] = useState<
    SettingInputValues["maxLifeInputValue"]
  >(savedData.maxLife);
  const [isScoreBonusEnabledInputValue, setIsScoreBonusEnabledInputValue] =
    useState<SettingInputValues["isScoreBonusEnabledInputValue"]>(
      savedData.scoreBonus.isEnabled,
    );
  const [scoreBonusInputValueSet, setScoreBonusInputValueSet] = useState<
    SettingInputValues["scoreBonusInputValueSet"]
  >(savedData.scoreBonus.values);
  const [clearScoreInputValue, setClearScoreInputValue] = useState<
    SettingInputValues["clearScoreInputValue"]
  >(savedData.clearScoreThresholds.clear);
  const [perfectScoreInputValue, setPerfectScoreInputValue] = useState<
    SettingInputValues["perfectScoreInputValue"]
  >(savedData.clearScoreThresholds.perfect);
  const [beforeSavedData, setBeforeSavedData] = useState<SavedData>(savedData);
  if (savedData !== beforeSavedData) {
    setIdolDataIdInputValue(savedData.idolDataId);
    setSpecialTrainingLevelInputValue(savedData.specialTrainingLevel);
    setTalentAwakeningLevelInputValue(savedData.talentAwakeningLevel);
    setLifeInputValue(savedData.life);
    setMaxLifeInputValue(savedData.maxLife);
    setIsScoreBonusEnabledInputValue(savedData.scoreBonus.isEnabled);
    setScoreBonusInputValueSet(savedData.scoreBonus.values);
    setClearScoreInputValue(savedData.clearScoreThresholds.clear);
    setPerfectScoreInputValue(savedData.clearScoreThresholds.perfect);
    setBeforeSavedData(savedData);
  }
  const settingInputValues = useMemo<SettingInputValues>(() => {
    return {
      clearScoreInputValue,
      idolDataIdInputValue,
      isScoreBonusEnabledInputValue,
      lifeInputValue,
      maxLifeInputValue,
      perfectScoreInputValue,
      scoreBonusInputValueSet,
      specialTrainingLevelInputValue,
      talentAwakeningLevelInputValue,
    };
  }, [
    clearScoreInputValue,
    idolDataIdInputValue,
    isScoreBonusEnabledInputValue,
    lifeInputValue,
    maxLifeInputValue,
    perfectScoreInputValue,
    scoreBonusInputValueSet,
    specialTrainingLevelInputValue,
    talentAwakeningLevelInputValue,
  ]);
  const newSavedData = useMemo(
    () => convertInputValuesToSavedData(settingInputValues),
    [settingInputValues],
  );
  const gamePlaySettings = useGamePlaySettings(settingInputValues);
  return {
    gamePlaySettings,
    newSavedData,
    setters: {
      setClearScoreInputValue,
      setIdolDataIdInputValue,
      setIsScoreBonusEnabledInputValue,
      setLifeInputValue,
      setMaxLifeInputValue,
      setPerfectScoreInputValue,
      setScoreBonusInputValueSet,
      setSpecialTrainingLevelInputValue,
      setTalentAwakeningLevelInputValue,
    },
    settingInputValues,
  };
};

const useLocalStorageSynchronization = (savedData: SavedData) => {
  useEffect(() => {
    try {
      const json = JSON.stringify(savedData);
      localStorage.setItem(localStorageSavedDataKey, json);
    } catch (error) {
      console.error(error);
    }
  }, [savedData]);
};

export const usePageView = (savedDataManager: SavedDataManager): Props => {
  const {
    settingInputValues,
    setters: {
      setClearScoreInputValue,
      setIdolDataIdInputValue,
      setIsScoreBonusEnabledInputValue,
      setLifeInputValue,
      setMaxLifeInputValue,
      setPerfectScoreInputValue,
      setScoreBonusInputValueSet,
      setSpecialTrainingLevelInputValue,
      setTalentAwakeningLevelInputValue,
    },
    newSavedData,
    gamePlaySettings,
  } = useSettingVariables(savedDataManager.savedData);
  const {
    clearScoreInputValue,
    idolDataIdInputValue,
    isScoreBonusEnabledInputValue,
    lifeInputValue,
    maxLifeInputValue,
    perfectScoreInputValue,
    scoreBonusInputValueSet,
    specialTrainingLevelInputValue,
    talentAwakeningLevelInputValue,
  } = settingInputValues;
  useLocalStorageSynchronization(newSavedData);
  return {
    lessonPageContent: {
      gamePlaySettings,
    },
    settingsPageContent: {
      clearScoreThresholdsInputSet: {
        clearScoreInputValue,
        perfectScoreInputValue,
        setClearScoreInputValue,
        setPerfectScoreInputValue,
      },
      exportDataLink: {
        data: newSavedData,
      },
      idolSelect: {
        idolDataIdInputValue,
        setIdolDataIdInputValue,
      },
      importDataButton: {
        setImportedJson: savedDataManager.setImportedJson,
      },
      lifeInput: {
        lifeInputValue,
        setLifeInputValue,
      },
      maxLifeInput: {
        maxLifeInputValue,
        setMaxLifeInputValue,
      },
      resetSettingsButtonProps: {
        clearSavedData: savedDataManager.clearSavedData,
      },
      scoreBonusInputSet: {
        isScoreBonusEnabledInputValue,
        scoreBonusInputValueSet,
        setIsScoreBonusEnabledInputValue,
        setScoreBonusInputValueSet,
      },
      specialTrainingLevelSelect: {
        setSpecialTrainingLevelInputValue,
        specialTrainingLevelInputValue,
      },
      talentAwakeningLevelSelect: {
        talentAwakeningLevelInputValue,
        setTalentAwakeningLevelInputValue,
      },
    },
  };
};
