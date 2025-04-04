import { runSaga } from "redux-saga";
import { setEvents } from "../../store/eventsSlice";
import { fetchEventsSaga } from "../../store/eventsSaga";
import { transformRawEvents } from "../../utils/transformRawEvents";

jest.mock("../../utils/transformRawEvents", () => ({
  transformRawEvents: jest.fn(),
}));

describe("fetchEventsSaga", () => {
  it("должен корректно загружать и диспатчить события", async () => {
    const mockTransformedEvents = [
      { id: 1, timestamp: 10, duration: 5, x: 0, y: 0, width: 50, height: 60 },
    ];
    (transformRawEvents as jest.Mock).mockReturnValue(mockTransformedEvents);

    const dispatched: any[] = [];
    const fakeStore = {
      dispatch: (action: any) => dispatched.push(action),
    };

    await runSaga(fakeStore, fetchEventsSaga).toPromise();

    expect(dispatched).toContainEqual(setEvents(mockTransformedEvents));
  });

  it("должен обрабатывать ошибки", async () => {
    (transformRawEvents as jest.Mock).mockImplementation(() => {
      throw new Error("Ошибка при трансформации данных");
    });

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    await runSaga({ dispatch: jest.fn() }, fetchEventsSaga).toPromise();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Ошибка при загрузке событий:",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
