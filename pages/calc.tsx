import { createStyles, Image, Container, Title, Text, Button, SimpleGrid, NumberInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { Cell, CellProps, Sheet, UserState, useCalculatorStore, useCalculatorSheetStore } from "@app/store/builder/calculatorStore";
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useUtilityStore } from '@app/store/builder/utilityStore';
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

const Calc: React.FC = () => {
    const { classes } = useStyles();
    const router = useRouter();
    const cells = useCalculatorStore((state) => (state.cells))
    const update = useCalculatorStore((state) => (state.update))
    // Utilities
    const numToString = useUtilityStore((state) => (state.utility?.numToStr))
    const strToNumber = useUtilityStore((state) => (state.utility?.strToNum))
    const getCellsInRange = useUtilityStore((state) => (state.utility?.getCellsInRange))
    const isValidBinary = useUtilityStore((state) => (state.utility?.isValidBinary))
    const strRepeat = useUtilityStore((state) => (state.utility?.strRepeat))
    const repeat = useUtilityStore((state) => (state.utility?.repeat))
    const unique = useUtilityStore((state) => (state.utility?.unique))
    const initial = useUtilityStore((state) => (state.utility?.initial))
    const rest = useUtilityStore((state) => (state.utility?.rest))
    const arrayMerge = useUtilityStore((state) => (state.utility?.arrayMerge))
    const toArray = useUtilityStore((state) => (state.utility?.toArray))
    const objectToArray = useUtilityStore((state) => (state.utility?.objectToArray))
    const trimEmptyCell = useUtilityStore((state) => (state.utility?.trimEmptyCell))
    const rangeToTable = useUtilityStore((state) => (state.utility?.rangeToTable))
    const transposeTable = useUtilityStore((state) => (state.utility?.transposeTable))
    // End of Utilities
    const sheetFn = useCalculatorSheetStore((state) => (state.comparator?.equal))
    const sheetGreaterThan = useCalculatorSheetStore((state) => (state.comparator?.greater))
    const sheetLessThan = useCalculatorSheetStore((state) => (state.comparator?.less))
    const sheetLessEqual = useCalculatorSheetStore((state) => (state.comparator?.lessEqual))
    const sheetNotEqual = useCalculatorSheetStore((state) => (state.comparator?.notEqual))
    const [value, setValue] = useState(0)

    useEffect(() => {
        const sheetEqual = sheetFn(2, 2);
        const sheetGreater = sheetGreaterThan(3, 5);
        const sheetLess = sheetLessThan(2, 4);
        const sheetLessEqualFn = sheetLessEqual(2, 1);
        const sheetNotEqualFn = sheetNotEqual(2, 2);
        console.log('Equal', sheetEqual)
        console.log('Greater Than', sheetGreater)
        console.log('Less Than', sheetLess)
        console.log('Less Equal', sheetLessEqualFn)
        console.log('Not Equal', sheetNotEqualFn)

        numToString(4)
        strToNumber('j')
        getCellsInRange('A1:B2')
        isValidBinary('6')
        strRepeat('Hello ', 3)
        repeat('Repeat This ', 3, '* ')
        unique(['A1', 'B2', 'B2'])
        initial([2, 1, 2], 1, 2)
        rest([3, 2, 5], 3, 2)
        arrayMerge(['A1', 'B2', 'C2', 5],)
        toArray('1')
        objectToArray({ id: 1, name: 'Test' })
        trimEmptyCell({
            A1: "   ",
            A2: "Hello",
            A3: "",
            A4: 123,
            A5: "   World   "
        })
        rangeToTable({ A1: '1', A2: '2', B1: '3', B2: '4' })
        transposeTable(
            [
                [1, 2, 3, 4],
                [1, 2, 3, 4],
            ]
        )
    }, [cells])

    return (
        <Container className={`${classes.root} max-w-[100%] bg-gray-100`}>

            {cells.map((cell) => (
                <NumberInput
                    key={cell.address}
                    label={cell.label}
                    hideControls
                    defaultValue={cell.value}
                    onBlur={(event: BaseSyntheticEvent) => {
                        update({
                            ...cell,
                            value: +event.target.value
                        })
                    }}
                />
            ))}
        </Container>
    );
}

export default Calc