import { IdolDataId, getCardSetDataById } from "gakumas-core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IndexPageView } from "./View";
import {
  InitializeGamePlayParams,
  SavedData,
  SavedDataManager,
  SettingInputValues,
  SettingInputValueSetters,
  defaultSavedData,
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
      cards: inputValues.cardsInputValue,
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
      noDeckShuffle: inputValues.isDeckOrderFixedInputValue,
      noIdolSpecificCard: true,
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
  settingInputValueSetters: SettingInputValueSetters;
} => {
  const savedSettingInputValues = savedData.settingInputValues;
  const [idolDataIdInputValue, setIdolDataIdInputValue] = useState<
    SettingInputValues["idolDataIdInputValue"]
  >(savedSettingInputValues.idolDataIdInputValue);
  const [specialTrainingLevelInputValue, setSpecialTrainingLevelInputValue] =
    useState<SettingInputValues["specialTrainingLevelInputValue"]>(
      savedSettingInputValues.specialTrainingLevelInputValue,
    );
  const [talentAwakeningLevelInputValue, setTalentAwakeningLevelInputValue] =
    useState<SettingInputValues["talentAwakeningLevelInputValue"]>(
      savedSettingInputValues.talentAwakeningLevelInputValue,
    );
  const [lifeInputValue, setLifeInputValue] = useState<
    SettingInputValues["lifeInputValue"]
  >(savedSettingInputValues.lifeInputValue);
  const [maxLifeInputValue, setMaxLifeInputValue] = useState<
    SettingInputValues["maxLifeInputValue"]
  >(savedSettingInputValues.maxLifeInputValue);
  const [isScoreBonusEnabledInputValue, setIsScoreBonusEnabledInputValue] =
    useState<SettingInputValues["isScoreBonusEnabledInputValue"]>(
      savedSettingInputValues.isDeckOrderFixedInputValue,
    );
  const [scoreBonusInputValueSet, setScoreBonusInputValueSet] = useState<
    SettingInputValues["scoreBonusInputValueSet"]
  >(savedSettingInputValues.scoreBonusInputValueSet);
  const [clearScoreInputValue, setClearScoreInputValue] = useState<
    SettingInputValues["clearScoreInputValue"]
  >(savedSettingInputValues.clearScoreInputValue);
  const [perfectScoreInputValue, setPerfectScoreInputValue] = useState<
    SettingInputValues["perfectScoreInputValue"]
  >(savedSettingInputValues.perfectScoreInputValue);
  const [isDeckOrderFixedInputValue, setIsDeckOrderFixedInputValue] = useState<
    SettingInputValues["isDeckOrderFixedInputValue"]
  >(savedSettingInputValues.isDeckOrderFixedInputValue);
  const [cardsInputValue, setCardsInputValue] = useState<
    SettingInputValues["cardsInputValue"]
  >(savedSettingInputValues.cardsInputValue);
  const [beforeSavedData, setBeforeSavedData] = useState<SavedData>(savedData);
  if (savedData !== beforeSavedData) {
    setIdolDataIdInputValue(savedSettingInputValues.idolDataIdInputValue);
    setSpecialTrainingLevelInputValue(
      savedSettingInputValues.specialTrainingLevelInputValue,
    );
    setTalentAwakeningLevelInputValue(
      savedSettingInputValues.talentAwakeningLevelInputValue,
    );
    setLifeInputValue(savedSettingInputValues.lifeInputValue);
    setMaxLifeInputValue(savedSettingInputValues.maxLifeInputValue);
    setIsScoreBonusEnabledInputValue(
      savedSettingInputValues.isScoreBonusEnabledInputValue,
    );
    setScoreBonusInputValueSet(savedSettingInputValues.scoreBonusInputValueSet);
    setClearScoreInputValue(savedSettingInputValues.clearScoreInputValue);
    setPerfectScoreInputValue(savedSettingInputValues.perfectScoreInputValue);
    setIsDeckOrderFixedInputValue(
      savedSettingInputValues.isDeckOrderFixedInputValue,
    );
    setCardsInputValue(savedSettingInputValues.cardsInputValue);
    setBeforeSavedData(savedData);
  }
  const settingInputValues = useMemo<SettingInputValues>(() => {
    return {
      cardsInputValue,
      clearScoreInputValue,
      idolDataIdInputValue,
      isDeckOrderFixedInputValue,
      isScoreBonusEnabledInputValue,
      lifeInputValue,
      maxLifeInputValue,
      perfectScoreInputValue,
      scoreBonusInputValueSet,
      specialTrainingLevelInputValue,
      talentAwakeningLevelInputValue,
    };
  }, [
    cardsInputValue,
    clearScoreInputValue,
    idolDataIdInputValue,
    isDeckOrderFixedInputValue,
    isScoreBonusEnabledInputValue,
    lifeInputValue,
    maxLifeInputValue,
    perfectScoreInputValue,
    scoreBonusInputValueSet,
    specialTrainingLevelInputValue,
    talentAwakeningLevelInputValue,
  ]);
  const newSavedData = useMemo(
    () => ({ settingInputValues }),
    [settingInputValues],
  );
  const gamePlaySettings = useGamePlaySettings(settingInputValues);
  return {
    gamePlaySettings,
    newSavedData,
    settingInputValues,
    settingInputValueSetters: {
      setCardsInputValue,
      setClearScoreInputValue,
      setIdolDataIdInputValue,
      setIsDeckOrderFixedInputValue,
      setIsScoreBonusEnabledInputValue,
      setLifeInputValue,
      setMaxLifeInputValue,
      setPerfectScoreInputValue,
      setScoreBonusInputValueSet,
      setSpecialTrainingLevelInputValue,
      setTalentAwakeningLevelInputValue,
    },
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
    settingInputValueSetters,
    newSavedData,
    gamePlaySettings,
  } = useSettingVariables(savedDataManager.savedData);
  const {
    cardsInputValue,
    clearScoreInputValue,
    idolDataIdInputValue,
    isDeckOrderFixedInputValue,
    isScoreBonusEnabledInputValue,
    lifeInputValue,
    maxLifeInputValue,
    perfectScoreInputValue,
    scoreBonusInputValueSet,
    specialTrainingLevelInputValue,
    talentAwakeningLevelInputValue,
  } = settingInputValues;
  const {
    setCardsInputValue,
    setClearScoreInputValue,
    setIdolDataIdInputValue,
    setIsDeckOrderFixedInputValue,
    setIsScoreBonusEnabledInputValue,
    setLifeInputValue,
    setMaxLifeInputValue,
    setPerfectScoreInputValue,
    setScoreBonusInputValueSet,
    setSpecialTrainingLevelInputValue,
    setTalentAwakeningLevelInputValue,
  } = settingInputValueSetters;
  useLocalStorageSynchronization(newSavedData);
  return {
    lessonPageContent: {
      gamePlaySettings,
    },
    settingsPageContent: {
      cardManager: {
        cardsInputValue,
        idolDataIdInputValue,
        isDeckOrderFixedInputValue,
        setCardsInputValue,
        setIsDeckOrderFixedInputValue,
        specialTrainingLevelInputValue,
      },
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
