import { transformRawEvents } from "../../utils/transformRawEvents";
import { RawEvent } from "../../types/types";

describe("transformRawEvents", () => {
  it("должна возвращать массив с преобразованными событиями", () => {
    const rawEvents: RawEvent[] = [
      {
        timestamp: 10,
        duration: 5,
        zone: {
          left: 100,
          top: 200,
          width: 50,
          height: 80,
        },
      },
      {
        timestamp: 20,
        duration: 10,
        zone: {
          left: 300,
          top: 400,
          width: 60,
          height: 90,
        },
      },
    ];

    const result = transformRawEvents(rawEvents);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 1,
      timestamp: 10,
      duration: 5,
      x: 100,
      y: 200,
      width: 50,
      height: 80,
    });

    expect(result[1].id).toBe(2);
    expect(result[1].x).toBe(300);
  });

  it("должна возвращать пустой массив, если входные данные не массив", () => {
    expect(transformRawEvents(null as any)).toEqual([]);
    expect(transformRawEvents(undefined as any)).toEqual([]);
    expect(transformRawEvents({} as any)).toEqual([]);
    expect(transformRawEvents("invalid" as any)).toEqual([]);
  });

  it("должна возвращать значения по умолчанию, если zone отсутствует", () => {
    const rawEvents: RawEvent[] = [
      {
        timestamp: 15,
        duration: 3,
        zone: { left: 0, top: 0, width: 0, height: 0 },
      },
    ];

    const result = transformRawEvents(rawEvents);

    expect(result[0]).toEqual({
      id: 1,
      timestamp: 15,
      duration: 3,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
  });

  it("должна возвращать значения по умолчанию, если zone отсутствует (undefined)", () => {
    const rawEvents: RawEvent[] = [
      {
        timestamp: 15,
        duration: 3,
        zone: undefined,
      },
    ];

    const result = transformRawEvents(rawEvents);

    expect(result[0]).toEqual({
      id: 1,
      timestamp: 15,
      duration: 3,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
  });

  it("должна возвращать пустой массив, если rawEvents — это пустой массив", () => {
    expect(transformRawEvents([])).toEqual([]);
  });

  it("должна возвращать значения по умолчанию, если zone содержит некорректные данные", () => {
    const rawEvents: RawEvent[] = [
      {
        timestamp: 15,
        duration: 3,
        zone: { left: null, top: null, width: null, height: undefined },
      },
    ];

    const result = transformRawEvents(rawEvents);

    expect(result[0]).toEqual({
      id: 1,
      timestamp: 15,
      duration: 3,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
  });
});
