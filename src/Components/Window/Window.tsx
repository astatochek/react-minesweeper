import React, { useMemo, useState } from "react";
import CardComponent from "../Card/Card";
import GameComponent from "../Game/Game";
import ClickContext from "../../Context/Click";
import ClickerComponent from "./Clicker/Clicker";
import { RangeComponent } from "./Range/Range";

export default function WindowComponent() {
  const cellSize = 1.25; // rem

  const [fieldSize, setFieldSize] = useState(16);
  const [numOfMines, setNumOfMines] = useState(40);

  function handleFieldSizeChange(val: number) {
    setFieldSize(val);
  }

  function handleNumOFMinesChange(val: number) {
    setNumOfMines(val);
  }

  useMemo(() => {
    if (numOfMines >= fieldSize * fieldSize) {
      setNumOfMines(fieldSize * fieldSize - 1);
    }
  }, [fieldSize]);

  return (
    <div
      className="relative top-0 left-0 w-full flex flex-col justify-start items-center p-14 h-full min-h-screen windows-xp-bg"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text">React-Minesweeper</div>
        </div>

        <div className="window-body flex flex-col justify-center items-center my-0 mx-[3px]">
          <div>
            <RangeComponent
              title="Mines"
              min={1}
              max={Math.min(fieldSize * fieldSize - 1, 998)}
              current={numOfMines}
              handler={handleNumOFMinesChange}
            />
          </div>
          <div>
            <RangeComponent
              title="Size"
              min={10}
              max={40}
              current={fieldSize}
              handler={handleFieldSizeChange}
            />
          </div>
          <GameComponent
            cellSize={cellSize}
            size={fieldSize}
            numOfMines={numOfMines}
          />
        </div>
      </div>
    </div>
  );
}
