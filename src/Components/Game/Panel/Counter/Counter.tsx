import React from "react";

import zero from "./../../../../assets/d0.svg";
import one from "./../../../../assets/d1.svg";
import two from "./../../../../assets/d2.svg";
import three from "./../../../../assets/d3.svg";
import four from "./../../../../assets/d4.svg";
import five from "./../../../../assets/d5.svg";
import six from "./../../../../assets/d6.svg";
import seven from "./../../../../assets/d7.svg";
import eight from "./../../../../assets/d8.svg";
import nine from "./../../../../assets/d9.svg";

import background from "./../../../../assets/nums_background.svg";

type Props = {
  numberToDisplay: number;
};

export default function CounterComponent({ numberToDisplay }: Props) {
  const images = [zero, one, two, three, four, five, six, seven, eight, nine];

  let stringifiedNumber = `${numberToDisplay}`;
  while (stringifiedNumber.length < 3) {
    stringifiedNumber = `0${stringifiedNumber}`;
  }

  if (stringifiedNumber.length > 3) {
    console.error(
      `Number must have no more than 3 digits, but provided ${numberToDisplay} has ${stringifiedNumber.length}!`
    );
    return <></>;
  }

  const imagesToDisplay = Array(3)
    .fill(null)
    .map((elem, i) => images[Number(stringifiedNumber[i])]);

  return (
    <div className="h-ms-counter px-[0.08rem]">
      <div className="h-ms-counter z-10">
        <img src={background} className="h-full"></img>
      </div>
      <div className="relative left-0 -top-ms-counter flex flex-row justify-start items-center">
        {imagesToDisplay.map((image, i) => (
          <div key={i} className="h-ms-number z-0 py-[0.186rem] pl-[0.16rem]">
            <img key={i} src={image} className="h-full"></img>
          </div>
        ))}
      </div>
    </div>
  );
}
