import { useEffect } from "react";
import { Event } from "types/types";

const useCanvas = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  events: Event[],
  currentTime: number,
  clickedEvent: number | null
) => {
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const tolerance = 0.01;
    const roundedTime = Math.round(currentTime * 1000) / 1000;

    if (
      clickedEvent === null ||
      Math.abs(roundedTime - clickedEvent) > tolerance
    ) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    const scaleX = canvas.width / video.videoWidth;
    const scaleY = canvas.height / video.videoHeight;

    events.forEach(({ timestamp, duration, zone }) => {
      if (!zone) return;

      const endTime = timestamp + duration;
      if (
        roundedTime >= timestamp - tolerance &&
        roundedTime <= endTime + tolerance
      ) {
        ctx.strokeStyle = "rgb(30, 255, 0)";
        ctx.lineWidth = 4;
        ctx.strokeRect(
          (zone.left ?? 0) * scaleX,
          (zone.top ?? 0) * scaleY,
          (zone.width ?? 0) * scaleX,
          (zone.height ?? 0) * scaleY
        );
      }
    });
  }, [videoRef, canvasRef, events, currentTime, clickedEvent]);
};

export default useCanvas;
