import React from "react";

import CounterComponent from "./Counter/Counter";
import EmojiComponent from "./Emoji/Emoji";

export default function PanelComponent() {
  return (
    <div className="h-ms-panel w-ms-field-size-16x16 bg-ms-gray p-1 flex flex-row justify-between items-center">
      {/* MINES + SMILE + TIMER */}
        <CounterComponent numberToDisplay={420} />
        <EmojiComponent emoji="unpressed" />
        <CounterComponent numberToDisplay={69} />
    </div>
  );
}
