import React, { useState } from "react";
import Workbook from "./Workbook";
import Cell, { CellProps } from "./Cell";
import eventDispatcher, {
  EventDispatcherType,
} from "./Utility/EventDispatcher";
import { Event } from "./Sheet/Event";

interface WorkbookType {
  sheets: Record<
    string,
    {
      element?: HTMLElement;
      cells: Record<string, {}>;
    }
  >;
}

export interface SheetProps {
  workbook: WorkbookType;
  name: string;
  dispatcher?: EventDispatcherType;
}

const Sheet = ({
  workbook,
  name,
  dispatcher = eventDispatcher(),
}: SheetProps) => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [id, setId] = useState<string>(generateId());
  const [cells, setCells] = useState<{ [address: string]: CellProps }>({});
  const [eventPaused, setEventPaused] = useState<boolean>(false);
  const [needCalculate, setNeedCalculate] = useState<string[]>([]);
  const [needRender, setNeedRender] = useState<string[]>([]);

  function generateId() {
    return "xxxx-xxxx-xxx-xxxx".replace(/[x]/g, (c) => {
      const random = Math.floor(Math.random() * 16);
      return random.toString(16);
    });
  }

  /**
   * Set element where sheet should be mounted (optional)
   */
  // change to zustand @jom @son
  function setElement(element: HTMLElement) {
    element.setAttribute("data-calx-id", id);
    setEl(element);
    !eventPaused &&
      dispatcher.dispatch(Event.ELEMENT_ATTACHED, { sheet: this, el: element });
  }

  /**
   * Calculate the entire sheet
   *
   * @param options calculation option
   */
  function calculate({
    withoutEvent = false,
  }: { withoutEvent?: boolean } = {}) {
    if (withoutEvent) {
      pauseEvent();
    }

    resumeEvent();
  }

  /**
   * Get specified cell object
   */
  // change to zustand @jom @son
  const getCell = (address: string) => {
    if (!cells[address]) {
      // const cell = new Cell(address, this);
      const cell = new Cell(address);
      setCells({ ...cells, [address]: cell });
    }

    return cells[address];
  };

  /**
   * Evaluate the given formula.
   */
  // function evalFormula(formula: string) {
  //   workbook.parser.yy.activeSheet = this;
  //   return workbook.parser.parse(formula);
  // }
  // change to zustand @jom @son
  function evalFormula(formula: string, workbook: Workbook) {
    workbook.parser.yy.activeSheet = workbook;
    return workbook.parser.parse(formula);
  }
  // change to zustand @jom @son
  function pauseEvent() {
    setEventPaused(true);
  }
  // change to zustand @jom @son
  function resumeEvent() {
    setEventPaused(false);
  }

  /**
   * Build dependency graph for all registered cells
   */
  // change to zustand @jom @son
  function buildDependencyGraph() {}

  return {
    element: el,
    id,
    cells,
    name,
    dispatcher,
    needCalculate,
    needRender,
    setElement,
    calculate,
    getCell,
    evalFormula,
    pauseEvent,
    resumeEvent,
    buildDependencyGraph,
  };
};

export default Sheet;
