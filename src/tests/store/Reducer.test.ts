import eventsReducer from "../../store/Reducer";
import {
  SET_EVENTS,
  SET_CURRENT_TIME,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
} from "../../store/eventsTypes";
import { Event } from "../../types/types";
import {
  FetchEventsErrorAction,
  FetchEventsRequestAction,
  FetchEventsSuccessAction,
  SetEventsAction,
  SetCurrentTimeAction,
} from "../../store/eventsTypes";

describe("eventsReducer", () => {
  const initialState = {
    events: [],
    loading: false,
    error: null,
    currentTime: 0,
  };

  it("должен вернуть начальное состояние", () => {
    const result = eventsReducer(undefined, { type: "UNKNOWN_ACTION" } as any);
    expect(result).toEqual(initialState);
  });

  it("должен обрабатывать FETCH_EVENTS_REQUEST", () => {
    const action: FetchEventsRequestAction = { type: FETCH_EVENTS_REQUEST };
    const expectedState = { ...initialState, loading: true, error: null };
    const result = eventsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it("должен обрабатывать FETCH_EVENTS_SUCCESS", () => {
    const mockEvents: Event[] = [
      {
        timestamp: 6.160356073346696,
        duration: 0.8361136523432808,
        zone: {
          left: 113.299598661696,
          top: 195.3639952425215,
          width: 126.18979937751924,
          height: 46.23090211142281,
        },
      },
    ];
    const action: FetchEventsSuccessAction = {
      type: FETCH_EVENTS_SUCCESS,
      payload: mockEvents,
    };
    const expectedState = {
      ...initialState,
      loading: false,
      events: mockEvents,
    };
    const result = eventsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it("должен обрабатывать FETCH_EVENTS_ERROR", () => {
    const action: FetchEventsErrorAction = {
      type: FETCH_EVENTS_ERROR,
      error: "Ошибка загрузки",
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: "Ошибка загрузки",
    };
    const result = eventsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it("должен обрабатывать SET_EVENTS", () => {
    const mockEvents: Event[] = [
      {
        timestamp: 6.160356073346696,
        duration: 0.8361136523432808,
        zone: {
          left: 113.299598661696,
          top: 195.3639952425215,
          width: 126.18979937751924,
          height: 46.23090211142281,
        },
      },
    ];
    const action: SetEventsAction = { type: SET_EVENTS, payload: mockEvents };
    const expectedState = { ...initialState, events: mockEvents };
    const result = eventsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it("должен обрабатывать SET_CURRENT_TIME", () => {
    const mockTime = 12;
    const action: SetCurrentTimeAction = {
      type: SET_CURRENT_TIME,
      payload: mockTime,
    };
    const expectedState = { ...initialState, currentTime: mockTime };
    const result = eventsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
});
