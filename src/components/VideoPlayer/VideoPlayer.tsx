import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsRequest, setCurrentTime } from "../../store/Actions";
import { selectEvents, selectCurrentTime } from "../../store/Reducer";
import { AppDispatch } from "../../store/store";
import useCanvas from "../hooks/useCanvas";
import Canvas from "../Canvas";
import EventList from "../EventList";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector(selectEvents);
  const currentTime = useSelector(selectCurrentTime);
  useEffect(() => {
    dispatch(fetchEventsRequest());
  }, []);

  useCanvas(videoRef, canvasRef, events, currentTime, null);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = Number(videoRef.current.currentTime.toFixed(3));
      dispatch(setCurrentTime(time)); //тротлинг навесить, или ещё что-то придумать. много рендеров делается.
    }
  };

  const handleEventClick = (timestamp: number) => {
    const rounded = Number(timestamp.toFixed(3));
    dispatch(setCurrentTime(rounded));
    if (videoRef.current) {
      videoRef.current.currentTime = rounded;
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
          clickedEvent={null}
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
