import React from "react";

import activeEmoji from "../../../../assets/face_active.svg";
import loseEmoji from "../../../../assets/face_lose.svg";
import pressedEmoji from "../../../../assets/face_pressed.svg";
import unpressedEmoji from "../../../../assets/face_unpressed.svg";

import { EmojiType } from "../../../../Types/Emoji";

type Props = {
  emoji: EmojiType;
};

export default function EmojiComponent({ emoji }: Props) {
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
  }

  return (
    <div className="h-ms-counter">
      <img src={currentEmoji} className="h-full"></img>
    </div>
  );
}
