import React, { useState, useContext, useEffect } from "react";
import GameContext from "../../../Context/Game";

import CounterComponent from "./Counter/Counter";
import EmojiComponent from "./Emoji/Emoji";

import { GameType } from "../../../Types/Game";

export default function PanelComponent() {
  const { gameMode, setGameMode } = useContext(GameContext);

  const [displayedTime, setDisplayedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameMode.mode === "on" && displayedTime < 999) {
        setDisplayedTime((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [gameMode.mode]);

  return (
    <div className="h-ms-panel w-ms-field-size-16x16 bg-ms-gray p-1 flex flex-row justify-between items-center">
      <CounterComponent numberToDisplay={gameMode.flags} />
      <EmojiComponent emoji={gameMode.emoji} />
      <CounterComponent numberToDisplay={displayedTime} />
    </div>
  );
}
