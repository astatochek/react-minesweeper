import React from "react";

import CounterComponent from "./Counter/Counter";

export default function PanelComponent() {
  return (
    <div className="h-ms-panel w-ms-field-size bg-ms-gray p-1 flex flex-row justify-between items-center">
      {/* MINES + SMILE + TIMER */}
        <CounterComponent numberToDisplay={12} />
    </div>
  );
}
