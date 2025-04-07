// src/tests/components/VideoPlayer.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { fetchEventsRequest, setCurrentTime } from "../../store/Actions";
import { selectCurrentTime, selectEvents } from "../../store/Reducer";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => {
    if (selector === selectEvents) {
      return [
        { timestamp: 10, duration: 5 },
        { timestamp: 20, duration: 5 },
      ];
    }
    if (selector === selectCurrentTime) {
      return 0; // default current time
    }
    return null;
  },
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

  it("устанавливает текущее время по клику на событие", () => {
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

    expect(mockedTime).toBe(10); // Проверяем, что время установлено корректно
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentTime(10)); // Проверяем, что dispatch вызвал setCurrentTime
  });
});
