import {
  type GamePlay,
  generateCardPlayPreviewDisplay,
  generateLessonDisplay,
  getLesson,
  initializeGamePlay,
  startTurn,
} from "gakumas-core";
import React, { useCallback, useState } from "react";
import { IndexPageView } from "./View";

type Props = React.ComponentProps<typeof IndexPageView>;

export const useIndexPage = (): Props => {
  const [gamePlay, setGamePlay] = useState<GamePlay>(() => {
    return initializeGamePlay({
      idolDataId: "kuramotochina-ssr-1",
      specialTrainingLevel: 3,
      talentAwakeningLevel: 2,
      cards: [
        { id: "hombanzenya", enhanced: true },
        // { id: "hombanzenya", enhanced: true },
        // { id: "hombanzenya" },
        // { id: "hombanzenya" },
        // { id: "hombanzenya" },
        // { id: "apirunokihon" },
        { id: "genkinaaisatsu", enhanced: true },
      ],
      producerItems: [{ id: "masukottohikonin" }],
      turns: ["dance", "dance", "dance", "dance", "dance", "dance", "dance"],
      clearScoreThresholds: { clear: 100, perfect: 100 },
    });
  });
  const [selectedCardIndex, setSelectedCardIndex] =
    useState<Props["selectedCardIndex"]>();
  const lesson = getLesson(gamePlay);
  const newGamePlay = startTurn(gamePlay);
  const lessonDisplay = generateLessonDisplay(newGamePlay);
  const cardPlayPreview =
    selectedCardIndex !== undefined
      ? {
          onClick: () => {
            setSelectedCardIndex(undefined);
          },
          preview: generateCardPlayPreviewDisplay(
            newGamePlay,
            selectedCardIndex,
          ),
        }
      : undefined;
  const onClickCardInHand = useCallback((selectedCardIndex: number) => {
    setSelectedCardIndex(selectedCardIndex);
  }, []);
  return {
    cardPlayPreview,
    hand: lessonDisplay.hand,
    life: lessonDisplay.life,
    maxLife: lesson.idol.original.maxLife,
    modifiers: lessonDisplay.modifiers,
    onClickCardInHand,
    producerItems: lessonDisplay.producerItems,
    remainingTurns: lessonDisplay.remainingTurns,
    remainingTurnsChange: lessonDisplay.remainingTurnsChange,
    score: lessonDisplay.score,
    selectedCardIndex,
    vitality: lessonDisplay.vitality,
  };
};
