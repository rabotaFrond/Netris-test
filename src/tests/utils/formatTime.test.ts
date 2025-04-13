import { formatTime } from "../../utils/formatTime";

describe("formatTime", () => {
  it("форматирует время в MM:SS:SSS", () => {
    expect(formatTime(3012)).toBe("00:03:012");
    expect(formatTime(65123)).toBe("01:05:123");
    expect(formatTime(206100)).toBe("03:26:100");
  });
});
