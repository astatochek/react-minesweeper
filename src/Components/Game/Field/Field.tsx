import React, { useState, useContext, useMemo, useEffect } from "react";
import ClickContext from "../../../Context/Click";
import { CellType } from "../../../Types/Cell";
import { CellDataType } from "../../../Types/CellData";
import CellComponent from "./Cell/Cell";
import { ClickInfoType } from "../../../Types/ClickContext";

export default function FieldComponent() {
  const size = 16;
  const numOfMines = 40;

  const { clickInfo, setClickInfo } = useContext(ClickContext);

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
    else if (index === size * (size - 1) - 1) return shifts.bottomLeft;
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

  function openedMine(cell: CellDataType): CellDataType {
    if (!cell.hasMine || !cell.closed) return cell;
    return {
      type: "mine",
      hasMine: cell.hasMine,
      minesNear: cell.minesNear,
      closed: false,
    };
  }

  function updateField(fieldData: CellDataType[], index: number) {
    if (fieldData[index].hasMine) {
      fieldData[index] = openedMine(fieldData[index]);
    } else {
      openNearCells(fieldData, index);
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

    // field.forEach((cell) => {
    //   if (!cell.hasMine) {
    //     cell.type = `type ${cell.minesNear}`;
    //   }
    // });

    return field;
  }

  const [field, setField] = useState<CellDataType[]>(initializeField(0));

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

  function getRandomCellType(): CellType {
    return availableCellTypes[
      Math.floor(Math.random() * availableCellTypes.length)
    ];
  }

  function handleLeftClick(index: number) {
    setClickInfo((prevClickInfo) => {
      const thisClickInfo: ClickInfoType = {
        id: prevClickInfo.id + 1,
        index: index,
        type: "left",
      };
      return thisClickInfo;
    });
  }

  useEffect(() => {
    console.log("Received Click:", clickInfo);
    if (!isValidIndex(clickInfo.index) || !field[clickInfo.index].closed) return;
    if (clickInfo.type === "left") {
      setField((prevField) => {
        const nextField = [...prevField];
        updateField(nextField, clickInfo.index);
        return nextField;
      });
    }
  }, [clickInfo]);

  return useMemo(() => {
    return (
      <div className="w-ms-field-size-16x16 h-ms-field-size-16x16 bg-ms-gray grid grid-cols-16">
        {field.map((cell, i) => (
          <CellComponent
            cell={cell}
            index={i}
            handleLeftClick={handleLeftClick}
            key={i}
          />
        ))}
      </div>
    );
  }, [field]);
}
