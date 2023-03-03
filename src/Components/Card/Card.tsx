import React from "react";

import TopComponent from "./Top/Top";
import MidComponent from "./Mid/Mid";
import BotComponent from "./Bot/Bot";

type Props = {
  width: string;
  height: string;
  children: string | JSX.Element | JSX.Element[];
};

export default function CardComponent({ width, height, children }: Props) {
  return (
    <div className="flex flex-col justify-start items-center select-none">
        <TopComponent width={width}/>
        <MidComponent height={height} width={width} children={children}/>
        <BotComponent width={width}/>
    </div>
  );
}
