import React from "react";

function MonthYearPicker(props) {
  return (
    <input
      className={`input input-bordered input-primary uppercase bg-transparent 
      font-extralight h-10 ${props.className || ""}`}
      type="date"
      value={props.value}
      min="1950-01-01"
      max={new Date().toISOString().split("T")[0]}
      onChange={props.onChange}
    />
  );
}

export default MonthYearPicker;
