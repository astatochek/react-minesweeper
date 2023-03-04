import React, { useState } from "react";

type Props = {
  title: string;
  min: number;
  max: number;
  current: number;
  handler: (val: number) => void;
};

export function RangeComponent({ title, min, max, current, handler }: Props) {
  function handleChange(e: React.BaseSyntheticEvent) {
    handler(e.target.value);
  }

  return (
    <>
      <label htmlFor={title} className="block mb-2 text-sm font-medium">
        { title }
      </label>
      <input
        type="range"
        id={title}
        onChange={handleChange}
        min={min}
        max={max}
        step={1}
        value={current}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
      ></input>
    </>
  );
}
