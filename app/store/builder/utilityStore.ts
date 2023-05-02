import { strRepeat, strToNum } from "@app/calculator/utils/Utility/Utility";
import { create } from "zustand";

export interface Utility {
  utility: {
    numToStr: (num: number) => string;
    strToNum: (str: string) => number;
    getCellsInRange: (range: string) => string[];
    isValidBinary: (number: string) => boolean;
    strRepeat: (string: string, qty: number) => string;
    repeat: (str: string, qty: number, separator: string) => string;
    unique: (array: Array<any>) => string;
    initial: (array: Array<any>, n: any, guard: any) => Array<any>;
    rest: (array: Array<any>, n: any, guard: any) => Array<any>;
    arrayMerge: (args: Array<any>) => Array<any>;
    toArray: (args: any) => Array<any>;
    objectToArray: <T>(obj: Record<string, T>) => T[];
    trimEmptyCell: (cellRange: Record<string, any>) => Record<string, any>;
    rangeToTable: (cellRange: Record<string, any>) => Array<Array<any>>;
    transposeTable: (table: Array<Array<any>>) => Array<Array<any>>;
  };
}

export const useUtilityStore = create<Utility>((set) => ({
  utility: {
    /**
     * translate numeric to alphabet, like 1 => A, 27 => AA
     * numeric value of alphabet
     */
    numToStr: (num: number) => {
      let s = "";
      num = Math.round(num - 1);
      while (num >= 0) {
        s = String.fromCharCode((num % 26) + 97) + s;
        num = Math.floor(num / 26) - 1;
      }
      console.log("Number to String", s);
      return s.toUpperCase();
    },
    /**
    * translate alphabet to numeric, A => 1, B => 2, Z => 26, AA => 27 etc
    String Value to Number parallel to alphabet
    */
    strToNum: (str: string) => {
      const chars = str.toUpperCase().split("");
      const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      let i,
        j,
        result = 0;

      for (i = 0, j = chars.length - 1; i < chars.length; i += 1, j -= 1) {
        result += Math.pow(base.length, j) * (base.indexOf(chars[i]) + 1);
      }
      console.log("String to Number", result);
      return result;
    },

    /**
    * translate cellStart:cellStop to array containing all cell in range
    Cell range of cells
    */
    getCellsInRange: (range: string) => {
      range = range.toUpperCase();
      const regex = {
        alpha: /[A-Z]+/,
        num: /[0-9]+/,
        cellRange: /^[A-Za-z]+[0-9]+\s*:\s*[A-Za-z]+[0-9]+$/,
      };

      if (!range.match(regex.cellRange)) {
        throw new Error("Invalid range syntax!");
      }

      const rangeStart = range.split(":")[0],
        rangeEnd = range.split(":")[1];

      const strToNum = (str: string): number => {
        let num = 0;
        for (let i = 0; i < str.length; i++) {
          num = num * 26 + str.charCodeAt(i) - 64;
        }
        return num;
      };

      const numToStr = (num: number): string => {
        let str = "";
        while (num > 0) {
          const modulo = (num - 1) % 26;
          str = String.fromCharCode(65 + modulo) + str;
          num = Math.floor((num - modulo) / 26);
        }
        return str;
      };

      const boundaries = {
        start: {
          col: strToNum(rangeStart.match(regex.alpha)![0]), //alpha part
          row: parseInt(rangeStart.match(regex.num)![0]), //numeric part
        },
        end: {
          col: strToNum(rangeEnd.match(regex.alpha)![0]), //alpha part
          row: parseInt(rangeEnd.match(regex.num)![0]), //numeric part
        },
      };

      const cellRange: string[] = [];

      for (
        let col = Math.min(boundaries.start.col, boundaries.end.col);
        col <= Math.max(boundaries.start.col, boundaries.end.col);
        col++
      ) {
        for (
          let row = Math.min(boundaries.start.row, boundaries.end.row);
          row <= Math.max(boundaries.start.row, boundaries.end.row);
          row++
        ) {
          cellRange.push(numToStr(col) + row + "");
        }
      }

      console.log("Cell Range:", cellRange);
      return cellRange;
    },

    /**
     * taken from Formula.VALIDBIN of stoic's formula.js (http://www.stoic.com/pages/formula)
     * check if number is in valid binary format
     */
    isValidBinary: (numberFormat: string) => {
      const returnParams = /^[01]{1,10}$/.test(numberFormat);
      console.log("Check if number is valid binary format ", returnParams);
      return /^[01]{1,10}$/.test(numberFormat);
    },

    /**
    * String repeater, taken from underscore string (https://github.com/epeli/underscore.string)
    //  How many time you want to repeat string
    */
    strRepeat: (str: string, qty: number) => {
      if (qty < 1) return "";
      let result = "";
      while (qty > 0) {
        if (qty & 1) result += str;
        (qty >>= 1), (str += str);
      }
      console.log("String Repeater", result);
      return result;
    },

    // String Repeater with custom separator
    repeat: (str: string, qty: number, separator: string) => {
      if (str == null) {
        return "";
      }

      qty = ~~qty;

      // using faster implementation if separator is not needed;
      if (separator == null) {
        return strRepeat(String(str), qty);
      }

      // this one is about 300x slower in Google Chrome
      for (var repeat = []; qty > 0; repeat[--qty] = str) {}
      console.log("String repeater with separator:", repeat.join(separator));
      return repeat.join(separator);
    },

    // Find the unique string in array
    unique: (array: Array<any>) => {
      return array.reduce(function (p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        console.log("Find the unique string in array:", c);
        return p;
      }, []);
    },

    // The purpose of this function is to return a new array containing all the elements of the input array except for the last "n" elements.
    initial: (array: Array<any>, n: any, guard: any) => {
      console.log(
        "Initial",
        Array.prototype.slice.call(
          array,
          0,
          Math.max(0, array.length - (n == null || guard ? 1 : n))
        )
      );
      return Array.prototype.slice.call(
        array,
        0,
        Math.max(0, array.length - (n == null || guard ? 1 : n))
      );
    },

    // The purpose of this function is to return a new array containing all the elements of the input "array" except for the first "n" elements.
    rest: (array: Array<any>, n: any, guard: any) => {
      console.log(
        "Rest array",
        Array.prototype.slice.call(array, n == null || guard ? 1 : n)
      );
      return Array.prototype.slice.call(array, n == null || guard ? 1 : n);
    },
    /** end of underscore func */

    // The purpose of this function is to merge all the arrays contained in the "args" array into a single array, with any empty or whitespace-only elements removed.
    // If any non-array elements are present in "args", they are simply concatenated to the output array.
    arrayMerge: (args: Array<any>) => {
      let result: Array<any> = [];

      for (let i = 0; i < args.length; i++) {
        if (typeof args[i] == "object") {
          for (let a in args[i]) {
            if (args[i][a].trim() !== "") {
              result = result.concat(args[i][a]);
            }
          }
        } else {
          if (result.concat(args[i]).join().trim() !== "") {
            result = result.concat(args[i]);
          }
        }
      }

      console.log("Array Merge", result);
      return result;
    },

    // This code defines a JavaScript function called toArray that takes in a single argument named args.
    // The purpose of this function is to convert the args argument into an array.
    toArray: (args: any) => {
      console.log("To Array", Array.prototype.slice.call(args, 0));
      return Array.prototype.slice.call(args, 0);
    },

    /**
     * Converting object into plain array
     */
    //  Convert object into plain array
    objectToArray: <T>(obj: Record<string, T>) => {
      const array: T[] = [];

      for (let a in obj) {
        array.push(obj[a]);
      }
      console.log("Cnvert object to Array", array);
      return array;
    },

    /**
     * remove empty cell from cell range collection
     */
    //  remove all empty string and cell on object
    trimEmptyCell: (cellRange: Record<string, any>) => {
      let result: Record<string, any> = {};

      for (var a in cellRange) {
        if (typeof cellRange[a] === "string" && cellRange[a].trim() !== "") {
          result[a] = cellRange[a];
        }
      }
      console.log("Remove Empty Cell", result);
      return result;
    },

    /**
     * convert range {A1: val1, A2: val2, B1: val3, B2: val4} into 2 dimensional table array
     * [
     *     [val1, val2],
     *     [val3, val4]
     * ]
     */
    //  Overall, this function is useful for converting a rectangular range of cells from a spreadsheet into a table format that can be used in other applications.
    rangeToTable: (cellRange: Record<string, any>) => {
      let cell: string;
      let col: number;
      let row: number = 0;
      const alphaPattern: RegExp = /[A-Z]+/;
      const numPattern = /[0-9]+/;
      const arrayTable: Array<Array<any>> = [];
      const resultTable: Array<Array<any>> = [];

      for (cell in cellRange) {
        const matchAlpha = cell.match(alphaPattern)?.[0];
        const matchNum = cell.match(numPattern)?.[0];

        console.log("matchAlpha", matchAlpha);

        col = strToNum(matchAlpha?.[0] ?? "") - 1;
        row = parseInt(matchNum ?? "0", 10) - 1;

        if (typeof arrayTable[row] == "undefined") {
          arrayTable[row] = [];
        }

        arrayTable[row][col] = cellRange[cell];
      }

      let resultRow = 0;
      const rowLength = arrayTable.length;
      let colLength: number;

      for (row = 0; row < rowLength; row++) {
        if (typeof arrayTable[row] != "undefined") {
          colLength = arrayTable[row].length;

          if (typeof resultTable[resultRow] == "undefined") {
            resultTable[resultRow] = [];
          }

          for (col = 0; col < colLength; col++) {
            if (typeof arrayTable[row][col] != "undefined") {
              resultTable[resultRow].push(arrayTable[row][col]);
            }
          }

          resultRow++;
        }
      }

      console.log("Range to Table", resultTable);
      return resultTable;
    },

    /**
     * transpose horizontal table to be vertical table, or vice-versa
     * e.g
     *  [
     *      [1,2,3,4],
     *      [1,2,3,4],
     *  ]
     *
     * to be
     *  [
     *      [1,1],
     *      [2,2],
     *      [3,3],
     *      [4,4],
     *  ]
     */
    //  This is a function named transposeTable that takes an input parameter table of type Array<Array<any>>,
    // where table represents a two-dimensional array.
    // The function returns a new two-dimensional array that is the transpose of the input array.
    transposeTable: (table: Array<Array<any>>) => {
      let row: number;
      let col: number;
      let rowLength: number;
      let colLength: number;
      let newTable: Array<Array<any>> = [];

      rowLength = table.length;

      for (row = 0; row < rowLength; row++) {
        colLength = table[row].length;

        for (col = 0; col < colLength; col++) {
          if (typeof newTable[col] === "undefined") {
            newTable[col] = [];
          }

          newTable[col].push(table[row][col]);
        }
      }

      console.log("Transpose Table", newTable);

      return newTable;
    },
  },
}));
