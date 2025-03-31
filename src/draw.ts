import p5 from "p5";
import { board, renderer } from "./setup";

export default function draw(p: p5): void {
  board.collapse();
  board.draw(p, renderer);
}
