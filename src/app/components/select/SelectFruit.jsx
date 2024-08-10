import React, { useEffect, useState } from 'react';

const SelectFruit = () => {
  const [selectValue, setSelectValue] = useState("");
  const onChange = (event) => {
    const value = event.target.value;
    setSelectValue(value);
  };
  return (
    <div>
      <h2>React SelectFruit
       onChange Example</h2>
      <select onChange={onChange} className="form-select">
        <option defaultValue disabled>
          Select Fruit
        </option>
        <option value="option1">Banana</option>
        <option value="option2">Apple</option>
        <option value="option3">Orange</option>
      </select>
      {selectValue && <h2 className="mt-3">{selectValue}</h2>}
    </div>
  );
};
export default SelectFruit;