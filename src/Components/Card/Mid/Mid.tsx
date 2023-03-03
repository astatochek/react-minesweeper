import React from "react";

import borderVertical from "../../../assets/border_vert_2x.png";

type Props = {
  width: string;
  height: string;
  children: string | JSX.Element | JSX.Element[];
};

export default function MidComponent({ width, height, children }: Props) {
  return (
    <div className="flex flex-row justify-start">
      <div
        className="w-ms-24"
        style={{
          backgroundImage: `url(${borderVertical})`,
          backgroundSize: "100% 100%",
          height: height,
        }}
      />
      <div style={{ width: width }}>{children}</div>
      <div
        className="w-ms-24 h"
        style={{
          backgroundImage: `url(${borderVertical})`,
          backgroundSize: "100% 100%",
          height: height,
        }}
      />
    </div>
  );
}
