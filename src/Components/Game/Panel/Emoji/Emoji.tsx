import React from "react";

import activeEmoji from "../../../../assets/face_active.svg";
import loseEmoji from "../../../../assets/face_lose.svg";
import pressedEmoji from "../../../../assets/face_pressed.svg";
import unpressedEmoji from "../../../../assets/face_unpressed.svg";
import winEmoji from "../../../../assets/face_win.svg";

import { EmojiType } from "../../../../Types/Emoji";

type Props = {
  emoji: EmojiType;
  handleClick: () => void;
  handleDown: (e: React.PointerEvent) => void;
};

export default function EmojiComponent({ emoji, handleClick, handleDown }: Props) {
  let currentEmoji = "";

  switch (emoji) {
    case "active":
      currentEmoji = activeEmoji;
      break;
    case "lose":
      currentEmoji = loseEmoji;
      break;
    case "pressed":
      currentEmoji = pressedEmoji;
      break;
    case "unpressed":
      currentEmoji = unpressedEmoji;
      break;
    case "win":
      currentEmoji = winEmoji;
      break;
  }

  return (
    <div className="h-ms-counter" onClick={handleClick} onPointerDown={handleDown}>
      <img src={currentEmoji} className="h-full"></img>
    </div>
  );
}
