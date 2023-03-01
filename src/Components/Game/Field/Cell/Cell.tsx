import React from "react";

import closed from "../../../../assets/closed.svg";
import closedFlag from "../../../../assets/closed_flag.svg";
import flag from "../../../../assets/flag.svg";
import mine from "../../../../assets/mine.svg";
import mineRed from "../../../../assets/mine_red.svg";
import mineWrong from "../../../../assets/mine_wrong.svg";
import pressed from "../../../../assets/pressed.svg";
import type0 from "../../../../assets/type0.svg";
import type1 from "../../../../assets/type1.svg";
import type2 from "../../../../assets/type2.svg";
import type3 from "../../../../assets/type3.svg";
import type4 from "../../../../assets/type4.svg";
import type5 from "../../../../assets/type5.svg";
import type6 from "../../../../assets/type6.svg";
import type7 from "../../../../assets/type7.svg";
import type8 from "../../../../assets/type8.svg";

import { CellType } from "../../../../Types/Cell";

type Props = {
  type: CellType;
};

export default function CellComponent({ type }: Props) {
  function getImageSource(type: CellType): string {
    switch (type) {
      case "closed":
        return closed;
      case "closed flag":
        closedFlag;
      case "flag":
        return flag;
      case "mine":
        return mine;
      case "mine red":
        return mineRed;
      case "mine wrong":
        return mineWrong;
      case "pressed":
        return pressed;
      case "type 0":
        return type0;
      case "type 1":
        return type1;
      case "type 2":
        return type2;
      case "type 3":
        return type3;
      case "type 4":
        return type4;
      case "type 5":
        return type5;
      case "type 6":
        return type6;
      case "type 7":
        return type7;
      case "type 8":
        return type8;
      default:
        return type0;
    }
  }

  const src = getImageSource(type);

  return (
    <div className="h-ms-cell">
      <img className="h-full" src={src}></img>
    </div>
  );
}
