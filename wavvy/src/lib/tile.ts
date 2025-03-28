export enum TileDirection {
  up,
  down,
  left,
  right,
}
export default class Cell {
  private direction: TileDirection | null = null;
  public setDirection(direction: TileDirection): void {
    this.direction = direction;
  }
  public getDirection(): TileDirection | null {
    return this.direction;
  }
}
