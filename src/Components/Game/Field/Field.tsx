import React, { useState, useContext, useMemo, useEffect, useRef } from "react";
import ClickContext from "../../../Context/Click";
import { CellType } from "../../../Types/Cell";
import { CellDataType } from "../../../Types/CellData";
import CellComponent from "./Cell/Cell";
import { ClickInfoType } from "../../../Types/ClickContext";
import { GameType } from "../../../Types/Game";
import GameContext from "../../../Context/Game";

type Props = {
  size: number;
  numOfMines: number;
};

export default function FieldComponent({ size, numOfMines }: Props) {

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

  function openAllMines(fieldData: CellDataType[], clickedMineIndex: number) {
    [...fieldData].forEach((cell, i) => {
      if (cell.hasMine) {
        fieldData[i] = {
          type: "mine",
          hasMine: true,
          minesNear: 0,
          closed: false,
        };
      } else if (cell.type === "closed flag") {
        fieldData[i] = {
          type: "mine wrong",
          hasMine: false,
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

  function openShiftedCells(fieldData: CellDataType[], cellIndex: number) {
    if (fieldData[cellIndex].type === "closed flag") {
    }

    const shifts = getShift(cellIndex);

    let flagsNear = 0;

    shifts.forEach((shift) => {
      if (fieldData[cellIndex + shift].type === "closed flag") {
        flagsNear++;
      }
    });

    if (flagsNear < fieldData[cellIndex].minesNear) {
      return;
    }

    let mineIndex = -1;
    shifts.forEach((shift) => {
      const cell = fieldData[cellIndex + shift];
      if (cell.type !== "closed flag") {
        if (cell.hasMine) {
          mineIndex = cellIndex + shift;
        } else if (cell.minesNear === 0) {
          openNearCells(fieldData, cellIndex + shift);
        }  else {
          fieldData[cellIndex + shift] = {
            ...cell,
            closed: false,
            type: `type ${cell.minesNear}`,
          };
        }
      }
    });

    if (mineIndex !== -1) {
      openAllMines(fieldData, mineIndex);
      setGameMode(getEndGame(fieldData));
    }
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
        setGameMode(getEndGame(fieldData));
      } else if (!cell.closed) {
        openShiftedCells(fieldData, index);
      } else {
        openNearCells(fieldData, index);
      }
    } else if (type === "right") {
      let nextCell = { ...cell };
      if (cell.type === "closed flag") {
        nextCell.type = "closed";
        fieldData[index] = nextCell;
      } else if (cell.type === "closed" && flags.length < numOfMines) {
        nextCell.type = "closed flag";
        fieldData[index] = nextCell;
      }
    }
  }

  function initializeField(firstClickIndex: number): CellDataType[] {
    const mineIndices = getMineIndices(numOfMines, firstClickIndex);

    let initialField: CellDataType[] = new Array(size * size)
      .fill(null)
      .map(() => {
        return { type: "closed", hasMine: false, minesNear: 0, closed: true };
      });

    mineIndices.forEach((index) => {
      // field[index].type = "mine";
      initialField[index].hasMine = true;

      const availableShifts = getShift(index);

      availableShifts.forEach((shift) => {
        if (!initialField[index + shift].hasMine) {
          initialField[index + shift].minesNear++;
        }
      });
    });

    openNearCells(initialField, firstClickIndex);

    return initialField;
  }

  function calcFlags(nextField: CellDataType[]) {
    return [...Array(size * size).keys()].filter(
      (i) =>
        nextField[i].type === "closed flag" ||
        nextField[i].type === "mine wrong"
    )
  }

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
    setGameMode(() => {
      return { mode: "on", emoji: "unpressed", flags: numOfMines };
    });
  }

  function getEndGame(fieldData: CellDataType[]): GameType {
    return { mode: "over", emoji: "lose", flags: numOfMines - calcFlags(fieldData).length };
  }

  useEffect(() => {
    console.log("Received Click:", clickInfo);
    if (!isValidIndex(clickInfo.index) || gameMode.mode === "over") return;
    let nextField: CellDataType[] = [...field];
    if (gameMode.mode === "default" && clickInfo.type === "left") {
      startGame(nextField, clickInfo);
    } else if (gameMode.mode === "on") {
      updateField(nextField, clickInfo.index, clickInfo.type);
    }

    setFlags(calcFlags(nextField));

    setField(() => nextField);
  }, [clickInfo]);

  useEffect(() => {
    if (gameMode.mode !== "on") return;
    if (
      field.every(
        (cell) =>
          (cell.hasMine && cell.closed) || (!cell.hasMine && !cell.closed)
      )
    ) {
      setGameMode(() => {
        return {
          mode: "over",
          emoji: "win",
          flags: numOfMines - flags.length,
        };
      });
    } else {
      setGameMode((prev) => {
        return {
          ...prev,
          emoji: prev.emoji === "active" ? "unpressed" : prev.emoji,
          flags: numOfMines - flags.length,
        };
      });
    }
  }, [field]);

  useMemo(() => console.log("Game State:", gameMode), [gameMode]);

  useMemo(() => {
    if (gameMode.mode === "default") {
      setField(() =>
        new Array(size * size).fill(null).map(() => {
          return { type: "closed", hasMine: false, minesNear: 0, closed: true };
        })
      );
    }
  }, [gameMode.mode]);

  return useMemo(() => {
    return (
      <div className="w-ms-field-size-16x16 h-ms-field-size-16x16 bg-ms-gray grid grid-cols-16">
        {field.map((cell, i) => (
          <CellComponent
            cell={cell}
            index={i}
            handleClick={handleClick}
            key={i}
          />
        ))}
      </div>
    );
  }, [field]);
}
