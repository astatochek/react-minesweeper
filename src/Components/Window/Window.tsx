import React from "react";
import GameComponent from "../Game/Game";

export default function WindowComponent() {
  return (
    <div className="relative top-0 left-0 w-full flex flex-col justify-start items-center p-14">
        <div className="mb-14 text-3xl text-center font-bold underline">
            <h1>Cool Title</h1>
        </div>
        <div className="flex flex-col sm:flex-row">
            <GameComponent />
        </div>
    </div>
  );
}
