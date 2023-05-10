import { createStyles, Image, Container, Title, Text, Button, SimpleGrid, NumberInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { Cell, CellProps, Sheet, UserState, useCalculatorStore, useCalculatorSheetStore, transformData } from "@app/store/builder/calculatorStore";
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useUtilityStore } from '@app/store/builder/utilityStore';
import InputTest from '@app/calculator/components/InputTest';

// import {
//     numToStr,
//     strToNum,
//     getCellsInRange,
//     isValidBinary,
//     strRepeat,
//     repeat,
//     unique,
//     initial,
//     rest,
//     arrayMerge,
//     toArray,
//     objectToArray,
//     trimEmptyCell,
//     rangeToTable,
//     transposeTable
// } from '@app/calculator/utils/Utility/Utility';

const useStyles = createStyles((theme) => ({
    root: {
        paddingBottom: 80,
    },

    title: {
        fontWeight: 900,
        fontSize: 32,
        marginBottom: theme.spacing.md,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 30,
        },
    },

    control: {
        [theme.fn.smallerThan('sm')]: {
            width: '100%',
        },
    },

    mobileImage: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    desktopImage: {
        [theme.fn.smallerThan('sm')]: {
            display: 'block',
        },
    },
}));

interface RangeBoundary {
    col: number;
    row: number;
}

interface RangeBoundaries {
    start: RangeBoundary;
    end: RangeBoundary;
}

interface ParsedFormula {
    func: string;
    args: any[];
}


type FormulaJSFunctions = {
    [key: string]: (...args: any[]) => any;
}


// var data = [
//     [1, 2, 3, 4, 5],
//     [6, 7, 8, 9, 10],
//     [11, 12, 13, 14, 15],
//     [16, 17, 18, 19, 20],
// ];
// var fragment = [];

// for (var row = startCellCoord.row.index; row <= endCellCoord.row.index; row++) {
//     var rowData = data[row];
//     var colFragment = [];

//     for (var col = startCellCoord.column.index; col <= endCellCoord.column.index; col++) {
//         colFragment.push(rowData[col]);
//     }
//     fragment.push(colFragment);
// }

// if (fragment) {
//     done(fragment);
// }


import React from 'react';
import { testCsvData } from '@app/store/test';

type DataItem = (string | null | number)[]; // Define a type for each item in the data array

interface Props {
    data: DataItem[]; // Pass the data array as a prop to the component
}

const Input: React.FC = () => {
    const [value, setValue] = useState('VLOOKUP("", "", "", "")'); // Set the initial value of the input

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectionStart = e.target.selectionStart || 0; // Get the current cursor position
        const selectionEnd = e.target.selectionEnd || 0;

        const newValue = e.target.value; // Get the new value of the input

        // Check if the cursor is within the allowed input areas
        if (selectionStart >= 9 && selectionEnd <= 22) { // This example allows input between the quotes from the 3rd to the 5th comma
            setValue(newValue);
        } else if (selectionStart >= 25 && selectionEnd <= 38) {
            setValue(newValue);
        } else if (selectionStart >= 41 && selectionEnd <= 54) {
            setValue(newValue);
        } else if (selectionStart >= 57 && selectionEnd <= 70) {
            setValue(newValue);
        } else {
            e.preventDefault(); // Prevent any input outside of the allowed areas
        }
    };

    return (
        <input type="text" value={value} onChange={handleChange} />
    );
};


const Table: React.FC = () => { // Use the React.FC type to define the component and its props
    const alinedData = useCalculatorStore(state => state.cells)
    const data = transformData(alinedData)
    console.log(data)
    return (
        <div className="container mx-auto my-8">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Address</th>
                        <th className="px-4 py-2">Column 2</th>
                        <th className="px-4 py-2">Column 3</th>
                        <th className="px-4 py-2">Column 4</th>
                        <th className="px-4 py-2">Column 5</th>
                        <th className="px-4 py-2">Column 6</th>
                        <th className="px-4 py-2">Column 7</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row: DataItem, index: number) => ( // Use the DataItem type for each row in the data array
                        <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : ''}>
                            {row.map((cell, i) => (
                                <td key={i} className="border px-4 py-2">{cell == 0 ? 0 : cell ? cell : null}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



const Calc: React.FC = () => {
    const { classes } = useStyles();
    const router = useRouter();
    const cells = useCalculatorStore((state) => (state.cells))
    const update = useCalculatorStore((state) => (state.update))
    const [value, setValue] = useState(0)
    const FormulaParser = require('hot-formula-parser');
    const parser = new FormulaParser.Parser();
    const formulas = FormulaParser.SUPPORTED_FORMULAS

    // parser.on('callRangeValue', function (
    //     startCellCoord: {
    //         row: { index: number; };
    //         column: { index: number; };
    //         label: string
    //     },
    //     endCellCoord: {
    //         row: { index: number; };
    //         column: { index: number; };
    //         label: string
    //     }, done: (arg0: number[][]) => void) {
    //     const data = [
    //         ['A1', null, 'input', '0,0', null, 'A1', 1],
    //         ['A2', null, 'input', '0,0%', null, 'A2', 3],
    //         ['B1', null, 'input', '$0,0', '', 'B1', 4],
    //         ['B2', null, 'input', '$0,0', '', 'B2', 2],
    //     ];

    //     const start = startCellCoord.label;
    //     const end = endCellCoord.label;

    //     let startIndex = -1;
    //     let endIndex = -1;
    //     let fragment: (string | number | null)[][] = [];

    //     // Find the indices of the start and end elements
    //     for (let i = 0; i < data.length; i++) {
    //         if (data[i][0] === start) {
    //             startIndex = i;
    //         }
    //         if (data[i][0] === end) {
    //             endIndex = i;
    //         }
    //     }

    //     if (startIndex !== -1 && endIndex !== -1) {
    //         const result = data.slice(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex) + 1).map(a => a[6]);
    //         fragment.push(result); // Output: [3, 4, 2]
    //     }

    //     if (fragment) {
    //         const result = fragment.map(row => row.map(val => (val === null || val === undefined ? 0 : +val)));
    //         done(result)
    //     }
    // });
    //
    // console.log(parser.parse('SUM(A1:B2)*10')) //returns 90
    // console.log(parser.parse('VLOOKUP("Test", A1:B2, 2, false)'))
    // console.log(parser.parse('JOIN(A1:E3)').result); // returns `"1,2,3,4,5,6,7,8,9,10"`
    // console.log(parser.parse('COLUMNS(A1:E2)').result); // returns `5`
    // console.log(parser.parse('ROWS(A1:E2)').result); // returns `2`
    // console.log(parser.parse('COUNT(A1:E2)').result); // returns `10`
    // console.log(parser.parse('COUNTIF(A1:E2, ">5")').result); // returns `5`

    // const result = evaluateFormula(parsedFormula);
    const datab = useCalculatorStore(state => state.cells);
    const testCsv = [
        ["Avamar", 1267, "Per TB", "80%", 254, "18%"],
        ["Commvault", 3500, "per TB", 0.8, 1700, "18%"],
        ["DD boost", 1000, "per TB", 0.8, 200, "18%"],
    ];

    parser.on('callFunction', function (name: string, params: any, done: (arg0: number) => void) {
        if (name === 'VLOOKUP') {
            // const data = transformData(datab)
            const data = testCsv
            const vlookupvalue = params[0];
            const vlookupcolumn: number | null = params[2]
            console.log(params)

            let fragment: any;

            const matches = params[1].split(":")
            let start, end;
            if (matches) {
                start = matches[0]
                end = matches[1]
            }

            let startIndex = -1;
            let endIndex = -1;

            for (let i = 0; i < data.length; i++) {
                if (data[i][0] === start) {
                    startIndex = i;
                }
                if (data[i][0] === end) {
                    endIndex = i;
                }
            }

            if (startIndex !== -1 && endIndex !== -1) {
                const result = data.slice(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex) + 1).find(a => a[1] === vlookupvalue);
                console.log(result)
                fragment = result;
            }
            if (fragment && vlookupcolumn) {
                done(fragment[vlookupcolumn - 1])
            }
        }
    });

    console.log("vlook from calx ----------------------------------------", parser.parse('VLOOKUP("Avamar", "B4:D4", 5, "false")').result);

    // console.log(parser.parse('VLOOKUP("B2", "A2:C6", 7, "false")').result, "vlook that reads inputs");


    // parser.setFunction('ADD_5', function (params: any) {
    //     return params[0] + 5;
    // });
    // parser.setFunction('GET_LETTER', function (params: any) {
    //     var string = params[0];
    //     var index = params[1] - 1;
    //     console.log(params)
    //     return string.charAt(index);
    // });
    // console.log(parser.parse('GET_LETTER("Some string", 3)'));

    // parser.setFunction('VLOOKUP', function (searchValue: number, range: string | any[], index: number, exactMatch: any) {
    //     // Get the row index of the search value
    //     console.log("Teest")
    //     let rowIndex = -1;
    //     for (let i = 0; i < range.length; i++) {
    //         if (range[i][0] === searchValue) {
    //             rowIndex = i;
    //             break;
    //         }
    //     }

    //     // If exactMatch is true and the search value is not found, return #N/A
    //     if (exactMatch && rowIndex === -1) {
    //         return '#N/A';
    //     }

    //     // If exactMatch is false and the search value is not found, find the nearest value
    //     if (!exactMatch && rowIndex === -1) {
    //         rowIndex = 0;
    //         let minDiff = Math.abs(range[rowIndex][0] - searchValue);
    //         for (let i = 1; i < range.length; i++) {
    //             const diff = Math.abs(range[i][0] - searchValue);
    //             if (diff < minDiff) {
    //                 rowIndex = i;
    //                 minDiff = diff;
    //             }
    //         }
    //     }

    //     // Return the value at the specified index
    //     if (range[rowIndex] && range[rowIndex][index - 1]) {
    //         const result = range[rowIndex][index - 1];
    //         console.log(result)
    //         return 12
    //     } else {
    //         console.log("NA")
    //         return 12;
    //     }
    // });

    // console.log(parser.parse('VLOOKUP(3, A1:B2, 2, true)'), 'vlookup')

    function sumProduct(arr1: number[][], arr2: number[][]) {
        let result = 0;
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr1[0].length; j++) {
                result += arr1[i][j] * arr2[i][j];
            }
        }
        return result;
    }

    // const formulaFunctions: FormulaJSFunctions = {
    //     // MATH
    //     ABS: formulajs.ABS,
    //     ACOS: formulajs.ACOS,
    //     ACOSH: formulajs.ACOSH,
    //     ACOT: formulajs.ACOT,
    //     ACOTH: formulajs.ACOTH,
    //     AGGREGATE: formulajs.AGGREGATE,
    //     ARABIC: formulajs.ARABIC,
    //     ASIN: formulajs.ASIN,
    //     ASINH: formulajs.ASINH,
    //     ATAN: formulajs.ATAN,
    //     ATAN2: formulajs.ATAN2,
    //     ATANH: formulajs.ATANH,
    //     BASE: formulajs.BASE,
    //     CEILING: formulajs.CEILING,
    //     CEILINGPRECISE: formulajs.CEILINGPRECISE,
    //     COMBIN: formulajs.COMBIN,
    //     COMBINA: formulajs.COMBINA,
    //     COS: formulajs.COS,
    //     SUM: formulajs.SUM,
    //     SUMPRODUCT: formulajs.SUMPRODUCT,
    //     // Date
    //     DATE: formulajs.DATE,
    //     DATEVALUE: formulajs.DATEVALUE,
    //     DAY: formulajs.DAY,
    //     DAYS: formulajs.DAYS,
    //     DAYS360: formulajs.DAYS360,
    //     EDATE: formulajs.EDATE,
    //     EOMONTH: formulajs.EOMONTH,
    //     HOUR: formulajs.HOUR,
    //     MINUTE: formulajs.MINUTE,
    //     NETWORKDAYSINTL: formulajs.NETWORKDAYSINTL,
    //     NOW: formulajs.NOW,
    //     SECOND: formulajs.SECOND,
    //     TIME: formulajs.TIME,
    //     TIMEVALUE: formulajs.TIMEVALUE,
    //     TODAY: formulajs.TODAY,
    //     WEEKDAY: formulajs.WEEKDAY,
    //     YEAR: formulajs.YEAR,
    //     WEEKNUM: formulajs.WEEKNUM,
    //     WORKDAY: formulajs.WORKDAY,
    //     WORKDAYINTL: formulajs.WORKDAYINTL,
    //     YEARFRAC: formulajs.YEARFRAC,
    //     // FINANCIAL
    //     ACCRINT: formulajs.ACCRINT,
    //     CUMIPMT: formulajs.CUMIPMT,
    //     CUMPRINC: formulajs.CUMPRINC,
    //     DB: formulajs.DB,
    //     DOLLARDE: formulajs.DOLLARDE,
    //     DOLLARFR: formulajs.DOLLARFR,
    //     EFFECT: formulajs.EFFECT,
    //     FV: formulajs.FV,
    //     FVSCHEDULE: formulajs.FVSCHEDULE,
    //     IPMT: formulajs.IPMT,
    //     IRR: formulajs.IRR,
    //     ISPMT: formulajs.ISPMT,
    //     MIRR: formulajs.MIRR,
    //     NOMINAL: formulajs.NOMINAL,
    //     NPER: formulajs.NPER,
    //     NPV: formulajs.NPV,
    //     PDURATION: formulajs.PDURATION,
    //     PMT: formulajs.PMT,
    //     PV: formulajs.PV,
    //     RATE: formulajs.RATE,
    //     // LOGICAL
    //     AND: formulajs.AND,
    //     false: formulajs.FALSE,
    //     IF: formulajs.IF,
    //     IFS: formulajs.IFS,
    //     IFERROR: formulajs.IFERROR,
    //     IFNA: formulajs.IFNA,
    //     NOT: formulajs.NOT,
    //     OR: formulajs.OR,
    //     SWITCH: formulajs.SWITCH,
    //     true: formulajs.TRUE,
    //     XOR: formulajs.XOR,
    //     // add more formula names and functions here
    // };

    // function evaluateFormula(formula: string) {
    //     const regex = /([A-Z]+)\(([^\)]+)\)/g;
    //     const matches = formula.matchAll(regex);

    //     let result: any = null;


    //     for (const match of matches) {
    //         // console.log('match', match);
    //         const funcName = match[1];

    //         // const ttt = match[2]
    //         // const items = ttt.replace(/\[|\]/g, '').split(',')

    //         const args = match[2].split(',').map(arg => {
    //             if (arg.trim().startsWith('[') && arg.trim().endsWith(']')) {
    //                 // Parse array argument
    //                 return JSON.parse(arg.trim());
    //             } else {
    //                 // Parse number argument
    //                 return parseFloat(arg.trim());
    //             }
    //         });

    //         // Call the appropriate formula function based on the function name
    //         // @jom equal to sa formulajs.functionname example formulajs.SUMPRODUCT
    //         //kaso need natin na formulajs.SUMPRODUCT([[1,2],[3,4]], [[1,0],[0,1]]) maganto kesa ganto formulajs.SUMPRODUCT("[[1,2],[3,4]], [[1,0],[0,1]]") na string pa ang nasa loob
    //         const func = formulaFunctions[funcName];
    //         // console.log('func', match[2])
    //         if (func) {
    //             result = func(...args);
    //         } else {
    //             throw new Error(`Unknown formula: ${funcName}`);
    //         }
    //     }

    //     return result;
    // }

    const formulatest = 'SUMPRODUCT([[1, 2], [3, 4]], [[1, 0], [0, 1]])';
    const formula = `ABS(-4)`
    // const result = evaluateFormula(formulatest);
    // console.log(result) //results to zero | answer should be 5

    // console.log(formulajs.SUMPRODUCT([[1, 2], [3, 4]], [[1, 0], [0, 1]])) // results to 5


    return (
        <Container className={`${classes.root} max-w-[100%] bg-gray-100`}>

            {/* {cells.map((cell) => <InputTest cell={cell} key={cell.address} />)} */}
            {/* <div className="container mx-auto">
                <h1 className="text-3xl font-bold">Test VLOOKUP</h1>
                <Table />
            </div> */}
        </Container>
    );
}

export default Calc