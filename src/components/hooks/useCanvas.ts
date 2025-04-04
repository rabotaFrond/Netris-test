import { useEffect } from "react";

const useCanvas = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  events: any[],
  currentTime: number,
  clickedEvent: number | null
) => {
  useEffect(() => {
    const syncCanvasSize = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas) {
        canvas.width = video.offsetWidth;
        canvas.height = video.offsetHeight;
      }
    };

    const drawCanvas = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (!canvas || !video) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (clickedEvent === null || currentTime !== clickedEvent) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const scaleX = canvas.width / videoWidth;
      const scaleY = canvas.height / videoHeight;

      const activeEvents = events.filter(
        (event) =>
          currentTime >= event.timestamp &&
          currentTime <= event.timestamp + event.duration
      );

      activeEvents.forEach(({ x, y, width, height }) => {
        ctx.strokeStyle = "rgb(30, 255, 0)";
        ctx.lineWidth = 4;
        ctx.strokeRect(x * scaleX, y * scaleY, width * scaleX, height * scaleY);
      });
    };

    syncCanvasSize();
    drawCanvas();
  }, [currentTime, events, clickedEvent, videoRef, canvasRef]);
};

export default useCanvas;
