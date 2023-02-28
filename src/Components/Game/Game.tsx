import React from "react";
import cornerUpLeft from "./../../assets/corner_up_left_2x.png"
import cornerUpRight from "./../../assets/corner_up_right_2x.png"
import borderHorizontal from "./../../assets/border_hor_2x.png"

export default function GameComponent() {

  return (
    <>
      <div className="w-60 h-80 bg-yellow-300 flex flex-col justify-start items-center">
        <div className="flex flex-row h-ms-22 justify-start">
            <div className="w-ms-24 h-full">
                <img src={cornerUpLeft}></img>
            </div>
            <div className="h-full w-ms-l-40" style={{ backgroundImage: `url(${borderHorizontal})` }} />
            <div className="w-ms-24 h-full">
                <img src={cornerUpRight}></img>
            </div>
        </div>
      </div>
    </>
  );
}
