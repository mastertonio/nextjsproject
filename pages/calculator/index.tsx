import React, { useState } from "react";
import { sheet } from "app/util/js/calculator";

const cells = [{
  address: 'A1',
  forcedValue: '',
  format: '0,0',
  formula: null,
  label: 'This is the first input',
  value: 10,
},{
  address: 'A2',
  forcedValue: '',
  format: '0,0%',
  formula: null,
  label: 'This is the second input',
  value: 30,
},{
  address: 'A3',
  forcedValue: '',
  format: '$0,0',
  formula: 'A1 * A2 * 45.8',
  label: 'This is the first calculation',
  value: 10,
},{
  address: 'A4',
  forcedValue: '',
  format: '',
  formula: 'SUM(45,56,23,11)',
  label: 'This is the first calculation',
  value: 10,
},{
  address: 'A5',
  forcedValue: '',
  format: '',
  formula: 'SUM(A1, A3, A4)',
  label: 'This is the first calculation',
  value: 10,
},{
  address: 'A6',
  forcedValue: '',
  format: '',
  formula: 'A5 * 10',
  label: 'This is the first calculation',
  value: 10,
}]

  let calculator = new sheet(cells);

const AdminBuilder = () => {
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    console.log(calculator);
  };

  return (
    <div>
      <button onClick={handleCalculate}>Calculate</button>
    </div>
  );
};

export default AdminBuilder;