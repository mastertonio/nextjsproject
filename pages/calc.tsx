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

    const formulaFunctions: FormulaJSFunctions = {
        ABS: formulajs.ABS,
        ACOS: formulajs.ACOS,
        SUM: formulajs.SUM,
        SUMPRODUCT: formulajs.SUMPRODUCT
        // add more formula names and functions here
    };


    function evaluateFormula(formula: string) {
        const regex = /([A-Z]+)\(([^\)]+)\)/g;
        const matches = formula.matchAll(regex);

        let result: any = null;


        for (const match of matches) {
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
            if (func) {
                result = func(...args);
            } else {
                throw new Error(`Unknown formula: ${funcName}`);
            }
        }

        return result;
    }

    const formulatest = `SUMPRODUCT([[1,2],[3,4]], [[1,0],[0,1]])`;
    const result = evaluateFormula(formulatest); 
    console.log(result) //results to zero | answer should be 5

    console.log(formulajs.SUMPRODUCT([[1,2],[3,4]], [[1,0],[0,1]])) // results to 5
    return (
        <Container className={`${classes.root} max-w-[100%] bg-gray-100`}>

            {cells.map((cell) => <InputTest cell={cell} key={cell.address} />)}
        </Container>
    );
}

export default Calc