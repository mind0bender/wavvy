import Cell from "./cell";

export default class Board {
  grid: Cell[][];
  rows: number;
  cols: number;

  constructor(rows: number, cols: number, cellSize: number) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];
    for (let i: number = 0; i < rows; i++) {
      this.grid[i] = [];
      for (let j: number = 0; j < cols; j++) {
        this.grid[i][j] = new Cell(i, j, cellSize, this);
      }
    }
  }

  public draw(p: any): void {
    for (let i: number = 0; i < this.rows; i++) {
      for (let j: number = 0; j < this.cols; j++) {
        this.grid[i][j].draw(p);
      }
    }
  }
  collapse(): void {
    // pick a random cell
    const randomRow: number = Math.floor(Math.random() * this.rows);
    const randomCol: number = Math.floor(Math.random() * this.cols);
    const randomCell: Cell = this.grid[randomRow][randomCol];
    // collapse the cell
    randomCell.collapse();
  }
}
