import p5 from "p5";

export default function setup(p: p5): void {
  const minWidth: number =
    [innerHeight, innerWidth][Number(innerHeight > innerWidth)] - 10;
  p.createCanvas(minWidth, minWidth);
  console.log("Setup complete.");
}
