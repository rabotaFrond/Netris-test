import { runSaga } from "redux-saga";
import { fetchEventsSaga } from "../../store/Saga";
import {
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
} from "../../store/eventsTypes";

globalThis.fetch = jest.fn();

describe("fetchEventsSaga", () => {
  it("должен корректно загружать и диспатчить события", async () => {
    const mockEvents = [
      { id: 1, timestamp: 10, duration: 5, x: 0, y: 0, width: 50, height: 60 },
    ];
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockEvents),
    };
    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    const dispatched: any[] = [];
    const fakeStore = {
      dispatch: (action: any) => dispatched.push(action),
    };

    await runSaga(fakeStore, fetchEventsSaga).toPromise();

    expect(dispatched).toContainEqual({
      type: FETCH_EVENTS_SUCCESS,
      payload: mockEvents,
    });
  });

  it("должен обрабатывать ошибки", async () => {
    const mockError = new Error("Ошибка загрузки данных");
    (fetch as jest.Mock).mockRejectedValue(mockError);

    const dispatched: any[] = [];
    const fakeStore = {
      dispatch: (action: any) => dispatched.push(action),
    };

    await runSaga(fakeStore, fetchEventsSaga).toPromise();

    expect(dispatched).toContainEqual({
      type: FETCH_EVENTS_ERROR,
      error: "Ошибка загрузки данных",
    });
  });

  it("должен обрабатывать неудачные ответы от сервера", async () => {
    const mockResponse = { ok: false };
    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    const dispatched: any[] = [];
    const fakeStore = {
      dispatch: (action: any) => dispatched.push(action),
    };

    await runSaga(fakeStore, fetchEventsSaga).toPromise();

    expect(dispatched).toContainEqual({
      type: FETCH_EVENTS_ERROR,
      error: "Ошибка загрузки данных",
    });
  });
});
