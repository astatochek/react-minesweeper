import React, { useMemo, useState } from "react";
import CardComponent from "../Card/Card";
import GameComponent from "../Game/Game";
import ClickContext from "../../Context/Click";
import ClickerComponent from "./Clicker/Clicker";

export default function WindowComponent() {
  const cellSize = 1.25; // rem

  const [fieldSize, setFieldSize] = useState(16);
  const [numOfMines, setNumOfMines] = useState(40);

  function handleFieldSizeChange(val: 1 | -1) {
    setFieldSize((prev) => {
      if (fieldSize + val > 10 && fieldSize + val < 40) return prev + val;
      return prev;
    });
  }

  function handleNumOFMinesChange(val: 1 | -1) {
    setNumOfMines((prev) => {
      if (prev + val > 1 && prev + val < fieldSize * fieldSize)
        return prev + val;
      return prev;
    });
  }

  useMemo(() => {
    if (numOfMines >= fieldSize * fieldSize) {
      setNumOfMines(fieldSize * fieldSize - 1);
    }
  }, [fieldSize]);

  return (
    <div className="relative top-0 left-0 w-full flex flex-col justify-start items-center p-14">
      <div
        onContextMenu={(e) => e.preventDefault()}
      >
        <GameComponent
          cellSize={cellSize}
          size={fieldSize}
          numOfMines={numOfMines}
        />
        
      </div>
    </div>
  );
}
