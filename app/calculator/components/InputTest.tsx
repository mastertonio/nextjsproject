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

type CellPropsType = {
    cell: CellProps
}


const InputTest: React.FC<CellPropsType> = ({ cell }) => {
    const { classes } = useStyles();
    const router = useRouter();
    const cells = useCalculatorStore((state) => (state.cells))
    const update = useCalculatorStore((state) => (state.update))
    // const [value, setValue] = useState(0)
    const FormulaParser = require('hot-formula-parser').Parser;
    const parser = new FormulaParser();
    const total = parser.parse(cell.formula).result
    const regex = /\(|\)/

    // useEffect(() => {
    //     console.log(cells, 'cells from otherworld')
    // }, [cells])

    // console.log(cells)

    const replaceValues = (addresses: string[]) => {
        // create a copy of the data array
        const newData = cells;
        // console.log(addresses)
        addresses.forEach((address) => {
            // find the object in the data array that matches the address
            const obj = newData.find((obj) => obj.address === address);
            if (obj && obj.formula) {
                // get the variables in the formula that start with "A"
                const variables = obj.formula.match(/A\d+/g);
                // console.log("i got in B", variables)

                // get all the values of A*


                // // set the evaluated value as the new value of the object
                // obj.value = eval(value);
            }

        });

        // set the updated data array as the new state
        // setData(newData);
        // console.log("i got in C")
    };

    if (!total) {
        if (cell.formula && !regex.test(cell.formula)) {
            const celltest = cells.filter(cellz => cellz.address == cell.address)
            const addresses = celltest[0].formula?.match(/A\d+/g)
            // console.log(addresses)
            if (addresses) {
                // console.log(addresses)
                replaceValues(addresses)
            }
        }
        // console.log(regex.test(cell.formula as string), cell.address)
    }

    return (
        // <NumberInput
        //     key={cell.address}
        //     label={cell.label}
        //     hideControls
        //     defaultValue={0}
        //     value={cell.value == Infinity ? 0 : cell.value}
        //     onBlur={(event: BaseSyntheticEvent) => {
        //         update({
        //             ...cell,
        //             value: +event.target.value
        //         })
        //         // console.log(cells, "from Inputtest")
        //     }}
        // />
        <></>
    )
}

export default InputTest