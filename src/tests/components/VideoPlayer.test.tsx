// VideoPlayer.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import rootReducer from "../../store/Reducer";
import { fetchEventsRequest, setCurrentTime } from "../../store/Actions";
import { Event } from "../../types/types";
import { rootSaga } from "../../store/Saga";

class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

global.ResizeObserver = ResizeObserverMock;

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          timestamp: 5,
          duration: 2,
          zone: { left: 100, top: 100, width: 200, height: 200 },
        },
      ]),
  } as Response)
);

jest.mock("../../store/Actions", () => ({
  fetchEventsRequest: jest.fn(() => ({ type: "FETCH_EVENTS_REQUEST" })),
  setCurrentTime: jest.fn((time) => ({
    type: "SET_CURRENT_TIME",
    payload: time,
  })),
}));

jest.mock(
  "../../components/EventList",
  () =>
    ({ events, currentTime, onEventClick }: any) =>
      (
        <div data-testid="event-list">
          {events.map((event: Event) => (
            <div
              key={event.timestamp}
              data-testid={`event-${event.timestamp}`}
              onClick={() => onEventClick(event.timestamp)}
            >
              {event.timestamp.toFixed(3)}
            </div>
          ))}
        </div>
      )
);

describe("VideoPlayer Component", () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    const sagaMiddleware = createSagaMiddleware();
    store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    (fetchEventsRequest as jest.Mock).mockClear();
    (setCurrentTime as jest.Mock).mockClear();
    (global.fetch as jest.Mock).mockClear();
    store.dispatch = jest.fn();
  });

  test("renders video player with initial state", () => {
    render(
      <Provider store={store}>
        <VideoPlayer />
      </Provider>
    );

    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("video-element")).toBeInTheDocument();
    expect(screen.getByTestId("event-list")).toBeInTheDocument();
    expect(
      screen.getByText("Твой браузер не поддерживает видео.")
    ).toBeInTheDocument();
  });

  test("dispatches fetchEventsRequest on mount", () => {
    render(
      <Provider store={store}>
        <VideoPlayer />
      </Provider>
    );

    expect(fetchEventsRequest).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "FETCH_EVENTS_REQUEST",
    });
  });

  test("updates current time on video playback", async () => {
    render(
      <Provider store={store}>
        <VideoPlayer />
      </Provider>
    );

    const video = screen.getByTestId("video-element") as HTMLVideoElement;
    Object.defineProperty(video, "currentTime", {
      writable: true,
      value: 5.123,
    });

    fireEvent(
      video,
      new window.Event("timeupdate", { bubbles: true, cancelable: true })
    );

    await waitFor(() => {
      expect(setCurrentTime).toHaveBeenCalledWith(5.123);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "SET_CURRENT_TIME",
        payload: 5.123,
      });
    });
  });

  test("renders active event rectangles when time matches", async () => {
    const initialState = {
      events: [
        {
          timestamp: 5,
          duration: 2,
          zone: { left: 100, top: 100, width: 200, height: 200 },
        },
      ],
      loading: false,
      error: null,
      currentTime: 0,
    };
    const sagaMiddleware = createSagaMiddleware();
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(rootSaga);
    store.dispatch = jest.fn();

    const { container } = render(
      <Provider store={store}>
        <VideoPlayer />
      </Provider>
    );

    const video = screen.getByTestId("video-element") as HTMLVideoElement;
    Object.defineProperty(video, "currentTime", {
      writable: true,
      value: 5.5,
    });

    fireEvent(
      video,
      new window.Event("timeupdate", { bubbles: true, cancelable: true })
    );

    await waitFor(() => {
      const rectangles = container.querySelectorAll(
        'div[style*="border: 2px solid rgb(30, 255, 0)"]'
      );
      expect(rectangles.length).toBe(1);
      const rectangle = rectangles[0];
      expect(rectangle).toHaveStyle("position: absolute");
    });
  });

  test("handles event click and updates video time", async () => {
    const initialState = {
      events: [
        {
          timestamp: 5,
          duration: 2,
          zone: { left: 100, top: 100, width: 200, height: 200 },
        },
      ],
      loading: false,
      error: null,
      currentTime: 0,
    };
    const sagaMiddleware = createSagaMiddleware();
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(rootSaga);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <VideoPlayer />
      </Provider>
    );

    const video = screen.getByTestId("video-element") as HTMLVideoElement;
    Object.defineProperty(video, "currentTime", {
      writable: true,
      value: 0,
    });

    const eventItem = screen.getByTestId("event-5");
    fireEvent.click(eventItem);

    await waitFor(() => {
      expect(video.currentTime).toBe(5);
      expect(setCurrentTime).toHaveBeenCalledWith(5);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "SET_CURRENT_TIME",
        payload: 5,
      });
    });
  });

  test("handles video metadata load", () => {
    render(
      <Provider store={store}>
        <VideoPlayer />
      </Provider>
    );

    const video = screen.getByTestId("video-element") as HTMLVideoElement;
    Object.defineProperty(video, "videoWidth", { writable: true, value: 1920 });
    Object.defineProperty(video, "videoHeight", {
      writable: true,
      value: 1080,
    });

    fireEvent(
      video,
      new window.Event("loadedmetadata", { bubbles: true, cancelable: true })
    );

    expect(video.videoWidth).toBe(1920);
    expect(video.videoHeight).toBe(1080);
  });
});
