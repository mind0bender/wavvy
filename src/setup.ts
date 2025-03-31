import p5 from "p5";
import Board from "./lib/board";

export let board: Board;

export enum Renderer {
  CURVE = "curve",
  SEGMENT = "segment",
}
export let renderer: Renderer = Renderer.CURVE;

export default function setup(p: p5): void {
  const minWidth: number =
    [innerHeight, innerWidth][Number(innerHeight > innerWidth)] - 40 * 2;
  p.createCanvas(minWidth, minWidth);
  // p.frameRate(1);
  p.doubleClicked = (): void => {
    if (p.isLooping()) {
      p.noLoop();
    } else {
      p.loop();
    }
  };
  board = new Board(25, 25, minWidth / 25);
  p.fill("#000");
  p.stroke("#1e1e1e");
  Object.defineProperty(window, "p", {
    get: (): p5 => p,
  } as PropertyDescriptorMap & ThisType<any>);
  Object.defineProperty(window, "board", {
    get: (): Board => board,
  } as PropertyDescriptorMap & ThisType<any>);

  const rendererType = document.getElementById("renderer") as HTMLSelectElement;
  rendererType.addEventListener("change", () => {
    renderer = rendererType.value as Renderer;
  });
}
