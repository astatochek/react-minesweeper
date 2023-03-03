import React from "react";

import cornerUpLeft from "../../../assets/corner_up_left_2x.png";
import cornerUpRight from "../../../assets/corner_up_right_2x.png";
import borderHorizontal from "../../../assets/border_hor_2x.png";

type Props = { width: string };

export default function TopComponent({ width }: Props) {
  return (
    <div className="flex flex-row justify-start h-ms-22">
      <div className="w-ms-24 h-full">
        <img src={cornerUpLeft}></img>
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
        <img src={cornerUpRight}></img>
      </div>
    </div>
  );
}
