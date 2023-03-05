import React, { useEffect, useState } from "react";

type Props = {
  title: string;
  min: number;
  max: number;
  current: number;
  handler: (val: number) => void;
  width: number;
};

export default function RangeComponent({
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

  const [value, setValue] = useState(current);

  useEffect(() => setValue(current), [current])

  function handleNewInput(e: React.BaseSyntheticEvent) {

    const newValue = Number(e.target.value);
    
    if (Math.floor(newValue) === newValue && newValue >= min && newValue <= max) {
      handler(newValue);
    } else {
      setValue(e.target.value);
    }
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

  function inputNumber(width: string) {
    return (
      <input
        type="number"
        pattern="[0-9]*"
        min={min}
        max={max}
        value={`${value}`}
        onChange={handleNewInput}
        onBlur={() => setValue(current)}
        className="!outline-none bg-transparent focus:bg-transparent"
        style={{ width: width }}
      ></input>
    );
  }

  return (
    <>
      {width > 9 ? (
        <div
          className="flex flex-row justify-between items-center"
          style={{ width: `${width}rem` }}
        >
          <div className="windows-xp__btn-wrap px-1 py-0">{title}</div>
          {inputRange()}
          <div className="windows-xp__btn-wrap px-1 py-0">{inputNumber("2.5rem")}</div>
        </div>
      ) : (
        <div
          className="flex flex-col justify-between items-center h-8"
          style={{ width: `${width}rem` }}
        >
          <div className="windows-xp__btn-wrap px-1 py-0 text-[0.6rem]">
            {`${title}:`} &nbsp; {inputNumber("2rem")}
          </div>
          {inputRange()}
        </div>
      )}
    </>
  );
}
