import React, { useState, useContext, useMemo, useEffect, useRef } from "react";
import ClickContext from "../../../Context/Click";
import { CellType } from "../../../Types/Cell";
import { CellDataType } from "../../../Types/CellData";
import CellComponent from "./Cell/Cell";
import { ClickInfoType } from "../../../Types/ClickContext";
import { GameType } from "../../../Types/Game";
import GameContext from "../../../Context/Game";

export default function FieldComponent() {
  const size = 16;
  const numOfMines = 40;

  const { clickInfo, setClickInfo } = useContext(ClickContext);

  const { gameMode, setGameMode } = useContext(GameContext);

  const [flags, setFlags] = useState<number[]>([]);

  const [field, setField] = useState<CellDataType[]>(
    new Array(size * size).fill(null).map(() => {
      return { type: "closed", hasMine: false, minesNear: 0, closed: true };
    })
  );

  function isValidIndex(index: number) {
    return index >= 0 && index < size * size;
  }

  function getShift(index: number): number[] {
    if (!(index >= 0 && index < size * size)) {
      console.error("Invalid Input");
      return [];
    }

    const shifts = {
      standard: [-size - 1, -size, -size + 1, -1, 1, size - 1, size, size + 1],
      topLeft: [1, size, size + 1],
      topRight: [-1, size - 1, size],
      left: [-size, -size + 1, 1, size, size + 1],
      right: [-size - 1, -size, -1, size - 1, size],
      top: [-1, 1, size - 1, size, size + 1],
      bottom: [-size - 1, -size, -size + 1, -1, 1],
      bottomLeft: [-size, -size + 1, 1],
      bottomRight: [-size - 1, -size, -1],
    };

    if (index === 0) return shifts.topLeft;
    else if (index === size - 1) return shifts.topRight;
    else if (index === size * (size - 1)) return shifts.bottomLeft;
    else if (index === size * size - 1) return shifts.bottomRight;
    else if (index < size) return shifts.top;
    else if (index >= size * (size - 1)) return shifts.bottom;
    else if (index % size === 0) return shifts.left;
    else if (index % size === size - 1) return shifts.right;

    return shifts.standard;
  }

  function getMineIndices(n: number, excluding: number): number[] {
    if (!isValidIndex(n) || !isValidIndex(excluding)) {
      console.error("Invalid Input");
      return [];
    }
    let indices: number[] = [];
    while (indices.length < n) {
      const index = Math.floor(Math.random() * size * size);
      if (!indices.includes(index) && index !== excluding) indices.push(index);
    }
    indices = indices.sort();
    return indices;
  }

  function openedCellIfAllowed(cell: CellDataType): CellDataType {
    if (cell.closed && !cell.hasMine) {
      return {
        type: `type ${cell.minesNear}`,
        hasMine: cell.hasMine,
        minesNear: cell.minesNear,
        closed: false,
      };
    }
    return cell;
  }

  function openNearCells(fieldData: CellDataType[], index: number) {
    if (!fieldData[index].closed) return;
    fieldData[index] = openedCellIfAllowed(fieldData[index]);
    if (!fieldData[index].closed && fieldData[index].minesNear === 0) {
      const availableShifts = getShift(index);
      availableShifts.forEach((shift) =>
        openNearCells(fieldData, index + shift)
      );
    }
  }

  // function updateFlags(fieldData: CellDataType[], newFlagIndex: number = -1) {
  //   if (newFlagIndex === -1) return;

  //   if (newFlagIndex !== -1 && !flags.includes(newFlagIndex)) {
  //     flags.push(newFlagIndex);
  //   }
  //   let toRemove: number[] = [];
  //   flags.forEach((index) => {
  //     if (fieldData[index].type !== "closed flag") {
  //       toRemove.push(index);
  //     }
  //   });
  //   setGameMode({
  //     mode: "on",
  //     emoji: "unpressed",
  //     flags: numOfMines - flags.length,
  //   });
  // }

  function openAllMines(fieldData: CellDataType[], clickedMineIndex: number) {
    const mines = fieldData
      .map((cell, i) => i)
      .filter((index) => fieldData[index].hasMine);

    mines.forEach((mineIndex) => {
      if (!fieldData[mineIndex].hasMine) {
        console.error(`Cell[${mineIndex}] has no mine`);
      } else {
        fieldData[mineIndex] = {
          type: "mine",
          hasMine: true,
          minesNear: 0,
          closed: false,
        };
      }
    });
    fieldData[clickedMineIndex] = {
      type: "mine red",
      hasMine: true,
      minesNear: 0,
      closed: false,
    };
  }

  function updateField(
    fieldData: CellDataType[],
    index: number,
    type: "left" | "right"
  ) {
    const cell = fieldData[index];

    if (type === "left") {
      if (cell.hasMine) {
        openAllMines(fieldData, index);
        setGameMode(getEndGame());
      } else {
        openNearCells(fieldData, index);
      }
    } else if (type === "right") {
      let nextCell = { ...cell };
      if (cell.type === "closed flag") {
        nextCell.type = "closed";
        fieldData[index] = nextCell;
        // updateFlags(fieldData);
      } else if (cell.type === "closed" && flags.length < gameMode.flags) {
        nextCell.type = "closed flag";
        fieldData[index] = nextCell;
        // if (!flags.includes(index)) {
        //   updateFlags(fieldData, index);
        // }
      }
      // OTHER FLAG ACTIONS
    }
  }

  function initializeField(firstClickIndex: number): CellDataType[] {
    const mineIndices = getMineIndices(numOfMines, firstClickIndex);

    let field: CellDataType[] = new Array(size * size).fill(null).map(() => {
      return { type: "closed", hasMine: false, minesNear: 0, closed: true };
    });

    mineIndices.forEach((index) => {
      // field[index].type = "mine";
      field[index].hasMine = true;

      const availableShifts = getShift(index);

      availableShifts.forEach((shift) => {
        if (!field[index + shift].hasMine) {
          field[index + shift].minesNear++;
        }
      });
    });

    field[firstClickIndex] = openedCellIfAllowed(field[firstClickIndex]);

    return field;
  }

  const availableCellTypes: CellType[] = [
    "closed",
    "closed flag",
    "flag",
    "mine",
    "mine red",
    "mine wrong",
    "pressed",
    "type 0",
    "type 1",
    "type 2",
    "type 3",
    "type 4",
    "type 5",
    "type 6",
    "type 7",
    "type 8",
  ];

  function handleClick(index: number, type: "left" | "right") {
    setClickInfo((prevClickInfo) => {
      const thisClickInfo: ClickInfoType = {
        id: prevClickInfo.id + 1,
        index: index,
        type: type,
      };
      return thisClickInfo;
    });
  }

  function startGame(fieldData: CellDataType[], click: ClickInfoType) {
    initializeField(click.index).forEach((cell, i) => {
      fieldData[i] = { ...cell };
    });
    setGameMode(() => { return { mode: "on", emoji: "unpressed", flags: numOfMines } });
  }

  function getEndGame(): GameType {
    return { mode: "over", emoji: "lose", flags: numOfMines };
  }

  useEffect(() => {
    console.log("Received Click:", clickInfo);
    if (
      !isValidIndex(clickInfo.index) ||
      !field[clickInfo.index].closed ||
      gameMode.mode === "over"
    )
      return;
    let nextField: CellDataType[] = [...field];
    if (gameMode.mode === "default" && clickInfo.type === "left") {
      startGame(nextField, clickInfo);
    } else {
      updateField(nextField, clickInfo.index, clickInfo.type);
    }

    setFlags(
      [...Array(size * size).keys()].filter(
        (i) => nextField[i].type === "closed flag"
      )
    );

    setField(() => nextField);
  }, [clickInfo]);

  useEffect(() => {
    setGameMode((prev) => {
      return {
        mode: prev.mode,
        emoji: prev.emoji,
        flags: numOfMines - flags.length,
      };
    });
  }, [field]);

  useMemo(() => console.log("Game State:", gameMode), [gameMode]);

  return useMemo(() => {
    return (
      <div className="w-ms-field-size-16x16 h-ms-field-size-16x16 bg-ms-gray grid grid-cols-16">
        {field.map((cell, i) => (
          <CellComponent
            cell={cell}
            index={i}
            handleClick={handleClick}
            clickable={gameMode.mode !== "over"}
            key={i}
          />
        ))}
      </div>
    );
  }, [field]);
}
