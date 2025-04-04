import { render } from "@testing-library/react";
import Canvas from "../../components/Canvas";

describe("Canvas", () => {
  it("рендерит canvas без ошибок", () => {
    const videoRef = { current: null };
    const canvasRef = { current: document.createElement("canvas") };

    render(
      <Canvas
        videoRef={videoRef}
        canvasRef={canvasRef}
        events={[]}
        currentTime={0}
        clickedEvent={null}
      />
    );
  });
});
