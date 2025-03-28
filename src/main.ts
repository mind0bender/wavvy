import p5 from "p5";
import "./style.css";
import setup from "./setup";
import draw from "./draw";

new p5((p: p5): void => {
  p.setup = (): void => {
    setup(p);
  };

  p.draw = (): void => {
    draw(p);
  };
});
