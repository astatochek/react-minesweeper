import React, { useContext, useState, useEffect } from "react";

import PanelComponent from "./Panel/Panel";

import borderHorizontal from "./../../assets/border_hor_2x.png";
import borderVertical from "./../../assets/border_vert_2x.png";
import cornerMidLeft from "./../../assets/t_left_2x.png";
import cornerMidRight from "./../../assets/t_right_2x.png";
import FieldComponent from "./Field/Field";
import { ClickInfoType } from "../../Types/ClickContext";
import ClickContext from "../../Context/Click";
import { GameType } from "../../Types/Game";
import GameContext from "../../Context/Game";
import TopComponent from "../Card/Top/Top";
import BotComponent from "../Card/Bot/Bot";

type Props = {
  cellSize: number;
  size: number;
  numOfMines: number;
};

export default function GameComponent({ cellSize, size, numOfMines }: Props) {
  const [clickInfo, setClickInfo] = useState<ClickInfoType>({
    id: 0,
    index: -1,
    type: "left",
  });

  const [gameMode, setGameMode] = useState<GameType>({
    mode: "default",
    emoji: "unpressed",
    flags: numOfMines,
  });

  useEffect(() => {
    setGameMode({
      mode: "default",
      emoji: "unpressed",
      flags: numOfMines,
    });
  }, [numOfMines]);

  return (
    <>
      <ClickContext.Provider value={{ clickInfo, setClickInfo }}>
        <GameContext.Provider value={{ gameMode, setGameMode }}>
          <div className="flex flex-col justify-start items-center select-none">
            {/* TOP BORDER */}
            <TopComponent width={`${size * cellSize}rem`} />
            {/* INFO PANEL */}
            <div className="flex flex-row justify-start">
              <div
                className="w-ms-24 h-ms-panel"
                style={{
                  backgroundImage: `url(${borderVertical})`,
                  backgroundSize: "100% 100%",
                }}
              />
              <PanelComponent
                width={`${size * cellSize}rem`}
                initialFlags={numOfMines}
              />
              <div
                className="w-ms-24 h-panel"
                style={{
                  backgroundImage: `url(${borderVertical})`,
                  backgroundSize: "100% 100%",
                }}
              />
            </div>
            {/* MID BORDER */}
            <div className="flex flex-row h-ms-22 justify-start">
              <div className="w-ms-24 h-full">
                <img src={cornerMidLeft}></img>
              </div>
              <div
                className="h-full"
                style={{
                  backgroundImage: `url(${borderHorizontal})`,
                  backgroundSize: "100% 100%",
                  width: `${cellSize * size}rem`,
                }}
              />
              <div className="w-ms-24 h-full">
                <img src={cornerMidRight}></img>
              </div>
            </div>
            {/* FIELD */}
            <div className="flex flex-row justify-start">
              <div
                className="w-ms-24 h-ms-field-size-16x16"
                style={{
                  backgroundImage: `url(${borderVertical})`,
                  backgroundSize: "100% 100%",
                  height: `${cellSize * size}rem`,
                }}
              />
              <FieldComponent
                sizeRem={`${size * cellSize}rem`}
                size={size}
                numOfMines={numOfMines}
              />
              <div
                className="w-ms-24"
                style={{
                  backgroundImage: `url(${borderVertical})`,
                  backgroundSize: "100% 100%",
                  height: `${cellSize * size}rem`,
                }}
              />
            </div>
            {/* BOTTOM BORDER */}
            <BotComponent width={`${cellSize * size}rem`} />
          </div>
        </GameContext.Provider>
      </ClickContext.Provider>
    </>
  );
}
