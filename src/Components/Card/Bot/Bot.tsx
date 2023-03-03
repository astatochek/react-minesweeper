import React from "react";

import cornerBottomLeft from "../../../assets/corner_bottom-left-2x.png";
import cornerBottomRight from "../../../assets/corner_bottom-right-2x.png";
import borderHorizontal from "../../../assets/border_hor_2x.png";

type Props = { width: string };

export default function BotComponent({ width }: Props) {
  return (
    <div className="flex flex-row justify-start h-ms-22">
      <div className="w-ms-24 h-full">
        <img src={cornerBottomLeft}></img>
      </div>
      <div
        className="h-full"
        style={{
          backgroundImage: `url(${borderHorizontal})`,
          backgroundSize: "100% 100%",
          width: width,
        }}
      />
      <div className="w-ms-24 h-full">
        <img src={cornerBottomRight}></img>
      </div>
    </div>
  );
}
