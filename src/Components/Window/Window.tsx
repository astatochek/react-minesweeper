import React, { useEffect, useMemo, useState } from "react";
import GameComponent from "../Game/Game";
import RangeComponent from "./Range/Range";

export default function WindowComponent() {
  const cellSize = 1.25; // rem

  const [fieldSize, setFieldSize] = useState(16);
  const [numOfMines, setNumOfMines] = useState(40);

  const [paramsState, setParamsState] = useState({
    size: fieldSize,
    mines: numOfMines,
  });

  function handleFieldSizeChange(val: number) {
    if (val >= 10 && val <= 40) {
      setFieldSize(val);
    } else {
      setFieldSize((prev) => prev);
    }
  }

  function handleNumOFMinesChange(val: number) {
    if (val >= 1 && val <= Math.min(fieldSize * fieldSize - 1, 998)) {
      setNumOfMines(val);
    } else {
      setNumOfMines((prev) => prev);
    }
  }

  useMemo(() => {
    if (numOfMines >= fieldSize * fieldSize) {
      setNumOfMines(fieldSize * fieldSize - 1);
    }
  }, [fieldSize]);

  return (
    <div
      className="relative top-0 left-0 w-full flex flex-col justify-start items-center p-14 h-full min-h-screen windows-xp__bg"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="windows-xp__window">
        <div className="windows-xp__title-bar flex flex-row justify-between">
          <div className="windows-xp__title-bar-text">React-Minesweeper</div>
          <div className="flex flex-row items-start justify-center h-full ">
            <img
              className="h-full mr-[0.1rem]"
              src={"https://i.imgur.com/rVYEhWN.png"}
            ></img>
            <img
              className="h-full"
              src={"https://i.imgur.com/KUjzP5N.png"}
            ></img>
            <img
              className="h-full ml-[0.1rem]"
              src={"https://i.imgur.com/4wfkofS.png"}
            ></img>
          </div>
        </div>

        <div className="windows-xp__window-body flex flex-col justify-center items-center my-0 mx-[3px]">
          <div className="flex flex-row justify-around items-center w-full py-1 min-h-[3rem]">
            <RangeComponent
              title="Mines"
              min={1}
              max={Math.min(fieldSize * fieldSize - 1, 998)}
              current={numOfMines}
              handler={handleNumOFMinesChange}
              width={(cellSize * paramsState.size * 2) / 5}
            />
            <RangeComponent
              title="Size"
              min={10}
              max={40}
              current={fieldSize}
              handler={handleFieldSizeChange}
              width={(cellSize * paramsState.size * 2) / 5}
            />
            <div className="windows-xp__btn-wrap">
              <button
                className="windows-xp__btn"
                style={{
                  fontSize:
                    (cellSize * paramsState.size * 2) / 5 <= 9
                      ? "0.8rem"
                      : "1rem",
                }}
                onClick={() =>
                  setParamsState({ size: fieldSize, mines: numOfMines })
                }
              >
                Apply
              </button>
            </div>
          </div>
          <GameComponent
            cellSize={cellSize}
            size={paramsState.size}
            numOfMines={paramsState.mines}
          />
        </div>
      </div>
    </div>
  );
}
