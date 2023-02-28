import React from "react";

import PanelComponent from "./Panel/Panel";

import cornerUpLeft from "./../../assets/corner_up_left_2x.png";
import cornerUpRight from "./../../assets/corner_up_right_2x.png";
import borderHorizontal from "./../../assets/border_hor_2x.png";
import borderVertical from "./../../assets/border_vert_2x.png";
import cornerMidLeft from "./../../assets/t_left_2x.png";
import cornerMidRight from "./../../assets/t_right_2x.png";
import cornerBottomLeft from "./../../assets/corner_bottom-left-2x.png";
import cornerBottomRigth from "./../../assets/corner_bottom-right-2x.png";

export default function GameComponent() {
  return (
    <>
      <div className="flex flex-col justify-start items-center">
        {/* TOP BORDER */}
        <div className="flex flex-row justify-start h-ms-22">
          <div className="w-ms-24 h-full">
            <img src={cornerUpLeft}></img>
          </div>
          <div
            className="h-full w-ms-field-size"
            style={{ backgroundImage: `url(${borderHorizontal})`, backgroundSize: '100% 100%' }}
          />
          <div className="w-ms-24 h-full">
            <img src={cornerUpRight}></img>
          </div>
        </div>
        {/* INFO PANEL */}
        <div className="flex flex-row justify-start">
          <div
            className="w-ms-24 h-ms-panel"
            style={{ backgroundImage: `url(${borderVertical})`, backgroundSize: '100% 100%' }}
          />
          <PanelComponent />
          <div
            className="w-ms-24 h-panel"
            style={{ backgroundImage: `url(${borderVertical})`, backgroundSize: '100% 100%' }}
          />
        </div>
        {/* MID BORDER */}
        <div className="flex flex-row h-ms-22 justify-start">
          <div className="w-ms-24 h-full">
            <img src={cornerMidLeft}></img>
          </div>
          <div
            className="h-full w-ms-field-size"
            style={{ backgroundImage: `url(${borderHorizontal})`, backgroundSize: '100% 100%' }}
          />
          <div className="w-ms-24 h-full">
            <img src={cornerMidRight}></img>
          </div>
        </div>
        {/* FIELD */}
        <div className="h-ms-field-size flex flex-row justify-start">
          <div
            className="w-ms-24 h-ms-field-size"
            style={{ backgroundImage: `url(${borderVertical})`, backgroundSize: '100% 100%' }}
          />
          <div className="w-ms-field-size h-ms-field-size bg-ms-gray">
            {/* 40 x 40 ITEMS */}
          </div>
          <div
            className="w-ms-24 h-ms-field-size"
            style={{ backgroundImage: `url(${borderVertical})`, backgroundSize: '100% 100%' }}
          />
        </div>
        {/* BOTTOM BORDER */}
        <div className="flex flex-row justify-start h-ms-22">
          <div className="w-ms-24 h-full">
            <img src={cornerBottomLeft}></img>
          </div>
          <div
            className="h-full w-ms-field-size"
            style={{ backgroundImage: `url(${borderHorizontal})`, backgroundSize: '100% 100%' }}
          />
          <div className="w-ms-24 h-full">
            <img src={cornerBottomRigth}></img>
          </div>
        </div>
      </div>
    </>
  );
}
