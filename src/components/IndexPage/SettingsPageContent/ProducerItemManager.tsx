import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import {
  ProducerItemDataId,
  getProducerItemDataById,
  getIdolDataByConstId,
  producerItems,
  ProducerItemData,
} from "gakumas-core";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "../Button";
import {
  SettingInputValues,
  SettingInputValueSetters,
  canProducerItemBeEnhancedWithTalentAwakeningLevel,
} from "../utils";
import { ProducerItemDescriptionDialog } from "./ProducerItemDescriptionDialog";

type Props = {
  producerItemsInputValue: SettingInputValues["producerItemsInputValue"];
  idolDataIdInputValue: SettingInputValues["idolDataIdInputValue"];
  setProducerItemsInputValue: SettingInputValueSetters["setProducerItemsInputValue"];
  talentAwakeningLevelInputValue: SettingInputValues["talentAwakeningLevelInputValue"];
};

const ProducerItemManagerRaw: React.FC<Props> = (props) => {
  const [selectedProducerItemId, setSelectedProducerItemId] =
    useState<ProducerItemDataId | null>(
      producerItems[0].id as ProducerItemDataId,
    );
  const [isProducePlanMatched, setIsProducePlanMatched] = useState(true);
  const [doesExcludeIdolSpecific, setDoesExcludeIdolSpecific] = useState(true);
  const [query, setQuery] = useState("");
  const filteredProducerItems = useMemo(() => {
    return query === ""
      ? []
      : producerItems.filter((producerItem) => {
          const idolData = getIdolDataByConstId(props.idolDataIdInputValue);
          const isProducePlanMatchedCondition =
            !isProducePlanMatched ||
            producerItem.producerItemPossessionKind === "free" ||
            producerItem.producerItemPossessionKind ===
              idolData.producePlan.kind;
          const doesExcludeIdolSpecificCondition =
            !doesExcludeIdolSpecific ||
            producerItem.producerItemProviderKind !== "idol";
          const normalizedQuery = query.toLowerCase();
          const searchedTexts = [
            producerItem.id,
            producerItem.name,
            ...(producerItem.keywords ?? []),
          ].map((text) => text.toLowerCase());
          return (
            isProducePlanMatchedCondition &&
            doesExcludeIdolSpecificCondition &&
            searchedTexts.some((text) => text.includes(normalizedQuery))
          );
        });
  }, [
    doesExcludeIdolSpecific,
    isProducePlanMatched,
    query,
    props.idolDataIdInputValue,
  ]);
  const [shownProducerItemDescription, setShownProducerItemDescription] =
    useState<{ data: ProducerItemData; enhanced: boolean } | undefined>(
      undefined,
    );
  const producerItemDescriptionDialogProps = useMemo<
    React.ComponentProps<typeof ProducerItemDescriptionDialog> | undefined
  >(() => {
    return shownProducerItemDescription
      ? {
          ...shownProducerItemDescription,
          onClickBackdrop: () => {
            setShownProducerItemDescription(undefined);
          },
        }
      : undefined;
  }, [shownProducerItemDescription]);
  const handleClickIdolSpecificProducerItemAdditionButton = useCallback(() => {
    props.setProducerItemsInputValue((producerItemsState) => {
      const idolData = getIdolDataByConstId(props.idolDataIdInputValue);
      const newProducerItem = {
        id: idolData.specificProducerItemId as ProducerItemDataId,
        enhanced: canProducerItemBeEnhancedWithTalentAwakeningLevel(
          props.talentAwakeningLevelInputValue,
        ),
      };
      return [newProducerItem, ...producerItemsState];
    });
  }, [props.idolDataIdInputValue, props.talentAwakeningLevelInputValue]);
  const handleClickClearingProducerItemsButton = useCallback(() => {
    props.setProducerItemsInputValue([]);
  }, []);
  const handleChangeCombobox = useCallback(
    (value: ProducerItemDataId | null) => {
      setSelectedProducerItemId(value);
      if (value !== null) {
        props.setProducerItemsInputValue((producerItemsState) => {
          return [
            ...producerItemsState,
            {
              id: value,
              enhanced: false,
            },
          ];
        });
      }
    },
    [],
  );
  const handleClickProducerItemName = useCallback(
    (index: number) => {
      const producerItemInputValue = props.producerItemsInputValue[index];
      const producerItemData = getProducerItemDataById(
        producerItemInputValue.id,
      );
      setShownProducerItemDescription({
        data: producerItemData,
        enhanced: producerItemInputValue.enhanced ?? false,
      });
    },
    [props.producerItemsInputValue],
  );
  const handeClickProducerItemEnhanceButton = useCallback((index: number) => {
    props.setProducerItemsInputValue((producerItemsState) => {
      return producerItemsState.map((producerItem, i) => {
        const producerItemData = getProducerItemDataById(producerItem.id);
        if (i === index && producerItemData.enhanced) {
          return {
            ...producerItem,
            enhanced: !producerItem.enhanced,
          };
        }
        return producerItem;
      });
    });
  }, []);
  const handeClickProducerItemRemovalButton = useCallback((index: number) => {
    props.setProducerItemsInputValue((producerItemsState) => {
      return producerItemsState.filter((_, i) => i !== index);
    });
  }, []);
  return (
    <>
      <div className="flex flex-col gap-1">
        <ul className="mt-1 flex items-center gap-1 text-sm">
          <li>
            <Button onClick={handleClickIdolSpecificProducerItemAdditionButton}>
              固有追加
            </Button>
          </li>
          <li>
            <Button onClick={handleClickClearingProducerItemsButton}>
              クリア
            </Button>
          </li>
        </ul>
        <ul className="flex items-center gap-0.5">
          <li className="flex-1">
            <Combobox
              value={selectedProducerItemId}
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
                {filteredProducerItems.map((producerItem) => (
                  <ComboboxOption
                    key={producerItem.id}
                    value={producerItem.id}
                    className="text-sm data-[focus]:bg-blue-100"
                  >
                    {producerItem.name}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Combobox>
          </li>
          <li>
            <input
              type="checkbox"
              checked={isProducePlanMatched}
              id="producerItemManagerIsProducePlanMatched"
              onChange={() => {
                setIsProducePlanMatched((s) => !s);
              }}
            />
            <label
              className="text-xs select-none"
              htmlFor="producerItemManagerIsProducePlanMatched"
            >
              プラン一致
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              checked={doesExcludeIdolSpecific}
              id="producerItemManagerDoesExcludeIdolSpecific"
              onChange={() => {
                setDoesExcludeIdolSpecific((s) => !s);
              }}
            />
            <label
              className="text-xs select-none"
              htmlFor="producerItemManagerDoesExcludeIdolSpecific"
            >
              固有除外
            </label>
          </li>
        </ul>
        <ul>
          {props.producerItemsInputValue.map(
            (producerItemInputValue, index) => {
              const producerItemData = getProducerItemDataById(
                producerItemInputValue.id,
              );
              // TODO: producerItem生成もname生成もcore側のメソッドを使う、コア側のメソッドを調整してから
              const name =
                producerItemData.name +
                (producerItemInputValue.enhanced ? "+" : "");
              const canBeEnhanced = producerItemData.enhanced;
              return (
                <li key={index} className="flex items-center border text-xs">
                  <div className="w-1/12">{index + 1}</div>
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => {
                      handleClickProducerItemName(index);
                    }}
                  >
                    {name}
                  </div>
                  <div className="w-4/12 flex gap-0.5">
                    <Button
                      additionalClassName={
                        canBeEnhanced ? "" : "text-slate-300"
                      }
                      disabled={!canBeEnhanced}
                      onClick={() => {
                        handeClickProducerItemEnhanceButton(index);
                      }}
                    >
                      強化
                    </Button>
                    <Button
                      onClick={() => {
                        handeClickProducerItemRemovalButton(index);
                      }}
                    >
                      削除
                    </Button>
                  </div>
                </li>
              );
            },
          )}
        </ul>
      </div>
      {producerItemDescriptionDialogProps && (
        <ProducerItemDescriptionDialog
          {...producerItemDescriptionDialogProps}
        />
      )}
    </>
  );
};

export const ProducerItemManager = React.memo(ProducerItemManagerRaw);
