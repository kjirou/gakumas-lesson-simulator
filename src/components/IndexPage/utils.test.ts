import {
  defaultSavedData,
  forceInterpretObjectAsSavedData,
  SavedData,
  tailorTargetToSelf,
} from "./utils";

describe("tailorTargetToSelf", () => {
  const testCases: Array<{
    args: Parameters<typeof tailorTargetToSelf>;
    expected: ReturnType<typeof tailorTargetToSelf>;
    name: string;
  }> = [
    {
      name: "同じキーを持つ時、値の内容が異なっても target の値を返す",
      args: [
        { a: 1, b: "a", c: true, d: null, e: undefined },
        { a: "a", b: true, c: null, d: undefined, e: 1 },
      ],
      expected: { a: "a", b: true, c: null, d: undefined, e: 1 },
    },
    {
      name: "self にのみ存在するキーがある時、self の値をコピーする",
      args: [{ a: 1, b: 2 }, {}],
      expected: { a: 1, b: 2 },
    },
    {
      name: "self にないキーは削除する",
      args: [{ b: 2 }, { a: 1, b: 2, c: 3 }],
      expected: { b: 2 },
    },
    {
      name: "オブジェクトを含む場合、再帰的に処理する",
      args: [{ a: { x: 1, y: { foo: 2, bar: 3 } } }, {}],
      expected: { a: { x: 1, y: { foo: 2, bar: 3 } } },
    },
    {
      name: "配列は再帰的に処理しない",
      args: [{ a: [1] }, { a: [2] }],
      expected: { a: [2] },
    },
    {
      name: "defaultSavedData をコピーできる",
      args: [defaultSavedData, {}],
      expected: defaultSavedData,
    },
  ];
  test.each(testCases)("$name", ({ args, expected }) => {
    expect(tailorTargetToSelf(...args)).toStrictEqual(expected);
  });
});
describe("forceInterpretObjectAsSavedData", () => {
  const testCases: Array<{
    args: Parameters<typeof forceInterpretObjectAsSavedData>;
    expected: ReturnType<typeof forceInterpretObjectAsSavedData>;
    name: string;
  }> = [
    {
      name: "空オブジェクトの時、defaultSavedData を返す",
      args: [{}],
      expected: defaultSavedData,
    },
    {
      name: "アイドルIDが不正な時、初期値へ置換する",
      args: [{ settingInputValues: { idolDataIdInputValue: "invalid" } }],
      expected: {
        settingInputValues: {
          idolDataIdInputValue:
            defaultSavedData.settingInputValues.idolDataIdInputValue,
        },
      } as SavedData,
    },
    {
      name: "アイドルIDが正しい時、置換しない",
      args: [
        {
          settingInputValues: { idolDataIdInputValue: "tsukimuratemari-ssr-1" },
        },
      ],
      expected: {
        settingInputValues: {
          idolDataIdInputValue: "tsukimuratemari-ssr-1",
        },
      } as SavedData,
    },
    {
      name: "誤ったスキルカードIDがある時、その要素を除外する",
      args: [
        {
          settingInputValues: {
            cardsInputValue: [
              { id: "a", enhanced: false },
              { id: "apirunokihon", enhanced: false },
              { id: "b", enhanced: false },
              { id: "pozunokihon", enhanced: false },
              { id: "c", enhanced: false },
            ],
          },
        },
      ],
      expected: {
        settingInputValues: {
          cardsInputValue: [
            { id: "apirunokihon", enhanced: false },
            { id: "pozunokihon", enhanced: false },
          ],
        },
      } as SavedData,
    },
    {
      name: "誤ったPアイテムIDがある時、その要素を除外する",
      args: [
        {
          settingInputValues: {
            producerItemsInputValue: [
              { id: "a", enhanced: false },
              { id: "bakuonraion", enhanced: false },
              { id: "b", enhanced: false },
              { id: "hikkeisutenresubotoru", enhanced: false },
              { id: "c", enhanced: false },
            ],
          },
        },
      ],
      expected: {
        settingInputValues: {
          producerItemsInputValue: [
            { id: "bakuonraion", enhanced: false },
            { id: "hikkeisutenresubotoru", enhanced: false },
          ],
        },
      } as SavedData,
    },
  ];
  test.each(testCases)("$name", ({ args, expected }) => {
    expect(forceInterpretObjectAsSavedData(...args)).toMatchObject(expected);
  });
});
