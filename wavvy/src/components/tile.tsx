import { JSX } from "react";
import { TileDirection } from "../lib/tile";

interface TileProps {
  direction: TileDirection | null;
}

function Tile({ direction }: TileProps): JSX.Element {
  return (
    <div
      className={`relative hover:bg-slate-900 w-1/10 flex flex-col duration-100`}>
      {(direction === TileDirection.up ||
        direction === TileDirection.left ||
        direction === TileDirection.right) && (
        <div
          className={`absolute top-0 left-1/2 h-1/2 border-x border-white`}
        />
      )}
      {(direction === TileDirection.down ||
        direction === TileDirection.left ||
        direction === TileDirection.right) && (
        <div
          className={`absolute bottom-0 left-1/2 h-1/2 border-x border-white`}
        />
      )}
      {(direction === TileDirection.up ||
        direction === TileDirection.down ||
        direction === TileDirection.right) && (
        <div
          className={`absolute top-1/2 right-0 w-1/2 border-y border-white`}
        />
      )}
      {(direction === TileDirection.up ||
        direction === TileDirection.down ||
        direction === TileDirection.left) && (
        <div
          className={`absolute top-1/2 left-0 w-1/2 border-y border-white`}
        />
      )}
    </div>
  );
}

export default Tile;
