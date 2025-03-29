import p5 from "p5";
import Board from "./board";

export enum CellDirection {
  DOWN,
  LEFT,
  UP,
  RIGHT,
  NULL,
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
    if (this.direction === CellDirection.NULL) {
      return;
    }
    p.stroke("#aeaeae");
    if (this.direction !== null) {
      p.push();
      p.translate(
        this.i * this.size + this.size / 2,
        this.j * this.size + this.size / 2
      );
      p.rotate(this.direction * (Math.PI / 2));
      p.line(0, 0, 0, this.size / 2);
      p.line(-this.size / 2, 0, this.size / 2, 0);
      p.pop();
    }
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
          [CellDirection.LEFT, CellDirection.UP, CellDirection.RIGHT],
          [CellDirection.DOWN, CellDirection.UP, CellDirection.RIGHT],
          [CellDirection.UP, CellDirection.NULL],
          [CellDirection.DOWN, CellDirection.LEFT, CellDirection.UP]
        );
        break;
      case CellDirection.LEFT:
        possibleNeighborsDirections.push(
          [CellDirection.LEFT, CellDirection.UP, CellDirection.RIGHT],
          [CellDirection.DOWN, CellDirection.UP, CellDirection.RIGHT],
          [CellDirection.DOWN, CellDirection.LEFT, CellDirection.RIGHT],
          [CellDirection.RIGHT, CellDirection.NULL]
        );
        break;
      case CellDirection.UP:
        possibleNeighborsDirections.push(
          [CellDirection.DOWN, CellDirection.NULL],
          [CellDirection.DOWN, CellDirection.UP, CellDirection.RIGHT],
          [CellDirection.DOWN, CellDirection.LEFT, CellDirection.RIGHT],
          [CellDirection.DOWN, CellDirection.LEFT, CellDirection.UP]
        );
        break;
      case CellDirection.RIGHT:
        possibleNeighborsDirections.push(
          [CellDirection.LEFT, CellDirection.UP, CellDirection.RIGHT],
          [CellDirection.LEFT, CellDirection.NULL],
          [CellDirection.DOWN, CellDirection.LEFT, CellDirection.RIGHT],
          [CellDirection.LEFT, CellDirection.DOWN, CellDirection.UP]
        );
        break;
      case CellDirection.NULL:
        possibleNeighborsDirections.push(
          [CellDirection.DOWN, CellDirection.NULL],
          [CellDirection.LEFT, CellDirection.NULL],
          [CellDirection.UP, CellDirection.NULL],
          [CellDirection.RIGHT, CellDirection.NULL]
        );
        break;
    }
    return possibleNeighborsDirections;
  }
  public collapse(): Cell {
    const neighbors: (Cell | null)[] = this.getNeighbors();
    const possibleDirections: CellDirection[] = [
      CellDirection.DOWN,
      CellDirection.LEFT,
      CellDirection.UP,
      CellDirection.RIGHT,
    ];
    const possibleAccordingToDownNeighbor: (CellDirection | null)[] =
      neighbors[0]?.getPossibleNeighborsDirections()[2] || possibleDirections;
    const possibleAccordingToLeftNeighbor: (CellDirection | null)[] =
      neighbors[1]?.getPossibleNeighborsDirections()[3] || possibleDirections;
    const possibleAccordingToUpNeighbor: (CellDirection | null)[] =
      neighbors[2]?.getPossibleNeighborsDirections()[0] || possibleDirections;
    const possibleAccordingToRightNeighbor: (CellDirection | null)[] =
      neighbors[3]?.getPossibleNeighborsDirections()[1] || possibleDirections;

    // console.log({ dir: this.direction });
    // console.table({
    //   down: possibleAccordingToDownNeighbor,
    //   left: possibleAccordingToLeftNeighbor,
    //   up: possibleAccordingToUpNeighbor,
    //   right: possibleAccordingToRightNeighbor,
    // });

    const possibleDirectionsAccordingToNeighbors: CellDirection[] =
      possibleDirections.filter((direction: CellDirection): boolean => {
        return (
          possibleAccordingToDownNeighbor.includes(direction) &&
          possibleAccordingToLeftNeighbor.includes(direction) &&
          possibleAccordingToUpNeighbor.includes(direction) &&
          possibleAccordingToRightNeighbor.includes(direction)
        );
      });
    // console.log(possibleDirectionsAccordingToNeighbors);
    if (possibleDirectionsAccordingToNeighbors.length > 0) {
      this.setDirection(
        possibleDirectionsAccordingToNeighbors[
          Math.floor(
            Math.random() * possibleDirectionsAccordingToNeighbors.length
          )
        ]
      );
    } else {
      this.setDirection(CellDirection.NULL);
    }
    // pick a random neighbor
    const filteredNeighbors: Cell[] = neighbors.filter(
      (a: Cell | null): boolean => !!a && !a.isCollapsed()
    ) as Cell[];

    const nextCell = filteredNeighbors[
      Math.floor(Math.random() * filteredNeighbors.length)
    ] as Cell;
    if (!nextCell) {
      console.table({ neighbors });
    }
    return nextCell;
  }
}
