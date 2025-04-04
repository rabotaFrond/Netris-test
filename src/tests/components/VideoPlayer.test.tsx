// src/tests/components/VideoPlayer.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { fetchEventsRequest } from "../../store/eventsSlice";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => [
    { timestamp: 10, duration: 5 },
    { timestamp: 20, duration: 5 },
  ],
}));

jest.mock("../../components/hooks/useCanvas", () => () => {});

describe("VideoPlayer", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("рендерит видео и список событий", () => {
    render(<VideoPlayer />);

    const video = screen.getByTestId("video-element");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute(
      "src",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    );

    expect(screen.getByText(/События:/i)).toBeInTheDocument();
    expect(screen.getByText("⏱ 00:10:000")).toBeInTheDocument();
    expect(screen.getByText("⏱ 00:20:000")).toBeInTheDocument();
  });

  it("диспатчит fetchEventsRequest при монтировании", () => {
    render(<VideoPlayer />);
    expect(mockDispatch).toHaveBeenCalledWith(fetchEventsRequest());
  });

  it("устанавливает текущее событие по клику", () => {
    render(<VideoPlayer />);

    const video = screen.getByTestId("video-element");

    let mockedTime = 0;
    Object.defineProperty(video, "currentTime", {
      get: () => mockedTime,
      set: (val) => {
        mockedTime = val;
      },
    });

    const eventItem = screen.getByText("⏱ 00:10:000");
    fireEvent.click(eventItem);

    expect(mockedTime).toBe(10);
  });

  it("обновляет текущее время при обновлении видео", () => {
    render(<VideoPlayer />);
    const video = screen.getByTestId("video-element");

    Object.defineProperty(video, "currentTime", {
      get: () => 12,
    });

    fireEvent.timeUpdate(video);

    const activeEvent = screen.getByText("⏱ 00:10:000");
    expect(activeEvent).toHaveClass("event-item-active");
  });
});
