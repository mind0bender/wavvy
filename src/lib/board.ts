import p5 from "p5";
import Cell from "./cell";
import { Renderer } from "../setup";

export default class Board {
  grid: Cell[][];
  rows: number;
  cols: number;
  collapseCell: Cell | null = null;

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

  public draw(p: p5, renderer: Renderer): void {
    for (let i: number = 0; i < this.rows; i++) {
      for (let j: number = 0; j < this.cols; j++) {
        this.grid[i][j].draw(p, renderer);
      }
    }
  }
  collapse(): void {
    if (!this.collapseCell) {
      const unCollapsedCells: Cell[] = [];
      for (let i: number = 0; i < this.rows; i++) {
        for (let j: number = 0; j < this.cols; j++) {
          if (!this.grid[i][j].isCollapsed()) {
            unCollapsedCells.push(this.grid[i][j]);
          }
        }
      }
      if (unCollapsedCells.length === 0) {
        return;
      }
      const randomIndex: number = Math.floor(
        Math.random() * unCollapsedCells.length
      );
      this.collapseCell = unCollapsedCells[randomIndex];
    }
    this.collapseCell = this.collapseCell.collapse();
  }
}
