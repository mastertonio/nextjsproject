import CheckboxChoices, { iChoicesTypeProps, iOtherTypeProps } from "@app/enterprise/components/CheckboxChoices";
import DropdownChoices from "@app/enterprise/components/DropdownChoices";
import FloatingCard from "@app/enterprise/components/FloatingCard";
import {
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    Container,
    Grid,
    SimpleGrid,
    TextInput,
    Stack,
    Flex,
    Tooltip,
    Textarea,
    Divider,
    Slider,
    Rating,
    NumberInput,
    Input,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import {
    IconQuestionMark,
    IconZoomQuestion,
    IconCalculator,
    IconAt,
} from "@tabler/icons";
import { FaGripLinesVertical } from 'react-icons/fa'
import { ReactNode, useEffect, useState } from "react";
import styles from "@styles/tiptap.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import { useModalCalculateStore } from "@app/store/builder/modalStores";
import CalculationModal from "@app/core/components/modal";
// import { useForm } from "@mantine/form";

export type iVariableProp = {
    id: string;
    type: string;
    label: string;
    format: string;
    icon: ReactNode | null,
    rightSection: ReactNode | null,
    disabled: boolean
    other: iOtherTypeProps
    choices: iChoicesTypeProps[]
    content: string
};

export type iElemsProp = {
    id: string;
    type: string;
    text: string;
    toggle: boolean,
    elements: iVariableProp[];
};


type iGrayProps = {
    type: string,
    classes?: string,
    elements: iElemsProp[]
}

type iVariablesProps = {
    id: string;
    label?: string;
    type: string;
    text?: string;
    elems?: iElemsProp[];
};

type Itest = {
    gray: iElemsProp
}

export type iSectionProps = {
    id: number
    title: string
    type: string
    format: string
    tooltip: string
    appendedText: string
    formula: string
    address: string
}

const NewInputVariable: React.FC<iGrayProps> = ({
    type,
    classes,
    elements,
}) => {
    const [show, setShow] = useState<boolean>(false)
    const [value, toggle] = useToggle(['teal', 'red']);
    const showModalValue = useModalCalculateStore((state) => state.value)
    const showModalCalculate = useModalCalculateStore((state) => state.show)
    const hideModalCalculate = useModalCalculateStore((state) => state.hide)
    const FormulaParser = require('hot-formula-parser').Parser
    const parser = new FormulaParser()


    const hide = () => {
        setShow((prevState) => !prevState)
    }

    const { register, handleSubmit, control } = useForm({
        mode: 'onBlur'
    });

    const [dataR, setData] = useState();

    const onSubmit = (event: any) => {
        event.preventDefault()
    }
    const [data1, setData1] = useState(0);
    const [data2, setData2] = useState(0);
    const [result, setResult] = useState(0);
    const [storage, setStorage] = useState<iSectionProps[]>([]);
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "test", // unique name for your Field Array
    });


    useEffect(() => {
        const formValue = JSON.parse(localStorage.getItem("formValue") ?? '[]') as iSectionProps[];
        setStorage(formValue)
        // const elementValue = formValue.map((value) => {
        //     return value;
        // })
        console.log('localStorage', storage);
        console.log('dataR', dataR)
    }, [dataR])


    return (
        <Grid
            className="mt-[10px] mb-[10px] p-[10px] w-full"
        >
            <Stack pb={20} className="bg-[white] p-[10px] ml-[15px] rounded-[12px] w-[96%] sm:w-[76%] pb-[30px] sm:pb-[20px]">
                <form onBlur={
                    handleSubmit((data) => {
                        let stringed = "0"
                        let result: number[] = []
                        //get values of all id in form
                        Object.values(data).map(elem => {
                            result.push(+elem)
                            stringed = stringed + `,${+elem}`
                        })
                        setResult(result.reduce((partialSum, a) => partialSum + a, 0))
                        const parsed = parser.parse(`SUM(${stringed})`)
                        setData(parsed.result)
                    }

                    )}>
                    {type == "variables" ? elements.map((elem) => (
                        <div key={elem.id}>
                            <Grid className="flex items-center">
                                <Text ml={30} dangerouslySetInnerHTML={{ __html: elem.text }} color="dark" fz="xl" fw={700}></Text>
                                {elem.toggle ? (
                                    <Button type="button" className="sm:ml-auto w-[100%] sm:w-[30%] m-[20px] sm:m-[40px]" color={value} onClick={() => toggle()} radius="md" size="md">
                                        {value == "red" ? "Exclude" : "Include"}
                                    </Button>)
                                    : ""
                                }
                            </Grid>

                            <Divider my="sm" color="gray" size="sm" variant="dashed" />
                            <Stack>
                                {storage.length > 0 ? storage.map((state) => (
                                    <Grid
                                        key={state.id}
                                        className="ml-[30px] mr-[30px] mt-[7px] mb-[3px]"
                                    >
                                        <Text className="text-[14px] w-[100%] md:w-[300px] 2xl:w-[450px] mb-[10px] sm:mb-0">{state.title}: </Text>
                                        {state.type == "textarea" ? (
                                            <Textarea
                                                className="ml-auto w-[400px] md:w-[300px] 2xl:w-[400px]"
                                                withAsterisk
                                            />) : state.type == "stars" ? (
                                                <>
                                                    <Rating
                                                        defaultValue={5}
                                                        fractions={2}
                                                        className="w-[280px] ml-[30px] sm:ml-auto mt-[10px] sm:mt-0"
                                                        color="indigo" size="xl" />
                                                </>
                                            ) : state.type == "slider" ? (
                                                <>
                                                    <Slider
                                                        thumbSize={26}
                                                        thumbChildren={<FaGripLinesVertical />}
                                                        size={15}
                                                        color="teal"
                                                        radius="xs"
                                                        className="w-[400px] ml-auto" defaultValue={10}
                                                        styles={(theme) => ({
                                                            track: {
                                                                borderRadius: 0,
                                                            },
                                                            thumb: {
                                                                height: 30,
                                                                width: 30,
                                                                borderColor: '#D9D9D9',
                                                                backgroundColor: theme.white,
                                                                borderWidth: 1,
                                                                boxShadow: theme.shadows.sm,
                                                                borderRadius: 3,
                                                                color: '#E8E7E6'
                                                            },
                                                        })}
                                                    />
                                                </>
                                            ) : state.type == "input" ? (
                                                <Input
                                                    className="ml-auto w-[400px] md:w-[300px] 2xl:w-[400px] "
                                                    // icon={state.icon ? state.icon : ""}
                                                    type="number"
                                                    key={state.id}
                                                    // id={state.id}
                                                    {...register(`input${state.id}`)}
                                                    // onBlur={()=> this.refs.form.getDOMNode().dispatchEvent(new Event("submit"))}
                                                    // rightSection={
                                                    //   // state.rightSection ?
                                                    //   // <Tooltip label="Sample Tooltip on calculator, content will be populated in the future" events={{ hover: true, focus: true, touch: false }}>
                                                    //     <Button type="submit" variant="subtle" color="gray" radius="xs" size="xs" compact><IconCalculator size="18" /></Button>
                                                    //   // </Tooltip> : ""
                                                    // }
                                                    // disabled={state.disabled ? true : false}
                                                    placeholder="$0"
                                                // defaultValue={myCompany.name}
                                                />) : state.type == "inputB" ? (
                                                    <div className="flex items-center ml-auto remove-radius" key={state.id}>
                                                        <NumberInput
                                                            className="w-[100px] md:w-[255px] 2xl:w-[255px]"
                                                            // icon={state.icon ? state.icon : ""}
                                                            hideControls
                                                            // rightSection={state.rightSection ?
                                                            //     <Tooltip label="Sample Tooltip on calculator, content will be populated in the future" events={{ hover: true, focus: true, touch: false }}>
                                                            //         {state.rightSection}
                                                            //     </Tooltip> : ""
                                                            // }
                                                            rightSectionProps={{
                                                                onClick: showModalCalculate
                                                            }}
                                                            disabled
                                                            value={result}
                                                        />
                                                        <Button
                                                            type="submit"
                                                            radius="xs"
                                                            size="sm"
                                                            className="w-[150px] sm:w-[unset] text-[12px] sm:text-[unset] rounded-l-none"
                                                            disabled
                                                        >
                                                            Lost Opportunities
                                                        </Button>
                                                    </div>
                                                ) : (
                                            <NumberInput
                                                className="ml-auto w-[400px] md:w-[300px] 2xl:w-[400px]"
                                                // icon={state.icon ? state.icon : ""}
                                                hideControls
                                                // rightSection={state.rightSection ?
                                                //     <Tooltip label="Sample Tooltip on calculator, content will be populated in the future" events={{ hover: true, focus: true, touch: false }}>
                                                //         {state.rightSection}
                                                //     </Tooltip> : ""
                                                // }
                                                rightSectionProps={{
                                                    onClick: showModalCalculate
                                                }}
                                                key={state.id}
                                                disabled
                                                value={result}
                                            // defaultValue={myCompany.name}
                                            />)
                                        }
                                    </Grid>)) : ""}
                            </Stack>
                        </div>)) : ""}
                    {/* <input type="submit" /> */}
                    {/* <h3>{result}</h3> */}
                    <h2>{dataR}</h2>
                </form>
            </Stack>

            <div className="ml-[15px] sm:ml-auto w-full sm:w-[22%] mt-[10px] sm:mt-0">
                <FloatingCard />
            </div>

            <CalculationModal showModal={showModalValue} setClose={hideModalCalculate} />
        </Grid>

    );
};

export default NewInputVariable;
