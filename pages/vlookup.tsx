import { createStyles, Image, Container, Title, Text, Button, SimpleGrid, NumberInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { Cell, CellProps, Sheet, UserState, useCalculatorStore, useCalculatorSheetStore, transformData } from "@app/store/builder/calculatorStore";
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useUtilityStore } from '@app/store/builder/utilityStore';
import InputTest from '@app/calculator/components/InputTest';
import * as formulajs from '@formulajs/formulajs';
import { HyperFormula } from 'hyperformula';
const options = {
    licenseKey: 'gpl-v3',
};

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



// function rangeToTable(data: CsvPropProduct[]) {
//     const result = [];

//     for (const obj of data) {
//         const row = [
//             obj.address,
//             obj.value,
//             obj.label,
//             obj.format,
//             obj.formula
//         ];

//         result.push(row);
//     }

//     return result;
// }



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



type CsvPropProduct = {
    address: string,
    value: string | number,
    label: string,
    format: string | null,
    formula: string | null
}

type NestedTable = Array<Array<CsvPropProduct>>;

function rangeToTable(table: Array<CsvPropProduct>): NestedTable {
    const nestedTable: NestedTable = [];

    table.forEach((obj) => {
        const row = parseInt(obj.address.substring(1)) - +table[0].address.substring(1);
        if (!nestedTable[row]) {
            nestedTable[row] = [];
        }

        nestedTable[row].push(obj);
    });

    return nestedTable;
}

function filterRange(table: Array<Array<CsvPropProduct>>, range: string): Array<Array<CsvPropProduct>> {
    const [start, end] = range.split(':');
    const [startCol, startRow] = [start.charAt(0), +start.substring(1)];
    const [endCol, endRow] = [end.charAt(0), parseInt(end.substring(1))];
    const filteredTable: Array<Array<CsvPropProduct>> = [];
    console.log(startCol, startRow)
    table.map(tab => tab.map(ta => console.log(ta.address == start)))

    return filteredTable;
}

interface Props {
    data: CsvPropProduct[]; // Pass the data array as a prop to the component
}

function getRangeFromArray(array: Array<Array<CsvPropProduct>>, range: string): Array<Array<any>> {
    const [start, end] = range.split(":");
    const startColIndex = array.findIndex(elem => elem.find(el => el.address == start));
    const endColIndex = array.findIndex(elem => elem.find(el => el.address == end));
    const rangeArray: Array<Array<any>> = [];
    console.log(array[startColIndex].findIndex(cell => cell.address == start), 'rr')
    for (let i = startColIndex; i <= endColIndex; i++) {
        const rowArray: Array<any> = [];
        for (let j = array[startColIndex].findIndex(cell => cell.address == start); j <= array[endColIndex].findIndex(cell => cell.address == end); j++) {
            rowArray.push(array[i][j] ? array[i][j] : null);
        }
        rangeArray.push(rowArray);
    }

    return rangeArray;
}


type ResultTypeProp = {
    error: string,
    result: number | string
}

const realObject = [
    {
        address: "b4",
        value: "Avamar",
        label: "Incumbent Solution",
        format: null,
        formula: null,
    },
    {
        address: "c4",
        value: 1267,
        label: "Price per TB",
        format: "$0,0",
        formula: null,
    },
    {
        address: "d4",
        value: "per TB",
        label: "Unit",
        format: null,
        formula: null,
    },
    {
        address: "e4",
        value: 0.8,
        label: "Discount %",
        format: null,
        formula: null,
    },
    {
        address: "f4",
        value: 254,
        label: "Adjusted Price",
        format: null,
        formula: null,
    },
    {
        address: "g4",
        value: 0.18,
        label: "Tax",
        format: null,
        formula: null,
    },
    {
        address: "b5",
        value: "Commvault",
        label: "Incumbent Solution",
        format: null,
        formula: null,
    },
    {
        address: "c5",
        value: 3500,
        label: "Price",
        format: null,
        formula: null,
    },
    {
        address: "d5",
        value: "per FETB",
        label: "Unit",
        format: null,
        formula: null,
    },
    {
        address: "e5",
        value: 0.8,
        label: "Discount %",
        format: null,
        formula: null,
    },
    {
        address: "f5",
        value: 1700,
        label: "Adjusted Price",
        format: null,
        formula: null,
    },
    {
        address: "g5",
        value: 0.18,
        label: "Tax",
        format: null,
        formula: null,
    },

    {
        address: "b6",
        value: "DD Boost",
        label: "Incumbent Solution",
        format: null,
        formula: null,
    },
    {
        address: "c6",
        value: 1000,
        label: "Price",
        format: null,
        formula: null,
    },
    {
        address: "d6",
        value: "per client",
        label: "Unit",
        format: null,
        formula: null,
    },
    {
        address: "e6",
        value: 0.8,
        label: "Discount %",
        format: null,
        formula: null,
    },
    {
        address: "f6",
        value: 200,
        label: "Adjusted Price",
        format: null,
        formula: null,
    },
    {
        address: "g6",
        value: 0.18,
        label: "Tax",
        format: null,
        formula: null,
    },
    {
        address: "b7",
        value: "Dell/EMC DPS",
        label: "Incumbent Solution",
        format: null,
        formula: null,
    },
    {
        address: "c7",
        value: 1100,
        label: "Price",
        format: null,
        formula: null,
    },
    {
        address: "d7",
        value: "per TB",
        label: "Unit",
        format: null,
        formula: null,
    },
    {
        address: "e7",
        value: 0.8,
        label: "Discount %",
        format: null,
        formula: null,
    },
    {
        address: "f7",
        value: 220,
        label: "Adjusted Price",
        format: null,
        formula: null,
    },
    {
        address: "g7",
        value: 0.18,
        label: "Tax",
        format: null,
        formula: null,
    },
    {
        address: "b8",
        value: "IDPA",
        label: "Incumbent Solution",
        format: null,
        formula: null,
    },
    {
        address: "c8",
        value: 1535,
        label: "Price",
        format: null,
        formula: null,
    },
    {
        address: "d8",
        value: "per TB",
        label: "Unit",
        format: null,
        formula: null,
    },
    {
        address: "e8",
        value: 0.7,
        label: "Discount %",
        format: null,
        formula: null,
    },
    {
        address: "f8",
        value: 460.5,
        label: "Adjusted Price",
        format: null,
        formula: null,
    },
    {
        address: "g8",
        value: 0.18,
        label: "Tax",
        format: null,
        formula: null,
    },
    {
        address: "b9",
        value: "Networker",
        label: "Incumbent Solution",
        format: null,
        formula: null,
    },
    {
        address: "c9",
        value: 875,
        label: "Price",
        format: null,
        formula: null,
    },
    {
        address: "d9",
        value: "per TB",
        label: "Unit",
        format: null,
        formula: null,
    },
    {
        address: "e9",
        value: 0.7,
        label: "Discount %",
        format: null,
        formula: null,
    },
    {
        address: "f9",
        value: 262.5,
        label: "Adjusted Price",
        format: null,
        formula: null,
    },
    {
        address: "g9",
        value: 0.18,
        label: "Tax",
        format: null,
        formula: null,
    },

    {
        address: "b10",
        value: "HPE StoreOnce VSA",
        label: "Incumbent Solution",
        format: null,
        formula: null,
    },
    {
        address: "c10",
        value: 2000,
        label: "Price",
        format: null,
        formula: null,
    },
    {
        address: "d10",
        value: "per TB",
        label: "Unit",
        format: null,
        formula: null,
    },
    {
        address: "e10",
        value: 0.8,
        label: "Discount %",
        format: null,
        formula: null,
    },
    {
        address: "f10",
        value: 400,
        label: "Adjusted Price",
        format: null,
        formula: null,
    },
    {
        address: "g10",
        value: 0.18,
        label: "Tax",
        format: null,
        formula: null,
    },
]



const Input: React.FC = () => {
    const datatest = rangeToTable(realObject)
    const [value, setValue] = useState('VLOOKUP("", "b4:g10", 5, "false")'); // Set the initial value of the input with placeholder
    const FormulaParser = require('hot-formula-parser');
    const parser = new FormulaParser.Parser();
    const [resultP, setResult] = useState<ResultTypeProp>()

    // parser.on('callFunction', function (name: string, params: any, done: (arg0: number) => void) {
    //     if (name === 'VLOOKUP') {
    //         const vlookupvalue = params[0];
    //         const vlookupcolumn: number | null = params[2]
    //         console.log(params, "params")

    //         let fragment: any;

    //         const matches = params[1].split(":")
    //         let start, end;
    //         if (matches) {
    //             start = matches[0]
    //             end = matches[1]
    //         }

    //         let startIndex = -1;
    //         let endIndex = -1;

    //         for (let i = 0; i < data.length; i++) {
    //             if (data[i][0] === start) {
    //                 startIndex = i;
    //             }
    //             if (data[i][0] === end) {
    //                 endIndex = i;
    //             }
    //         }

    //         if (startIndex !== -1 && endIndex !== -1) {
    //             const result = data.slice(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex) + 1).find(a => a[1] === vlookupvalue);
    //             console.log(result)
    //             fragment = result;
    //         }
    //         if (fragment && vlookupcolumn) {
    //             done(fragment[vlookupcolumn])
    //         }
    //     }
    // });

    parser.setFunction('VLOOKUP', function (params: any[]) {
        const searchValue = params[0].toUpperCase();
        const range = params[1].toUpperCase();
        const index = params[2];
        const exactMatch = params[3] === undefined ? true : params[3];
        // console.log(params, 'rarara')

        const data = getRangeFromArray(datatest, params[1])
        // console.log(data)

        const rangeValues = data.map(row => row.map(cell => cell !== null ? { ...cell, address: cell.address.toString().toUpperCase() } : null));
        // console.log(rangeValues, "rangeValues")

        const columnIndex = rangeValues[0].findIndex(cellValue => console.log(cellValue?.address, range.split(':')[1]));
        // console.log(columnIndex, "columnIndex") //td
        const rowIndex = rangeValues.findIndex(row => row[0]?.value.toString().toUpperCase() === searchValue);
        if (rowIndex === -1) {
            return '#N/A';
        }

        const foundValue = rangeValues[rowIndex][index]?.value;
        console.log(rangeValues[rowIndex][index - 1]?.value, 'found', exactMatch) //td

        return rangeValues[rowIndex][index - 1]?.value;
    });

    // console.log(parser.parse('VLOOKUP("HPE StoreOnce VSA", "b4:g10", 5, "false")'))

    // const vlookupFunction = (searchValue: string, range: any, index: number, exactMatch: any) => {
    //     // Convert the range to a 2D array
    //     const table = parser.parse(range).result;

    //     // Find the row that matches the search value
    //     let row;
    //     if (exactMatch) {
    //         row = table.find((row: any[]) => row[0] === searchValue);
    //     } else {
    //         row = table.find((row: string[]) => row[0].toLowerCase().includes(searchValue.toLowerCase()));
    //     }

    //     // If a matching row was found, return the value at the specified index
    //     if (row) {
    //         return row[index - 1];
    //     }

    //     // If no matching row was found, return #N/A
    //     return '#N/A';
    // };

    // // Add the vlookup function to the parser
    // parser.setFunction('VLOOKUP', vlookupFunction);

    // const result = parser.parse('VLOOKUP("Avamar", "b4:g10", 3, "true")').result;
    // console.log(result);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectionStart = e.target.selectionStart || 0; // Get the current cursor position
        const selectionEnd = e.target.selectionEnd || 0;

        const newValue = e.target.value; // Get the new value of the input

        // Check if the cursor is within the allowed input areas
        if (selectionStart >= 9 && selectionEnd <= 22) { // This example allows input between the quotes from the 3rd to the 5th comma
            console.log(value)
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
        <>
            <input className='w-96' type="text" value={value} onChange={handleChange} />
            <Button onClick={() => {
                console.log(parser.parse(`${value}`).result, 'resss')
                setResult(parser.parse(`${value}`))
            }}>Submit</Button>
            <Text>Result: {resultP?.result ? resultP.result : '#N/A!'}</Text>
        </>
    );
};


const Table = () => {
    const data = rangeToTable(realObject)
    return (
        <div className="container mx-auto px-4">
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Incumbent Solution</th>
                        <th className="px-4 py-2">Price per TB</th>
                        <th className="px-4 py-2">Unit</th>
                        <th className="px-4 py-2">Discount %</th>
                        <th className="px-4 py-2">Adjusted Price</th>
                        <th className="px-4 py-2">Tax</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {row.map((cell, index) => (
                                <td key={index} className="border px-4 py-2">
                                    {cell.value}
                                </td>
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
    const datab = useCalculatorStore(state => state.cells);
    console.log("vlook from calx ----------------------------------------", parser.parse('VLOOKUP("Avamar", "B4:D4", 5, "false")').result);


    return (
        <Container className={`${classes.root} max-w-[100%] bg-gray-100`}>
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold">Test VLOOKUP</h1>
                <Table />
                <Input />
            </div>
        </Container>
    );
}

export default Calc