import React from "react";

const Dropdown = (props) => {
  const dropdownChange = (e) => {
    props.changed(e.target.value);
  };

  return (
    <div>
      <select value={props.selectedValue} onChange={dropdownChange}>
        {props.options.map((item, idx) => (
          <option key={idx} value={idx}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
