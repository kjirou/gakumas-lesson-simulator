import {
  type DragEndEvent,
  DndContext,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import {
  Button,
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import {
  Card,
  CardData,
  CardDataId,
  cards,
  generateCardDescription,
  generateCardName,
  getCardContentData,
  getCardContentDataList,
  getCardDataById,
  getDefaultCardSetData,
  getIdolDataByConstId,
} from "gakumas-core";
import React, { useCallback, useMemo, useState } from "react";
import {
  SettingInputValues,
  SettingInputValueSetters,
  actionCostKindToText,
  cardPossessionKindToText,
  cardSummaryKindToText,
  canCardBeEnhancedWithSpecialTrainingLevel,
} from "../utils";
import { DescriptionDialog } from "./DescriptionDialog";

const createDndId = (index: number) =>
  `cardManagerCardListItem-${index}` as const;

const parseDndId = (dndId: ReturnType<typeof createDndId>): number => {
  const tokens = dndId.split("-");
  return Number(tokens[1]);
};

const CardDescriptionDialogRaw: React.FC<{
  data: CardData;
  enhanced: boolean;
  onClickBackdrop: Parameters<typeof DescriptionDialog>[0]["onClickBackdrop"];
}> = (props) => {
  const card: Card = {
    id: "",
    data: props.data,
    enhancements: props.enhanced ? [{ kind: "original" }] : [],
  };
  const cardContent = getCardContentData(card);
  const description = generateCardDescription({
    cost: cardContent.cost,
    condition: cardContent.condition,
    effects: cardContent.effects,
    innate: cardContent.innate,
    nonDuplicative: props.data.nonDuplicative,
    usableOncePerLesson: cardContent.usableOncePerLesson,
  });
  return (
    <DescriptionDialog onClickBackdrop={props.onClickBackdrop}>
      <ul className="flex flex-col">
        <li>{generateCardName(card)}</li>
        <li>
          <span>{cardPossessionKindToText(props.data.cardPossessionKind)}</span>
          <span className="pl-1 pr-1">/</span>
          <span>{cardSummaryKindToText(props.data.cardSummaryKind)}</span>
        </li>
        <li className="text-red-500">
          <span>{actionCostKindToText(cardContent.cost.kind)}:</span>
          <span className="ml-1">{cardContent.cost.value}</span>
        </li>
        <li className="p-1">
          {description.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </li>
      </ul>
    </DescriptionDialog>
  );
};

const CardDescriptionDialog = React.memo(CardDescriptionDialogRaw);

const CardListItemRaw: React.FC<{
  cardName: string;
  onClickCardCopyButton: (index: number) => void;
  onClickCardEnhanceButton: (index: number) => void;
  onClickCardName: (index: number) => void;
  onClickCardRemovalButton: (index: number) => void;
  listItemIndex: number;
}> = (props) => {
  const dndId = createDndId(props.listItemIndex);
  const { isOver, setNodeRef: setNodeRefDroppable } = useDroppable({
    id: dndId,
  });
  const {
    attributes,
    listeners,
    setNodeRef: setNodeRefDraggable,
    transform,
  } = useDraggable({
    id: dndId,
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };
  return (
    <li
      key={props.listItemIndex}
      ref={setNodeRefDroppable}
      className={
        "text-xs flex items-center border" + (isOver ? " bg-yellow-100" : "")
      }
    >
      <div
        className="w-1/12 select-none cursor-pointer"
        ref={setNodeRefDraggable}
        style={style}
        {...attributes}
        {...listeners}
      >
        {props.listItemIndex + 1}
      </div>
      <div
        className="flex-1 cursor-pointer"
        onClick={(event: React.MouseEvent<HTMLInputElement>) => {
          event.stopPropagation();
          props.onClickCardName(props.listItemIndex);
        }}
      >
        {props.cardName}
      </div>
      <div className="w-4/12 flex gap-0.5">
        <Button
          className="border select-none"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            props.onClickCardEnhanceButton(props.listItemIndex);
          }}
        >
          強化
        </Button>
        <Button
          className="border select-none"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            props.onClickCardCopyButton(props.listItemIndex);
          }}
        >
          複製
        </Button>
        <Button
          className="border select-none"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            props.onClickCardRemovalButton(props.listItemIndex);
          }}
        >
          削除
        </Button>
      </div>
    </li>
  );
};

const CardListItem = React.memo(CardListItemRaw);

type Props = {
  cardsInputValue: SettingInputValues["cardsInputValue"];
  idolDataIdInputValue: SettingInputValues["idolDataIdInputValue"];
  isDeckOrderFixedInputValue: SettingInputValues["isDeckOrderFixedInputValue"];
  setCardsInputValue: SettingInputValueSetters["setCardsInputValue"];
  setIsDeckOrderFixedInputValue: SettingInputValueSetters["setIsDeckOrderFixedInputValue"];
  specialTrainingLevelInputValue: SettingInputValues["specialTrainingLevelInputValue"];
};

const CardManagerRaw: React.FC<Props> = (props) => {
  const [selectedCardId, setSelectedCardId] = useState<CardDataId | null>(
    cards[0].id as CardDataId,
  );
  const [isProducePlanMatched, setIsProducePlanMatched] = useState(true);
  const [doesExcludeIdolSpecific, setDoesExcludeIdolSpecific] = useState(true);
  const [query, setQuery] = useState("");
  const filteredCards = useMemo(() => {
    return query === ""
      ? []
      : cards.filter((card) => {
          const idolData = getIdolDataByConstId(props.idolDataIdInputValue);
          const isProducePlanMatchedCondition =
            !isProducePlanMatched ||
            card.cardPossessionKind === "free" ||
            card.cardPossessionKind === idolData.producePlan.kind;
          const doesExcludeIdolSpecificCondition =
            !doesExcludeIdolSpecific || card.cardProviderKind !== "idol";
          return (
            isProducePlanMatchedCondition &&
            doesExcludeIdolSpecificCondition &&
            (card.id.toLowerCase().includes(query.toLowerCase()) ||
              card.name.toLowerCase().includes(query.toLowerCase()))
          );
        });
  }, [
    doesExcludeIdolSpecific,
    isProducePlanMatched,
    query,
    props.idolDataIdInputValue,
  ]);
  const [shownCardDescription, setShownCardDescription] = useState<
    { data: CardData; enhanced: boolean } | undefined
  >(undefined);
  const cardDescriptionDialogProps = useMemo<
    React.ComponentProps<typeof CardDescriptionDialog> | undefined
  >(() => {
    return shownCardDescription
      ? {
          ...shownCardDescription,
          onClickBackdrop: () => {
            setShownCardDescription(undefined);
          },
        }
      : undefined;
  }, [shownCardDescription]);
  const handleClickIdolSpecificCardAdditionButton = useCallback(() => {
    props.setCardsInputValue((cardsState) => {
      const idolData = getIdolDataByConstId(props.idolDataIdInputValue);
      const newCard = {
        id: idolData.specificCardId as CardDataId,
        enhanced: canCardBeEnhancedWithSpecialTrainingLevel(
          props.specialTrainingLevelInputValue,
        ),
      };
      return [newCard, ...cardsState];
    });
  }, [props.idolDataIdInputValue, props.specialTrainingLevelInputValue]);
  const handleClickDefaultCardSetAdditionButton = useCallback(() => {
    props.setCardsInputValue((cardsState) => {
      const idolData = getIdolDataByConstId(props.idolDataIdInputValue);
      const defaultCardSetData = getDefaultCardSetData(idolData.producePlan);
      const newCards = defaultCardSetData.cardDataIds.map((cardDataId) => ({
        id: cardDataId as CardDataId,
        enhanced: false,
      }));
      return [...cardsState, ...newCards];
    });
  }, []);
  const handleClickClearingCardsButton = useCallback(() => {
    props.setCardsInputValue([]);
  }, []);
  const handleOnClickIsDeckOrderFixedButton = useCallback(() => {
    props.setIsDeckOrderFixedInputValue(
      (isDeckOrderFixedState) => !isDeckOrderFixedState,
    );
  }, []);
  const handleChangeCombobox = useCallback((value: CardDataId | null) => {
    setSelectedCardId(value);
    if (value !== null) {
      props.setCardsInputValue((cardsState) => {
        return [
          ...cardsState,
          {
            id: value,
            enhanced: false,
          },
        ];
      });
    }
  }, []);
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      const activeCardListItemIndex = parseDndId(active.id as any);
      const overCardListItemIndex = parseDndId(over.id as any);
      props.setCardsInputValue((cardsState) => {
        const newCards = cardsState.slice();
        const [removedCard] = newCards.splice(activeCardListItemIndex, 1);
        newCards.splice(overCardListItemIndex, 0, removedCard);
        return newCards;
      });
    }
  }, []);
  const handleClickCardName = useCallback(
    (index: number) => {
      const cardInputValue = props.cardsInputValue[index];
      const cardData = getCardDataById(cardInputValue.id);
      setShownCardDescription({
        data: cardData,
        enhanced: cardInputValue.enhanced ?? false,
      });
    },
    [props.cardsInputValue],
  );
  const handeClickCardEnhanceButton = useCallback((index: number) => {
    props.setCardsInputValue((cardsState) => {
      return cardsState.map((card, i) => {
        if (i === index) {
          return {
            ...card,
            enhanced: !card.enhanced,
          };
        }
        return card;
      });
    });
  }, []);
  const handeClickCardCopyButton = useCallback((index: number) => {
    props.setCardsInputValue((cardsState) => {
      const newCard = {
        ...cardsState[index],
      };
      const newCards = cardsState.slice();
      newCards.splice(index, 0, newCard);
      return newCards;
    });
  }, []);
  const handeClickCardRemovalButton = useCallback((index: number) => {
    props.setCardsInputValue((cardsState) => {
      return cardsState.filter((_, i) => i !== index);
    });
  }, []);
  return (
    <>
      <div className="mt-1 flex flex-col gap-1">
        <ul className="flex items-center gap-1 text-sm">
          <li>
            <Button
              className="border"
              onClick={handleClickIdolSpecificCardAdditionButton}
            >
              固有追加
            </Button>
          </li>
          <li>
            <Button
              className="border"
              onClick={handleClickDefaultCardSetAdditionButton}
            >
              初期セット追加
            </Button>
          </li>
          <li onClick={handleClickClearingCardsButton}>
            <Button className="border">クリア</Button>
          </li>
        </ul>
        <ul className="flex items-center gap-0.5">
          <li className="flex-1">
            <Combobox
              value={selectedCardId}
              onChange={handleChangeCombobox}
              onClose={() => setQuery("")}
            >
              <ComboboxInput
                aria-label="Assignee"
                autoComplete="off"
                className="w-full text-sm border"
                placeholder="名前か読みをローマ字で検索"
                displayValue={() => ""}
                onChange={(event) => setQuery(event.target.value)}
              />
              <ComboboxOptions
                anchor="bottom"
                className="border empty:invisible bg-white"
              >
                {filteredCards.map((card) => (
                  <ComboboxOption
                    key={card.id}
                    value={card.id}
                    className="text-sm data-[focus]:bg-blue-100"
                  >
                    {card.name}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Combobox>
          </li>
          <li>
            <input
              type="checkbox"
              checked={isProducePlanMatched}
              id="cardManagerIsSameProducePlan"
              onChange={() => {
                setIsProducePlanMatched(!isProducePlanMatched);
              }}
            />
            <label
              className="text-xs select-none"
              htmlFor="cardManagerIsSameProducePlan"
            >
              プラン一致
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              checked={doesExcludeIdolSpecific}
              id="cardManagerDoesExcludeIdolSpecific"
              onChange={() => {
                setDoesExcludeIdolSpecific(!doesExcludeIdolSpecific);
              }}
            />
            <label
              className="text-xs select-none"
              htmlFor="cardManagerDoesExcludeIdolSpecific"
            >
              固有除外
            </label>
          </li>
        </ul>
        <ul className="flex flex-col gap-0.5 text-xs">
          <li>
            <input
              type="checkbox"
              checked={props.isDeckOrderFixedInputValue}
              id="cardManagerIsDeckOrderFixed"
              onChange={() => {
                handleOnClickIsDeckOrderFixedButton();
              }}
            />
            <label
              className="select-none"
              htmlFor="cardManagerIsDeckOrderFixed"
            >
              並び順にスキルカードを引く
            </label>
          </li>
          <li className="text-slate-500">
            並び替えは番号部分をドラッグ＆ドロップ
          </li>
        </ul>
        <DndContext onDragEnd={handleDragEnd}>
          <ul>
            {props.cardsInputValue.map((cardInputValue, index) => {
              const card = getCardDataById(cardInputValue.id);
              // TODO: card生成もname生成もcore側のメソッドを使う、コア側のメソッドを調整してから
              const name = card.name + (cardInputValue.enhanced ? "+" : "");
              return (
                <CardListItem
                  key={index}
                  cardName={name}
                  listItemIndex={index}
                  onClickCardCopyButton={handeClickCardCopyButton}
                  onClickCardEnhanceButton={handeClickCardEnhanceButton}
                  onClickCardName={handleClickCardName}
                  onClickCardRemovalButton={handeClickCardRemovalButton}
                />
              );
            })}
          </ul>
        </DndContext>
      </div>
      {cardDescriptionDialogProps && (
        <CardDescriptionDialog {...cardDescriptionDialogProps} />
      )}
    </>
  );
};

export const CardManager = React.memo(CardManagerRaw);
