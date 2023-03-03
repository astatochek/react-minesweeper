import React from "react";
import CardComponent from "../Card/Card";
import GameComponent from "../Game/Game";

export default function WindowComponent() {
  return (
    <div className="relative top-0 left-0 w-full flex flex-col justify-start items-center p-14">
      <div
        className="flex flex-col sm:flex-row [&>*]:mx-4"
        onContextMenu={(e) => e.preventDefault()}
      >
        <GameComponent />
        <div className="flex flex-col justify-start items-center [&>*]:mb-4">
        <CardComponent width="20rem" height="2.5rem">
          <div className="w-full h-full text-center flex items-center justify-center">
            <h1 className="text-3xl font-bold">React-Minesweeper</h1>
          </div>
        </CardComponent>
        <CardComponent width="20rem" height="18.24rem">
         Some Text
        </CardComponent>
        </div>
      </div>
    </div>
  );
}
