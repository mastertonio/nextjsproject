import { useState, useEffect, FC } from 'react';
import { Event } from './Cell/Event';
import { DataType } from './Cell/DataType';
import { ErrorType } from './Cell/ErrorType';
import { FormatterInterface } from './Cell/Formatter';
import { SheetProps } from './Sheet';

export type CellProps = {
  address: string;
  sheet: SheetProps;
  type?: string;
};

const Cell = ({ address, sheet, type = DataType.TEXT }: CellProps) => {
  const [value, setValue] = useState<any>();
  const [formula, setFormula] = useState<string>();
  const [computed, setComputed] = useState<any>();
  const [precedents, setPrecedents] = useState<Record<string, CellProps>>({});
  const [dependents, setDependents] = useState<Record<string, CellProps>>({});
  const [affected, setAffected] = useState<boolean>(false);
  const [calculated, setCalculated] = useState<boolean>(false);
  const [hasDynamicPrecedents, setHasDynamicPrecedents] = useState<boolean>(false);
  const [format, setFormat] = useState<string>();
  const [formatter, setFormatter] = useState<FormatterInterface>();
  const [el, setEl] = useState<HTMLElement>();
// change to zustand @jom @son
  const isError = () => {
    return Object.values(ErrorType).includes(value as ErrorType);
  };
// change to zustand @jom @son
  const isEmpty = () => {
    // Implement this function
  };
// change to zustand @jom @son
  const isNumeric = () => {
    return !isNaN(value - parseFloat(value));
  };
// change to zustand @jom @son
  const getAddress = () => {
    return address;
  };
// change to zustand @jom @son
  const setAddress = (newAddress: string) => {
    const rule = /^[A-Z]+[0-9]+$/;

    if (newAddress.match(rule)) {
      // Update address state
    } else {
      throw new Error("Cell address should follow spreadsheet like address rule");
    }
  };
// change to zustand @jom @son
  const setCellValue = (newValue: any) => {
    setValue(newValue);
    setFormula(undefined);
    sheet.dispatcher.dispatch(Event.VALUE_CHANGED, { cell: address, value: newValue });
  };
// change to zustand @jom @son
  const setCellFormula = (newFormula: string) => {
    const oldFormula = formula;
    setFormula(newFormula);

    sheet.dispatcher.dispatch(Event.FORMULA_CHANGED, {
      cell: address,
      oldFormula: oldFormula,
      newFormula: newFormula,
    });
  };
// change to zustand @jom @son
  const isCalculated = () => {
    return calculated;
  };
// change to zustand @jom @son
  const isAffected = () => {
    return affected;
  };
// change to zustand @jom @son
  const init = () => {
    // Implement this function
  };
// change to zustand @jom @son
  const mount = (el: HTMLElement) => {
    setEl(el);
  };
// change to zustand @jom @son
  const cell = {
    get value() {
      return formula ? computed : value;
    },
    set value(newValue: any) {
      setCellValue(newValue);
    },
    get formula() {
      return formula;
    },
    set formula(newFormula: string) {
      setCellFormula(newFormula);
    },
    get address() {
      return getAddress();
    },
    set address(newAddress: string) {
      setAddress(newAddress);
    },
    init,
    mount,
    isError,
    isEmpty,
    isCalculated,
    isAffected,
    isNumeric,
  };

  return null; // Return the JSX for the cell component
};


export default Cell;
