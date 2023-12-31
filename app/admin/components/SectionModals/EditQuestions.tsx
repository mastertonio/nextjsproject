import React, { useEffect } from 'react'
import { Modal, Button, Divider, Text, TextInput, Textarea, Grid, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
// import RichTextSection from '@app/core/components/richtext/RichTextSection';
import FormSelect from '@app/core/components/dropdown/SelectChoice';
import { useModalEntryStore } from '@app/store/builderStore';
import { useNewStore, useQuestionPropsStore } from '@app/store/builder/builderState';
import { iSectionData } from '../Sections';
import { useLocalStorage } from '@mantine/hooks';

interface QuestionProps {
    id: number
    title: string
    type: string
    format: string
    tooltip: string
    appendedText: string
    formula: string
    address: string
}

interface IModalEntryProps {
    items: QuestionProps[];
    setOpened: (b: boolean) => void
    setOpenChoice: (b: boolean) => void
    open: boolean
}

const EditQuestions: React.FC<any> = ({ items, setOpened, open, setOpenChoice }) => {
    const choiceValue = useNewStore((state) => state.choiceValue);
    const updateQuestions = useQuestionPropsStore((state) => state.updateQuestions);
    const form = useForm({
        initialValues: {
            formEntry: [{
                id: items.id,
                title: items.title,
                type: items.type,
                choices: "",
                format: items.format,
                decimalPlace: items.decimalPlace ? items.decimalPlace : "",
                currency: items.currency ? items.currency : "",
                tooltip: items.tooltip,
                appendedText: items.appendedText,
                prefilled: items.prefilled,
                formula: items.formula,
                address: items.address,
                sections: items.sections,
            }],
        },
    })

    // console.log('edit', items)

    useEffect(() => {
        form.setValues({
            formEntry: [{
                id: items.id,
                title: items.title,
                type: items.type,
                choices: "",
                format: items.format,
                decimalPlace: items.decimalPlace ? items.decimalPlace : "",
                currency: items.currency ? items.currency : "",
                tooltip: items.tooltip,
                appendedText: items.appendedText,
                prefilled: items.prefilled,
                formula: items.formula,
                address: items.address,
                sections: items.sections,
            }],
        })
    }, [items])


    const handleSubmit = async (values: typeof form.values) => {
        try {
            console.log('update entries', values.formEntry[0]);
            updateQuestions({ values })
            setOpened(false)
            form.reset();
        } catch (error) {
            console.log(error);
        }
    }

    const addChoice = () => {
        setOpenChoice(true)
        setOpened(false)
    }

    const dataSelect = [
        { value: 'Input', label: 'Input' },
        { value: 'Output', label: 'Output' },
        { value: 'Textarea', label: 'Textarea' },
        { value: 'Dropdown', label: 'Dropdown' },
        { value: 'Radio', label: 'Radio' },
        { value: 'Checkbox', label: 'Checkbox' },
        { value: 'Slider', label: 'Slider' },
        { value: 'Header', label: 'Header' },
        { value: 'HTML', label: 'HTML' },
        { value: 'Ratings', label: 'Ratings' },
    ];

    const format = [
        { value: "Text", label: "Text" },
        { value: "Currency", label: "Currency" },
        { value: "Percent", label: "Percent" },
        { value: "Number", label: "Number" },
    ];

    const currencyFormat = [
        { value: "USD", label: "USD" },
    ]

    const sections = [
        { value: "Average Salary", label: "Average Salary" },
    ]

    return (
        <Modal opened={open} onClose={() => setOpened(false)} size="920px" title="Update Entry" padding={0} className="section-wrapper">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
                    <Grid className="p-[10px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Auto ID: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("formEntry.0.id")}
                            disabled={true}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[20px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Entry Name: </Text>
                        <Textarea
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps(`formEntry.0.title`)}
                        />

                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Type: </Text>
                        <div className="w-[100%] sm:w-[75%]">
                            <Select
                                placeholder="Choose"
                                data={dataSelect}
                                {...form.getInputProps("formEntry.0.type")}
                            />
                        </div>
                    </Grid>

                    {form.values.formEntry[0].type === 'Dropdown' || form.values.formEntry[0].type === 'Radio' || form.values.formEntry[0].type === 'Checkbox' ? (
                        <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Choices: </Text>
                            <Button
                                type="button"
                                radius="sm"
                                size="sm"
                                color="teal"
                                className="ml-auto w-[100%] sm:w-[unset]"
                                onClick={addChoice}
                            >
                                Add New Choice
                            </Button>
                        </Grid>
                    ) : null}

                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Format: </Text>
                        <div className="w-[100%] sm:w-[75%]">
                            <Select
                                placeholder="Choose"
                                data={format}
                                {...form.getInputProps("formEntry.0.format")}
                            />
                        </div>
                    </Grid>

                    {form.values.formEntry[0].format === "Number" || form.values.formEntry[0].format === "Percent" || form.values.formEntry[0].format === "Currency" || items.format === "Number" || items.format === "Percent" || items.format === "Currency" ? (
                        <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Decimal Place: </Text>
                            <TextInput
                                required
                                className="w-[100%] sm:w-[75%] ml-auto"
                                {...form.getInputProps("formEntry.0.decimalPlace")}
                            />
                        </Grid>
                    ) : null}

                    {form.values.formEntry[0].format === "Currency" || items.format === "Currency" ? (
                        <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Currency: </Text>
                            <div className="w-[100%] sm:w-[75%]">
                                <Select
                                    placeholder="Choose"
                                    data={currencyFormat}
                                    {...form.getInputProps("formEntry.0.currency")}
                                />
                            </div>
                        </Grid>
                    ) : null}

                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Helpful Tip: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("formEntry.0.tooltip")}
                        />
                    </Grid>
                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Prefilled Value: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("formEntry.0.prefilled")}
                        />
                    </Grid>
                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Append Value: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("formEntry.0.appendedText")}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Address: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("formEntry.0.address")}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Formula: </Text>
                        <Textarea
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("formEntry.0.formula")}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Other Sections: </Text>
                        <div className="w-[100%] sm:w-[75%]">
                            <Select
                                placeholder="Choose"
                                data={sections}
                                {...form.getInputProps("formEntry.0.sections")}
                            />
                        </div>
                    </Grid>

                    <Divider className="mt-[30px] mb-[30px]" />

                    <Grid justify="flex-end" className="mt-[20px] mb-[20px] sm:mb-0 flex flex-col sm:flex-row m-0 sm:m-[-8px] pt-0 sm:pt-[20px">
                        <Button
                            type="submit"
                            radius="sm"
                            size="sm"
                            color="teal"
                            className="mr-0 sm:mr-[10px] mb-[10px]"
                        >
                            Update Entry
                        </Button>
                        <Button
                            type="button"
                            radius="sm"
                            size="sm"
                            color="red"
                            className="mr-0 sm:mr-[10px] mb-[10px]"
                        >
                            Delete
                        </Button>
                        <Button
                            type="button"
                            radius="sm"
                            size="sm"
                            color="gray"
                            className="mr-0 sm:mr-[10px]"
                            onClick={() => setOpened(false)}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </div>
            </form>
        </Modal>
    )
}

export default EditQuestions