import { createStyles, Image, Container, Title, Text, Button, SimpleGrid, NumberInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { Cell, CellProps, Sheet, UserState, useCalculatorStore } from "@app/store/builder/calculatorStore";
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
    const [value, setValue] = useState(0)

    useEffect(() => {
        console.log(cells)
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