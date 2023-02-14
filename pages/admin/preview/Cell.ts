import { useState } from 'react';
import { Event } from './Cell/Event';
import { DataType } from './Cell/DataType';
import { ErrorType } from './Cell/ErrorType';
import { FormatterInterface } from './Cell/Formatter';

interface CellProps {
  sheet: any; // replace any with a more specific type if possible
  address: string;
}

export default function Cell(props: CellProps) {
  const [value, setValue] = useState<any>(null);
  const [formula, setFormula] = useState<string | null>(null);
  const [computed, setComputed] = useState<any>(null);
  const [precedents, setPrecedents] = useState<any>({});
  const [dependents, setDependents] = useState<any>({});
  const [affected, setAffected] = useState<boolean>(false);
  const [calculated, setCalculated] = useState<boolean>(false);
  const [hasDynamicPrecedents, setHasDynamicPrecedents] = useState<boolean>(false);
  const [format, setFormat] = useState<string | null>(null);
  const [formatter, setFormatter] = useState<FormatterInterface | null>(null);

  const init = () => {};

  const mount = (el: HTMLElement) => {};

  const isError = () => {
    return Object.values(ErrorType).includes(value as ErrorType);
  };

  const isEmpty = () => {};

  const isCalculated = () => {
    return calculated;
  };

  const isAffected = () => {
    return affected;
  };

  const isNumeric = () => {
    return !isNaN(value - parseFloat(value));
  };

  const setAddress = (address: string) => {
    const rule = /^[A-Z]+[0-9]+$/;

    if (address.match(rule)) {
      setPrecedents({});
      setDependents({});
      setAffected(false);
      setCalculated(false);
      setHasDynamicPrecedents(false);

      return address;
    }

    throw new Error('Cell address should follow spreadsheet like address rule');
  };

  const setCellFormula = (formula: string) => {
    const oldFormula = formula;
    setFormula(formula);
    props.sheet.dispatcher.dispatch(Event.FORMULA_CHANGED, {
      cell: props.address,
      oldFormula: oldFormula,
      newFormula: formula,
    });
  };

  const setCellValue = (value: any) => {
    setValue(value);
    setFormula(null);
    props.sheet.dispatcher.dispatch(Event.VALUE_CHANGED, { cell: props.address, value: value });
  };

  return null;
}
