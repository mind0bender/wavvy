import { JSX, useEffect, useState } from "react";
import Tile from "./components/tile";
import Cell from "./lib/tile";

function App(): JSX.Element {
  const [board, setBoard] = useState<Cell[][]>([]);

  useEffect((): (() => void) => {
    for (let i: number = 0; i < 10; i++) {
      setBoard((prevBoard: Cell[][]): Cell[][] => [...prevBoard, []]);
      for (let j: number = 0; j < 10; j++) {
        // const randInt4: number = Math.floor(Math.random() * 4);
        // let tileDirection: TileDirection;
        // switch (randInt4) {
        //   case 0:
        //     tileDirection = TileDirection.up;
        //     break;
        //   case 1:
        //     tileDirection = TileDirection.right;
        //     break;
        //   case 2:
        //     tileDirection = TileDirection.down;
        //     break;

        //   default:
        //     tileDirection = TileDirection.left;
        //     break;
        // }
        setBoard((prevBoard: Cell[][]): Cell[][] => {
          return [
            ...prevBoard.slice(0, -1),
            [...prevBoard[prevBoard.length - 1], new Cell()],
          ];
        });
      }
    }
    return (): void => {
      setBoard([]);
    };
  }, []);

  return (
    <div className={`bg-black h-screen w-full p-4 divide-y divide-gray-900`}>
      {board.map(
        (row: Cell[], idxI: number): JSX.Element => (
          <div
            key={idxI}
            className={`w-full h-1/10 flex divide-x divide-gray-900 text-white`}>
            {row.map((cell: Cell, idxJ: number): JSX.Element => {
              return <Tile key={idxJ} direction={cell.getDirection()} />;
            })}
          </div>
        )
      )}
    </div>
  );
}

export default App;
