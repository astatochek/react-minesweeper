import React, { useState, useContext, useEffect, useMemo } from "react";
import GameContext from "../../../Context/Game";

import CounterComponent from "./Counter/Counter";
import EmojiComponent from "./Emoji/Emoji";

type Props = {
  width: string;
  initialFlags: number;
};

export default function PanelComponent({ width, initialFlags }: Props) {
  const { gameMode, setGameMode } = useContext(GameContext);

  const [displayedTime, setDisplayedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedTime((prev) =>
          gameMode.mode === "on" && prev < 999 ? prev + 1 : prev
        );
    }, 1000);
    return () => clearInterval(interval);
  }, [gameMode.mode]);

  useMemo(() => setDisplayedTime(() => 0), [width, initialFlags]);

  // useMemo(() => {
  //   if (displayedTime === 999) {
  //     setGameMode((prev) => {
  //       return { ...prev, mode: "over", emoji: "lose" };
  //     });
  //   }
  // }, [displayedTime]);

  function handleEmojiCLick() {
    setGameMode(() => {
      return {
        mode: "default",
        emoji: "unpressed",
        flags: initialFlags,
      };
    });
    setDisplayedTime(() => 0);
  }

  function handleEmojiPointerDown(e: React.PointerEvent) {
    if (e.button === 0) {
      setGameMode((prev) => {
        return {
          ...prev,
          emoji: "pressed",
        };
      });
    }
  }

  return (
    <div
      className="h-ms-panel bg-ms-gray p-1 flex flex-row justify-between items-center"
      style={{ width: width }}
    >
      <CounterComponent numberToDisplay={gameMode.flags} />
      <EmojiComponent
        emoji={gameMode.emoji}
        handleClick={handleEmojiCLick}
        handleDown={handleEmojiPointerDown}
      />
      <CounterComponent numberToDisplay={displayedTime} />
    </div>
  );
}
