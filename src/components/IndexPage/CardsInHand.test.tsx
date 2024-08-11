import { calculateCardInHandLeft } from "./CardsInHand";

describe("calculateCardInHandLeft", () => {
  const testCases: Array<{
    args: Parameters<typeof calculateCardInHandLeft>;
    expected: ReturnType<typeof calculateCardInHandLeft>;
    name: string;
  }> = [
    {
      args: [360, 100, 20, 1, 0],
      expected: (360 - 100) / 2,
      name: "コンテナ内に収まる、1枚のカード",
    },
    {
      args: [360, 100, 20, 3, 0],
      expected: (360 - 100 * 3 - 20 * 2) / 2,
      name: "コンテナ内に収まる、3枚のカードの1枚目",
    },
    {
      args: [360, 100, 20, 3, 2],
      expected: (360 - 100 * 3 - 20 * 2) / 2 + (100 + 20) * 2,
      name: "コンテナ内に収まる、3枚のカードの3枚目",
    },
    {
      args: [360, 100, 20, 4, 0],
      expected: 0,
      name: "コンテナ内に収まらない、4枚のカードの1枚目",
    },
    {
      args: [360, 100, 20, 4, 3],
      expected: 360 - 100,
      name: "コンテナ内に収まらない、4枚のカードの4枚目",
    },
    {
      args: [360, 100, 20, 5, 0],
      expected: 0,
      name: "コンテナ内に収まらない、5枚のカードの1枚目",
    },
    {
      args: [360, 100, 20, 5, 4],
      expected: 360 - 100,
      name: "コンテナ内に収まらない、5枚のカードの5枚目",
    },
  ];
  test.each(testCases)("$name", ({ args, expected }) => {
    expect(calculateCardInHandLeft(...args)).toBe(expected);
  });
});
