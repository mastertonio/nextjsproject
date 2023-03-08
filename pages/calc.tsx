import { createStyles, Image, Container, Title, Text, Button, SimpleGrid, NumberInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { Cell, CellProps, Sheet, UserState, useCalculatorStore, useCalculatorSheetStore } from "@app/store/builder/calculatorStore";
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useUtilityStore } from '@app/store/builder/utilityStore';
import InputTest from '@app/calculator/components/InputTest';
import * as formulajs from '@formulajs/formulajs';

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



const Calc: React.FC = () => {
    const { classes } = useStyles();
    const router = useRouter();
    const cells = useCalculatorStore((state) => (state.cells))
    const update = useCalculatorStore((state) => (state.update))
    const [value, setValue] = useState(0)
    const FormulaParser = require('hot-formula-parser');
    const parser = new FormulaParser.Parser();
    const formulas = FormulaParser.SUPPORTED_FORMULAS

    // const result = evaluateFormula(parsedFormula);

    function sumProduct(arr1: number[][], arr2: number[][]) {
        let result = 0;
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr1[0].length; j++) {
                result += arr1[i][j] * arr2[i][j];
            }
        }
        return result;
    }

    const formulaFunctions: FormulaJSFunctions = {
        // MATH
        ABS: formulajs.ABS,
        ACOS: formulajs.ACOS,
        ACOSH: formulajs.ACOSH,
        ACOT: formulajs.ACOT,
        ACOTH: formulajs.ACOTH,
        AGGREGATE: formulajs.AGGREGATE,
        ARABIC: formulajs.ARABIC,
        ASIN: formulajs.ASIN,
        ASINH: formulajs.ASINH,
        ATAN: formulajs.ATAN,
        ATAN2: formulajs.ATAN2,
        ATANH: formulajs.ATANH,
        BASE: formulajs.BASE,
        CEILING: formulajs.CEILING,
        CEILINGPRECISE: formulajs.CEILINGPRECISE,
        COMBIN: formulajs.COMBIN,
        COMBINA: formulajs.COMBINA,
        COS: formulajs.COS,
        SUM: formulajs.SUM,
        SUMPRODUCT: formulajs.SUMPRODUCT,
        // Date
        DATE: formulajs.DATE,
        DATEVALUE: formulajs.DATEVALUE,
        DAY: formulajs.DAY,
        DAYS: formulajs.DAYS,
        DAYS360: formulajs.DAYS360,
        EDATE: formulajs.EDATE,
        EOMONTH: formulajs.EOMONTH,
        HOUR: formulajs.HOUR,
        MINUTE: formulajs.MINUTE,
        NETWORKDAYSINTL: formulajs.NETWORKDAYSINTL,
        NOW: formulajs.NOW,
        SECOND: formulajs.SECOND,
        TIME: formulajs.TIME,
        TIMEVALUE: formulajs.TIMEVALUE,
        TODAY: formulajs.TODAY,
        WEEKDAY: formulajs.WEEKDAY,
        YEAR: formulajs.YEAR,
        WEEKNUM: formulajs.WEEKNUM,
        WORKDAY: formulajs.WORKDAY,
        WORKDAYINTL: formulajs.WORKDAYINTL,
        YEARFRAC: formulajs.YEARFRAC,
        // FINANCIAL
        ACCRINT: formulajs.ACCRINT,
        CUMIPMT: formulajs.CUMIPMT,
        CUMPRINC: formulajs.CUMPRINC,
        DB: formulajs.DB,
        DOLLARDE: formulajs.DOLLARDE,
        DOLLARFR: formulajs.DOLLARFR,
        EFFECT: formulajs.EFFECT,
        FV: formulajs.FV,
        FVSCHEDULE: formulajs.FVSCHEDULE,
        IPMT: formulajs.IPMT,
        IRR: formulajs.IRR,
        ISPMT: formulajs.ISPMT,
        MIRR: formulajs.MIRR,
        NOMINAL: formulajs.NOMINAL,
        NPER: formulajs.NPER,
        NPV: formulajs.NPV,
        PDURATION: formulajs.PDURATION,
        PMT: formulajs.PMT,
        PV: formulajs.PV,
        RATE: formulajs.RATE,
        // LOGICAL
        AND: formulajs.AND,
        false: formulajs.FALSE,
        IF: formulajs.IF,
        IFS: formulajs.IFS,
        IFERROR: formulajs.IFERROR,
        IFNA: formulajs.IFNA,
        NOT: formulajs.NOT,
        OR: formulajs.OR,
        SWITCH: formulajs.SWITCH,
        true: formulajs.TRUE,
        XOR: formulajs.XOR,
        // add more formula names and functions here
    };

    // function evaluateFormula(formula: string) {
    //     const regex = /([A-Z]+)\(([^\)]+)\)/g;
    //     const matches = formula.matchAll(regex);

    //     let result: any = null;

    //     for (const match of matches) {
    //         const funcName = match[1];
    //         const args = match[2].split(',').map(arg => {
    //             if (arg.trim().startsWith('[') && arg.trim().endsWith(']')) {
    //                 // Parse array argument
    //                 const arrayStr = arg.trim().slice(1, -1); // remove brackets
    //                 return arrayStr.split(',').map(str => parseFloat(str.trim()));
    //             } else {
    //                 // Parse number argument
    //                 return parseFloat(arg.trim());
    //             }
    //         });

    //         // Call the appropriate formula function based on the function name
    //         const func = formulaFunctions[funcName];
    //         if (func) {
    //             result = func(...args);
    //         } else {
    //             throw new Error(`Unknown formula: ${funcName}`);
    //         }
    //     }

    //     return result;
    // }

    function evaluateFormula(formula: string) {
        const regex = /([A-Z]+)\(([^\)]+)\)/g;
        const matches = formula.matchAll(regex);

        let result: any = null;


        for (const match of matches) {
            console.log('match', match);
            const funcName = match[1];

            // const ttt = match[2]
            // const items = ttt.replace(/\[|\]/g, '').split(',')

            const args = match[2].split(',').map(arg => {
                if (arg.trim().startsWith('[') && arg.trim().endsWith(']')) {
                    // Parse array argument
                    return JSON.parse(arg.trim());
                } else {
                    // Parse number argument
                    return parseFloat(arg.trim());
                }
            });

            // Call the appropriate formula function based on the function name
            // @jom equal to sa formulajs.functionname example formulajs.SUMPRODUCT
            //kaso need natin na formulajs.SUMPRODUCT([[1,2],[3,4]], [[1,0],[0,1]]) maganto kesa ganto formulajs.SUMPRODUCT("[[1,2],[3,4]], [[1,0],[0,1]]") na string pa ang nasa loob
            const func = formulaFunctions[funcName];
            console.log('func', match[2])
            if (func) {
                result = func(...args);
            } else {
                throw new Error(`Unknown formula: ${funcName}`);
            }
        }

        return result;
    }

    const formulatest = 'SUMPRODUCT([[1, 2], [3, 4]], [[1, 0], [0, 1]])';
    const formula = `ABS(-4)`
    const result = evaluateFormula(formulatest);
    console.log(result) //results to zero | answer should be 5

    console.log(formulajs.SUMPRODUCT([[1, 2], [3, 4]], [[1, 0], [0, 1]])) // results to 5


    return (
        <Container className={`${classes.root} max-w-[100%] bg-gray-100`}>

            {cells.map((cell) => <InputTest cell={cell} key={cell.address} />)}
        </Container>
    );
}

export default Calc