import React from "react";

import idle from "../../../../assets/closed.svg";

type Props = {
  type: string;
};

export default function CellComponent({ type }: Props) {
  return (
    <div className="h-ms-cell">
      <img className="h-full" src={idle}></img>
    </div>
  );
}
