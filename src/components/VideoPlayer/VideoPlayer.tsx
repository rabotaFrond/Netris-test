import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsRequest, setCurrentTime } from "../../store/Actions";
import { selectEvents, selectCurrentTime } from "../../store/Reducer";
import { AppDispatch } from "../../store/store";
import { Event } from "../../types/types";
import EventList from "../EventList";
import "./VideoPlayer.css";

interface Size {
  width: number;
  height: number;
}

const VIDEO_SOURCE =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const VideoPlayer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  const events = useSelector(selectEvents);
  const currentTime = useSelector(selectCurrentTime);

  const [activeRectangles, setActiveRectangles] = useState<Event[]>([]);
  const [originalVideoSize, setOriginalVideoSize] = useState<Size>({
    width: 1,
    height: 1,
  });
  const [containerSize, setContainerSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  // Инициализация данных
  useEffect(() => {
    dispatch(fetchEventsRequest());
  }, [dispatch]);

  // Настройка ResizeObserver
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    const wrapper = videoWrapperRef.current;
    if (wrapper) observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  // Обработчики видео
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const time = Number(video.currentTime.toFixed(3));
    dispatch(setCurrentTime(time));

    const activeEvents = events.filter(
      (event) =>
        time >= Number(event.timestamp.toFixed(3)) &&
        time <= event.timestamp + event.duration
    );
    setActiveRectangles(activeEvents);
  }, [dispatch, events]);

  const handleEventClick = useCallback(
    (timestamp: number) => {
      const roundedTime = Number(timestamp.toFixed(3));
      if (videoRef.current) {
        videoRef.current.currentTime = roundedTime;
      }
      dispatch(setCurrentTime(roundedTime));
    },
    [dispatch]
  );

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    setOriginalVideoSize({
      width: video.videoWidth,
      height: video.videoHeight,
    });
  };

  // Расчет масштаба
  const scaleX = containerSize.width / originalVideoSize.width;
  const scaleY = containerSize.height / originalVideoSize.height;

  return (
    <div className="wrapper" data-testid="wrapper">
      <div className="video-wrapper" ref={videoWrapperRef}>
        <video
          ref={videoRef}
          controls
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleVideoLoad}
          className="video-element"
          data-testid="video-element"
        >
          <source src={VIDEO_SOURCE} type="video/mp4" />
          Твой браузер не поддерживает видео.
        </video>

        {activeRectangles.map(
          (event) =>
            event.zone && (
              <div
                key={event.timestamp}
                style={{
                  position: "absolute",
                  top: (event.zone?.top ?? 0) * scaleY,
                  left: (event.zone?.left ?? 0) * scaleX,
                  width: (event.zone?.width ?? 0) * scaleX,
                  height: (event.zone?.height ?? 0) * scaleY,
                  border: "2px solid rgb(30, 255, 0)",
                  boxSizing: "border-box",
                  pointerEvents: "none",
                }}
              />
            )
        )}
      </div>

      <EventList
        events={events}
        currentTime={currentTime}
        onEventClick={handleEventClick}
      />
    </div>
  );
};

export default VideoPlayer;
