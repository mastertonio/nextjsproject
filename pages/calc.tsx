import { createStyles, Image, Container, Title, Text, Button, SimpleGrid, NumberInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { Cell, CellProps, Sheet, UserState, useCalculatorStore, useCalculatorSheetStore } from "@app/store/builder/calculatorStore";
import { BaseSyntheticEvent, useEffect, useState } from 'react';

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


const Calc: React.FC = () => {
    const { classes } = useStyles();
    const router = useRouter();
    const cells = useCalculatorStore((state) => (state.cells))
    const update = useCalculatorStore((state) => (state.update))
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