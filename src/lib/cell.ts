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
import { Renderer } from "../setup";

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
  public draw(p: p5, renderer: Renderer): void {
    p.stroke("#101010");
    if (this.isCollapsed()) {
      p.fill("#000");
    } else {
      p.fill("#050505");
    }
    p.rect(this.i * this.size, this.j * this.size, this.size, this.size);
    p.stroke("#aeaeae");
    if (this.direction !== null) {
      p.push();
      p.translate(
        this.i * this.size + this.size / 2,
        this.j * this.size + this.size / 2
      );
      switch (renderer) {
        case Renderer.SEGMENT:
          switch (this.direction) {
            case CellDirection.DOWNTRI:
            case CellDirection.UPTRI:
            case CellDirection.LEFTTRI:
            case CellDirection.RIGHTTRI:
              p.rotate(this.direction * (Math.PI / 2));
              p.line(0, 0, 0, this.size / 2);
              p.line(-this.size / 2, 0, this.size / 2, 0);
              break;
            case CellDirection.DOWN:
            case CellDirection.UP:
            case CellDirection.LEFT:
            case CellDirection.RIGHT:
              p.fill("#000");
              p.rotate((this.direction - 12) * (Math.PI / 2));
              p.line(0, 0, 0, this.size / 2);
              p.circle(0, 0, this.size / 6);
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
              // p.line(0, this.size / 2, -this.size / 2, 0);
              // p.line(-this.size / 2, 0, 0, -this.size / 2);
              // p.line(0, -this.size / 2, this.size / 2, 0);
              // p.line(this.size / 2, 0, 0, this.size / 2);
              p.line(0, -this.size / 2, 0, this.size / 2);
              p.line(-this.size / 2, 0, this.size / 2, 0);
              break;

            default:
              // p.rect(-this.size / 2, -this.size / 2, this.size - 2);
              break;
          }
          break;
        case Renderer.CURVE:
          switch (this.direction) {
            case CellDirection.DOWNTRI:
            case CellDirection.UPTRI:
            case CellDirection.LEFTTRI:
            case CellDirection.RIGHTTRI:
              p.rotate(this.direction * (Math.PI / 2));
              p.arc(
                -this.size / 2,
                this.size / 2,
                this.size,
                this.size,
                -p.HALF_PI,
                0
              );
              p.arc(
                this.size / 2,
                this.size / 2,
                this.size,
                this.size,
                -p.PI,
                -p.HALF_PI
              );
              break;
            case CellDirection.DOWN:
            case CellDirection.UP:
            case CellDirection.LEFT:
            case CellDirection.RIGHT:
              p.fill("#000");
              p.rotate((this.direction - 12) * (Math.PI / 2));
              p.line(0, 0, 0, this.size / 2);
              p.circle(0, 0, this.size / 6);
              break;
            case CellDirection.HORIZONTAL:
              p.line(-this.size / 2, 0, this.size / 2, 0);
              break;
            case CellDirection.VERTICAL:
              p.line(0, -this.size / 2, 0, this.size / 2);
              break;
            case CellDirection.DOWNLEFT:
              p.arc(
                -this.size / 2,
                this.size / 2,
                this.size,
                this.size,
                -p.HALF_PI,
                0
              );
              break;
            case CellDirection.UPLEFT:
              p.arc(
                -this.size / 2,
                -this.size / 2,
                this.size,
                this.size,
                0,
                p.HALF_PI
              );
              break;
            case CellDirection.UPRIGHT:
              p.arc(
                this.size / 2,
                -this.size / 2,
                this.size,
                this.size,
                0,
                p.PI
              );
              break;
            case CellDirection.DOWNRIGHT:
              p.arc(
                this.size / 2,
                this.size / 2,
                this.size,
                this.size,
                -p.PI,
                -p.HALF_PI
              );
              break;
            case CellDirection.CROSS:
              p.arc(
                this.size / 2,
                this.size / 2,
                this.size,
                this.size,
                -p.PI,
                -p.HALF_PI
              );
              p.arc(
                this.size / 2,
                -this.size / 2,
                this.size,
                this.size,
                0,
                p.PI
              );
              p.arc(
                -this.size / 2,
                -this.size / 2,
                this.size,
                this.size,
                0,
                p.HALF_PI
              );
              p.arc(
                -this.size / 2,
                this.size / 2,
                this.size,
                this.size,
                -p.HALF_PI,
                0
              );
              break;

            default:
              // p.rect(-this.size / 2, -this.size / 2, this.size - 2);
              break;
          }
      }
      p.pop();
    }
  }
  private getNeighbors(): (Cell | null)[] {
    const neighbors: (Cell | null)[] = [];
    const directions: CellDirection[] = [
      CellDirection.DOWNTRI,
      CellDirection.LEFTTRI,
      CellDirection.UPTRI,
      CellDirection.RIGHTTRI,
    ];
    for (const direction of directions) {
      const ni: number =
        this.i +
        (direction === CellDirection.RIGHTTRI
          ? 1
          : direction === CellDirection.LEFTTRI
          ? -1
          : 0);
      const nj: number =
        this.j +
        (direction === CellDirection.DOWNTRI
          ? 1
          : direction === CellDirection.UPTRI
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
      case CellDirection.DOWNTRI:
        possibleNeighborsDirections.push(
          neighborsForConnection[0],
          neighborsForConnection[1],
          neighborsForIsolation[2],
          neighborsForConnection[3]
        );
        break;
      case CellDirection.LEFTTRI:
        possibleNeighborsDirections.push(
          neighborsForConnection[0],
          neighborsForConnection[1],
          neighborsForConnection[2],
          neighborsForIsolation[3]
        );
        break;
      case CellDirection.UPTRI:
        possibleNeighborsDirections.push(
          neighborsForIsolation[0],
          neighborsForConnection[1],
          neighborsForConnection[2],
          neighborsForConnection[3]
        );
        break;
      case CellDirection.RIGHTTRI:
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
      case CellDirection.DOWN:
        possibleNeighborsDirections.push(
          neighborsForConnection[0],
          neighborsForIsolation[1],
          neighborsForIsolation[2],
          neighborsForIsolation[3]
        );
        break;
      case CellDirection.LEFT:
        possibleNeighborsDirections.push(
          neighborsForIsolation[0],
          neighborsForConnection[1],
          neighborsForIsolation[2],
          neighborsForIsolation[3]
        );
        break;
      case CellDirection.UP:
        possibleNeighborsDirections.push(
          neighborsForIsolation[0],
          neighborsForIsolation[1],
          neighborsForConnection[2],
          neighborsForIsolation[3]
        );
        break;
      case CellDirection.RIGHT:
        possibleNeighborsDirections.push(
          neighborsForIsolation[0],
          neighborsForIsolation[1],
          neighborsForIsolation[2],
          neighborsForConnection[3]
        );
        break;
    }
    return possibleNeighborsDirections;
  }
  public collapse(): Cell | null {
    const neighbors: (Cell | null)[] = this.getNeighbors();
    const possibleDirections: CellDirection[] = [
      CellDirection.DOWNTRI,
      CellDirection.LEFTTRI,
      CellDirection.UPTRI,
      CellDirection.RIGHTTRI,
      CellDirection.BLANK,
      CellDirection.HORIZONTAL,
      CellDirection.VERTICAL,
      CellDirection.DOWNLEFT,
      CellDirection.UPLEFT,
      CellDirection.UPRIGHT,
      CellDirection.DOWNRIGHT,
      CellDirection.CROSS,
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

    // console.table([
    //   possibleAccordingToDownNeighbor,
    //   possibleAccordingToLeftNeighbor,
    //   possibleAccordingToUpNeighbor,
    //   possibleAccordingToRightNeighbor,
    // ]);

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
