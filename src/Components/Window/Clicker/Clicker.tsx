import React, { useState } from "react";

import minusPressed from "../../../assets/minus_pressed.svg";
import minusUnpressed from "../../../assets/minus_unpressed.svg";
import plusPressed from "../../../assets/plus_pressed.svg";
import plusUnpressed from "../../../assets/plus_unpressed.svg";

type Props = {
  title: string;
  value: number;
  handlePlusClick: () => void;
  handleMinusClick: () => void;
};

type Buttons = {
  minus: "pressed" | "unpressed";
  plus: "pressed" | "unpressed";
};

export default function ClickerComponent({
  title,
  value,
  handlePlusClick,
  handleMinusClick,
}: Props) {
  const [buttonState, setButtonState] = useState<Buttons>({
    minus: "unpressed",
    plus: "unpressed",
  });

  function getMinusSource(state: Buttons) {
    switch (state.minus) {
      case "pressed":
        return minusPressed;
      case "unpressed":
        return minusUnpressed;
    }
  }

  function getPlusSource(state: Buttons) {
    switch (state.plus) {
      case "pressed":
        return plusPressed;
      case "unpressed":
        return plusUnpressed;
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <button
          className="h-6 w-6 ml-1"
          onPointerDown={() =>
            setButtonState((prev) => {
              return {
                ...prev,
                minus: "pressed",
              };
            })
          }
          onClick={() => {
            setButtonState((prev) => {
              return {
                ...prev,
                minus: "unpressed",
              };
            });
            handleMinusClick();
          }}
        >
          <img src={getMinusSource(buttonState)} className="w-full"></img>
        </button>
        <div><p className="font-semibold">{value}</p></div>
        <button
          className="h-6 w-6 mr-1"
          onPointerDown={() =>
            setButtonState((prev) => {
              return {
                ...prev,
                plus: "pressed",
              };
            })
          }
          onClick={() => {
            setButtonState((prev) => {
              return {
                ...prev,
                plus: "unpressed",
              };
            });
            handlePlusClick();
          }}
        >
          <img src={getPlusSource(buttonState)} className="w-full"></img>
        </button>
      </div>
    </div>
  );
}
