import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsRequest, selectEvents } from "../../store/eventsSlice";
import useCanvas from "../hooks/useCanvas";
import Canvas from "../Canvas";
import EventList from "../EventList";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [clickedEvent, setClickedEvent] = useState<number | null>(null);
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);

  useEffect(() => {
    dispatch(fetchEventsRequest());
  }, [dispatch]);

  useCanvas(videoRef, canvasRef, events, currentTime, clickedEvent);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleEventClick = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      setCurrentTime(timestamp);
      setClickedEvent(timestamp);
    }
  };

  return (
    <div className="wrapper">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          controls
          onTimeUpdate={handleTimeUpdate}
          className="video-element"
          data-testid="video-element"
        />
        <Canvas
          videoRef={videoRef}
          canvasRef={canvasRef}
          events={events}
          currentTime={currentTime}
          clickedEvent={clickedEvent}
        />
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
