import p5 from "p5";
import { board } from "./setup";

export default function draw(p: p5): void {
  board.draw(p);
  board.collapse();
}
