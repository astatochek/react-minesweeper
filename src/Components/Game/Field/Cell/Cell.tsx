import React, { useContext, useEffect, useMemo, useState } from "react";

import closed from "../../../../assets/closed.svg";
import closedFlag from "../../../../assets/closed_flag.svg";
import flag from "../../../../assets/flag.svg";
import mine from "../../../../assets/mine.svg";
import mineRed from "../../../../assets/mine_red.svg";
import mineWrong from "../../../../assets/mine_wrong.svg";
import pressed from "../../../../assets/pressed.svg";
import question from "../../../../assets/question.svg";
import type0 from "../../../../assets/type0.svg";
import type1 from "../../../../assets/type1.svg";
import type2 from "../../../../assets/type2.svg";
import type3 from "../../../../assets/type3.svg";
import type4 from "../../../../assets/type4.svg";
import type5 from "../../../../assets/type5.svg";
import type6 from "../../../../assets/type6.svg";
import type7 from "../../../../assets/type7.svg";
import type8 from "../../../../assets/type8.svg";
import GameContext from "../../../../Context/Game";

import { CellType } from "../../../../Types/Cell";
import { CellDataType } from "../../../../Types/CellData";

type Props = {
  cell: CellDataType;
  index: number;
  handleClick: (index: number, type: "left" | "right") => void;
};

export default function CellComponent({ cell, index, handleClick }: Props) {
  const [type, setType] = useState<CellType>("closed");

  useEffect(() => {
    setType(() => cell.type);
  }, [cell]);

  const { gameMode, setGameMode } = useContext(GameContext);

  const [clickable, setClickable] = useState(gameMode.mode !== "over");

  useMemo(() => setClickable(gameMode.mode !== "over"), [gameMode.mode]);

  function getImageSource(thisType: CellType): string {
    switch (thisType) {
      case "closed":
        return closed;
      case "closed flag":
        return closedFlag;
      case "flag":
        return flag;
      case "mine":
        return mine;
      case "mine red":
        return mineRed;
      case "mine wrong":
        return mineWrong;
      case "pressed":
        return pressed;
      case "question":
        return question;
      case "type 0":
        return type0;
      case "type 1":
        return type1;
      case "type 2":
        return type2;
      case "type 3":
        return type3;
      case "type 4":
        return type4;
      case "type 5":
        return type5;
      case "type 6":
        return type6;
      case "type 7":
        return type7;
      case "type 8":
        return type8;
      default:
        return type0;
    }
  }

  function handlePointerDown(event: React.PointerEvent) {
    if (!cell.closed) return;
    switch (event.button) {
      case 0:
        setType(() => "pressed");
        setGameMode((prev) => {
          return {
            ...prev,
            emoji: "active",
          };
        });
        break;
      case 2:
        if (type === "flag") {
          setType(() => "question");
          setTimeout(() => {
            setType((prev) => {
              if (prev === "question") {
                return "flag";
              }
              return prev;
            })
          }, 1000);
        } else {
          handleClick(index, "right");
        }
        break;
    }
  }

  function handleClickEvent() {
    if (cell.type !== "flag") {
      handleClick(index, "left");
    }
  }

  function handlePointerOut() {
    if (cell.closed && type === "pressed") {
      setType(() => cell.type);
      setGameMode((prev) => {
        return {
          ...prev,
          emoji: "unpressed",
        };
      });
    }
  }

  return (
    <div
      className="h-ms-cell"
      onClick={clickable ? handleClickEvent : undefined}
      onPointerDown={clickable ? handlePointerDown : undefined}
      onPointerOut={handlePointerOut}
    >
      <img className="h-full" src={getImageSource(type)}></img>
    </div>
  );
}
