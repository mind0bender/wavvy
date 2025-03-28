import p5 from "p5";
import Board from "./lib/board";

export let board: Board;

export default function setup(p: p5): void {
  const minWidth: number =
    [innerHeight, innerWidth][Number(innerHeight > innerWidth)] - 40 * 2;
  p.createCanvas(minWidth, minWidth);
  //   p.frameRate(1);
  board = new Board(10, 10, minWidth / 10);
  p.fill("#000");
  p.stroke("#1e1e1e");
  Object.defineProperty(window, "p", {
    get: () => p,
  } as PropertyDescriptorMap & ThisType<any>);

  console.log("Setup complete.");
}
