import p5 from "p5";

declare global {
  interface Window {
    p: p5;
  }
}
import Board from "./board";
import {
  CellDirection,
  neighborsForConnection,
  neighborsForIsolation,
} from "./neighbors";

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
    // // Randomly assign a direction
    // const randomDirection: number = Math.floor(Math.random() * 4);
    // this.direction = randomDirection as CellDirection;
  }
  public getDirection(): CellDirection | null {
    return this.direction;
  }
  private setDirection(direction: CellDirection): void {
    this.direction = direction;
  }
  public isCollapsed(): boolean {
    return this.direction !== null;
  }
  public draw(p: p5): void {
    p.stroke("#0e0e0e");
    p.rect(this.i * this.size, this.j * this.size, this.size, this.size);
    p.stroke("#aeaeae");
    if (this.direction !== null) {
      p.push();
      p.translate(
        this.i * this.size + this.size / 2,
        this.j * this.size + this.size / 2
      );
      switch (this.direction) {
        case CellDirection.DOWN:
        case CellDirection.UP:
        case CellDirection.LEFT:
        case CellDirection.RIGHT:
          p.rotate(this.direction * (Math.PI / 2));
          p.line(0, 0, 0, this.size / 2);
          p.line(-this.size / 2, 0, this.size / 2, 0);
          break;
        case CellDirection.HORIZONTAL:
          p.line(-this.size / 2, 0, this.size / 2, 0);
          break;
        case CellDirection.VERTICAL:
          p.line(0, -this.size / 2, 0, this.size / 2);
          break;
        case CellDirection.DOWNLEFT:
          p.line(0, this.size / 2, -this.size / 2, 0);
          break;
        case CellDirection.UPLEFT:
          p.line(-this.size / 2, 0, 0, -this.size / 2);
          break;
        case CellDirection.UPRIGHT:
          p.line(0, -this.size / 2, this.size / 2, 0);
          break;
        case CellDirection.DOWNRIGHT:
          p.line(this.size / 2, 0, 0, this.size / 2);
          break;
        case CellDirection.CROSS:
          p.line(0, this.size / 2, -this.size / 2, 0);
          p.line(-this.size / 2, 0, 0, -this.size / 2);
          p.line(0, -this.size / 2, this.size / 2, 0);
          p.line(this.size / 2, 0, 0, this.size / 2);
          break;

        default:
          break;
      }
      p.pop();
    }
    // if (this.isCollapsed()) {
    //   // write the direction of the cell on the cell
    //   p.fill("#fff");
    //   p.textAlign(p.CENTER, p.CENTER);
    //   p.textSize(this.size / 5);
    //   // p.textFont("monospace");
    //   // p.textStyle(p.BOLD);
    //   // p.textLeading(this.size / 2);
    //   p.text(
    //     this.direction === CellDirection.BLANK
    //       ? "0"
    //       : this.direction === CellDirection.CROSS
    //       ? "X"
    //       : this.direction === CellDirection.HORIZONTAL
    //       ? "--"
    //       : this.direction === CellDirection.VERTICAL
    //       ? "|"
    //       : this.direction === CellDirection.DOWN
    //       ? "D"
    //       : this.direction === CellDirection.LEFT
    //       ? "L"
    //       : this.direction === CellDirection.UP
    //       ? "U"
    //       : this.direction === CellDirection.RIGHT
    //       ? "R"
    //       : this.direction === CellDirection.DOWNLEFT
    //       ? "DL"
    //       : this.direction === CellDirection.UPLEFT
    //       ? "UL"
    //       : this.direction === CellDirection.UPRIGHT
    //       ? "UR"
    //       : this.direction === CellDirection.DOWNRIGHT
    //       ? "DR"
    //       : "??",
    //     this.i * this.size + this.size / 2,
    //     this.j * this.size + this.size / 2
    //   );
    // }
  }
  private getNeighbors(): (Cell | null)[] {
    const neighbors: (Cell | null)[] = [];
    const directions: CellDirection[] = [
      CellDirection.DOWN,
      CellDirection.LEFT,
      CellDirection.UP,
      CellDirection.RIGHT,
    ];
    for (const direction of directions) {
      const ni: number =
        this.i +
        (direction === CellDirection.RIGHT
          ? 1
          : direction === CellDirection.LEFT
          ? -1
          : 0);
      const nj: number =
        this.j +
        (direction === CellDirection.DOWN
          ? 1
          : direction === CellDirection.UP
          ? -1
          : 0);
      if (ni >= 0 && ni < this.board.rows && nj >= 0 && nj < this.board.cols) {
        neighbors.push(this.board.grid[ni][nj]);
      } else {
        neighbors.push(null);
      }
    }
    return neighbors;
  }
  public getPossibleNeighborsDirections(): (CellDirection | null)[][] {
    const possibleNeighborsDirections: (CellDirection | null)[][] = [];
    switch (this.direction) {
      case CellDirection.DOWN:
        possibleNeighborsDirections.push(
          neighborsForConnection[0],
          neighborsForConnection[1],
          neighborsForIsolation[2],
          neighborsForConnection[3]
        );
        break;
      case CellDirection.LEFT:
        possibleNeighborsDirections.push(
          neighborsForConnection[0],
          neighborsForConnection[1],
          neighborsForConnection[2],
          neighborsForIsolation[3]
        );
        break;
      case CellDirection.UP:
        possibleNeighborsDirections.push(
          neighborsForIsolation[0],
          neighborsForConnection[1],
          neighborsForConnection[2],
          neighborsForConnection[3]
        );
        break;
      case CellDirection.RIGHT:
        possibleNeighborsDirections.push(
          neighborsForConnection[0],
          neighborsForIsolation[1],
          neighborsForConnection[2],
          neighborsForConnection[3]
        );
        break;
      case CellDirection.BLANK:
        possibleNeighborsDirections.push(
          neighborsForIsolation[0],
          neighborsForIsolation[1],
          neighborsForIsolation[2],
          neighborsForIsolation[3]
        );
        break;
      case CellDirection.HORIZONTAL:
        possibleNeighborsDirections.push(
          neighborsForIsolation[0],
          neighborsForConnection[1],
          neighborsForIsolation[2],
          neighborsForConnection[3]
        );
        break;
      case CellDirection.VERTICAL:
        possibleNeighborsDirections.push(
          neighborsForConnection[0],
          neighborsForIsolation[1],
          neighborsForConnection[2],
          neighborsForIsolation[3]
        );
        break;
      case CellDirection.DOWNLEFT:
        possibleNeighborsDirections.push(
          neighborsForConnection[0],
          neighborsForConnection[1],
          neighborsForIsolation[2],
          neighborsForIsolation[3]
        );
        break;
      case CellDirection.UPLEFT:
        possibleNeighborsDirections.push(
          neighborsForIsolation[0],
          neighborsForConnection[1],
          neighborsForConnection[2],
          neighborsForIsolation[3]
        );
        break;
      case CellDirection.UPRIGHT:
        possibleNeighborsDirections.push(
          neighborsForIsolation[0],
          neighborsForIsolation[1],
          neighborsForConnection[2],
          neighborsForConnection[3]
        );
        break;
      case CellDirection.DOWNRIGHT:
        possibleNeighborsDirections.push(
          neighborsForConnection[0],
          neighborsForIsolation[1],
          neighborsForIsolation[2],
          neighborsForConnection[3]
        );
        break;
      case CellDirection.CROSS:
        possibleNeighborsDirections.push(
          neighborsForConnection[0],
          neighborsForConnection[1],
          neighborsForConnection[2],
          neighborsForConnection[3]
        );
        break;
      case CellDirection.BLANK:
        possibleNeighborsDirections.push(
          neighborsForIsolation[0],
          neighborsForIsolation[1],
          neighborsForIsolation[2],
          neighborsForIsolation[3]
        );
        break;
    }
    return possibleNeighborsDirections;
  }
  public collapse(): Cell | null {
    const neighbors: (Cell | null)[] = this.getNeighbors();
    const possibleDirections: CellDirection[] = [
      CellDirection.DOWN,
      CellDirection.LEFT,
      CellDirection.UP,
      CellDirection.RIGHT,
      CellDirection.BLANK,
      CellDirection.HORIZONTAL,
      CellDirection.VERTICAL,
      CellDirection.DOWNLEFT,
      CellDirection.UPLEFT,
      CellDirection.UPRIGHT,
      CellDirection.DOWNRIGHT,
      CellDirection.CROSS,
    ];
    const possibleAccordingToDownNeighbor: (CellDirection | null)[] =
      neighbors[0]?.getPossibleNeighborsDirections()[2] || possibleDirections;
    const possibleAccordingToLeftNeighbor: (CellDirection | null)[] =
      neighbors[1]?.getPossibleNeighborsDirections()[3] || possibleDirections;
    const possibleAccordingToUpNeighbor: (CellDirection | null)[] =
      neighbors[2]?.getPossibleNeighborsDirections()[0] || possibleDirections;
    const possibleAccordingToRightNeighbor: (CellDirection | null)[] =
      neighbors[3]?.getPossibleNeighborsDirections()[1] || possibleDirections;

    const possibleDirectionsAccordingToNeighbors: CellDirection[] =
      possibleDirections.filter((direction: CellDirection): boolean => {
        return (
          possibleAccordingToDownNeighbor.includes(direction) &&
          possibleAccordingToLeftNeighbor.includes(direction) &&
          possibleAccordingToUpNeighbor.includes(direction) &&
          possibleAccordingToRightNeighbor.includes(direction)
        );
      });
    this.setDirection(
      possibleDirectionsAccordingToNeighbors[
        Math.floor(
          Math.random() * possibleDirectionsAccordingToNeighbors.length
        )
      ]
    );
    // pick a random neighbor
    const filteredNeighbors: Cell[] = neighbors.filter(
      (a: Cell | null): boolean => !!a && !a.isCollapsed()
    ) as Cell[];

    const randomIndex: number = Math.floor(
      Math.random() * filteredNeighbors.length
    );
    if (filteredNeighbors.length === 0) {
      // window.p.noLoop();
      console.log({
        pos: [this.i, this.j],
        possibleDirectionsAccordingToNeighbors,
        individual: [
          possibleAccordingToDownNeighbor,
          possibleAccordingToLeftNeighbor,
          possibleAccordingToUpNeighbor,
          possibleAccordingToRightNeighbor,
        ],
      });
      return null;
    }
    const nextCell: Cell = filteredNeighbors[randomIndex];
    return nextCell;
  }
}
