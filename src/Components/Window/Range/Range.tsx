import React, { useState } from "react";

type Props = {
  title: string;
  min: number;
  max: number;
  current: number;
  handler: (val: number) => void;
  width: number;
};

export function RangeComponent({
  title,
  min,
  max,
  current,
  handler,
  width,
}: Props) {
  function handleChange(e: React.BaseSyntheticEvent) {
    handler(e.target.value);
  }

  function inputRange() {
    return (
      <div className="flex items-center justify-center w-full">
        <input
          name={title}
          type="range"
          id={title}
          onChange={handleChange}
          min={min}
          max={max}
          step={1}
          value={current}
          className="h-1 w-8/12 rounded-lg appearance-none cursor-pointer"
        ></input>
      </div>
    );
  }

  return (
    <>
      {width > 9 ? (
        <div
          className="flex flex-row justify-between items-center"
          style={{ width: `${width}rem` }}
        >
          <div className="windows-xp-btn-wrap px-1 py-0">
            {title}
          </div>
          {inputRange()}
          <div className="windows-xp-btn-wrap px-1 py-0">
            {current}
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col justify-between items-center h-8"
          style={{ width: `${width}rem` }}
        >
          <div className="windows-xp-btn-wrap px-1 py-0 text-xs">
            {`${title} : ${current}`}
          </div>
          {inputRange()}
        </div>
      )}
    </>
  );
}
