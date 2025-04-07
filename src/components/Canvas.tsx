import { RefObject } from "react";
import { Event } from "types/types";

type CanvasProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  events: Event[];
  currentTime: number;
  clickedEvent: number | null;
};

const Canvas = ({ canvasRef }: CanvasProps) => {
  return <canvas ref={canvasRef} className="video-canvas" />;
};

export default Canvas;
