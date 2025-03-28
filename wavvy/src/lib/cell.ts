import Board from "./board";

export enum CellDirection {
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3,
}

export default class Cell {
  i: number;
  j: number;
  size: number;
  direction: CellDirection | null = null;
  board: Board;

  constructor(i: number, j: number, size: number, board: Board) {
    this.i = i;
    this.j = j;
    this.size = size;
    this.board = board;
  }

  public setDirection(direction: CellDirection): void {
    this.direction = direction;
  }
  public draw(p: any): void {
    p.rect(this.i * this.size, this.j * this.size, this.size, this.size);
  }
}
