import React from "react";
import CellComponent from "./Cell/Cell";

export default function FieldComponent() {
  const field = new Array(16 * 16).fill(null).map(() => {
    return { type: "idle" };
  });

  console.log(field);

  return (
    <div className="w-ms-field-size-16x16 h-ms-field-size-16x16 bg-ms-gray grid grid-cols-16">
      {field.map(({ type }, i) => (
        <CellComponent type={type} key={i}/>
      ))}
    </div>
  );
}
