import { RefObject } from "react";

type CanvasProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  events: any[];
  currentTime: number;
  clickedEvent: number | null;
};

const Canvas = ({ canvasRef }: CanvasProps) => {
  return <canvas ref={canvasRef} className="video-canvas" />;
};

export default Canvas;
