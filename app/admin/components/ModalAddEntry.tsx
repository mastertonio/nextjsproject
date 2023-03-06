import React, { useEffect } from 'react'
import { Modal, Button, Divider, Text, TextInput, Textarea, Grid, Code } from '@mantine/core';
import { useForm } from '@mantine/form';
import FormSelect from '@app/core/components/dropdown/FormSelect';
import { useModalAddEntryStore } from '@app/store/builderStore';
import { iSectionData } from './Sections';
import { useLocalStorage } from '@mantine/hooks';

interface IModalAddEntryProps {
    showModal: boolean
    sectionData: iSectionData[]
    setSectionData: (arr: iSectionData[]) => void
    setOpened: (b: boolean) => void
    open: boolean
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

const ModalAddEntry: React.FC<IModalAddEntryProps> = ({ showModal, setSectionData, sectionData, setOpened, open }) => {
    const hideModal = useModalAddEntryStore((state) => state.hide);
    const form = useForm({
        initialValues: {
            formEntry: [{
                id: Math.floor(Math.random() * 1000),
                title: "",
                type: "",
                format: "",
                tooltip: "",
                appendedText: "",
                formula: "",
                address: ""
            }]
        }
    })
    const [formValue, setFormValue] = useLocalStorage<iSectionProps[]>({ key: 'formValue', defaultValue: [] });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            form.insertListItem('formEntry', {
                id: Math.floor(Math.random() * 1000),
                title: values.formEntry[0].title,
                type: values.formEntry[0].type,
                format: values.formEntry[0].format,
                tooltip: values.formEntry[0].tooltip,
                appendedText: values.formEntry[0].appendedText,
                formula: values.formEntry[0].formula,
                address: values.formEntry[0].address
            })
            setFormValue([
                ...formValue,
                {
                    id: Math.floor(Math.random() * 1000),
                    title: values.formEntry[0].title,
                    type: values.formEntry[0].type,
                    format: values.formEntry[0].format,
                    tooltip: values.formEntry[0].tooltip,
                    appendedText: values.formEntry[0].appendedText,
                    formula: values.formEntry[0].formula,
                    address: values.formEntry[0].address
                }
            ]);
            setSectionData([
                ...sectionData,
                {
                    id: Math.floor(Math.random() * 1000),
                    title: values.formEntry[0].title,
                    type: values.formEntry[0].type,
                    format: values.formEntry[0].format,
                    tooltip: values.formEntry[0].tooltip,
                    appendedText: values.formEntry[0].appendedText,
                    formula: values.formEntry[0].formula,
                    address: values.formEntry[0].address
                }
            ])
            // form.insertListItem('formEntry', { ...values, key: Math.floor(Math.random() * 1000) })
            // setFormValue([...sectionData, { ...values, id: Math.floor(Math.random() * 1000) }])
            // setSectionData([...sectionData, { ...values, id: Math.floor(Math.random() * 1000) }])
            console.log('Values', values)
            console.log('Form list', form.values.formEntry)
            setOpened(false)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    // useEffect(() => {
    //     console.log('Form list', JSON.stringify(form.values, null, 2))
    // }, [])

    const dataSelect = [
        { value: 'input', label: 'Input' },
        { value: 'output', label: 'Output' },
        { value: 'textarea', label: 'Textarea' },
        { value: 'dropdown', label: 'Dropdown' },
        { value: 'slider', label: 'Slider' },
        { value: 'html', label: 'HTML' },
    ]

    return (
        <Modal opened={open} onClose={() => setOpened(false)} size="920px" title="Create a New Entry" className="section-wrapper" padding={0}>
            <form onSubmit={form.onSubmit(handleSubmit)}>

                <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
                    <Grid className="p-[10px]">
                        < Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]" > Title: </Text >
                        <Textarea
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps(`formEntry.0.title`)}
                        />
                    </Grid >

                    <Grid className="p-[10px] mt-[10px] sm:mt-0">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Type: </Text>
                        <div className="w-[100%] sm:w-[75%]">
                            <FormSelect data={dataSelect} values={{ ...form.getInputProps(`formEntry.0.type`) }} />
                        </div>
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-0">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Format: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps(`formEntry.0.format`)}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-0">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Tooltip: </Text>
                        <Textarea
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps(`formEntry.0.tooltip`)}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-0">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Appended Text: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps(`formEntry.0.appendedText`)}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-0">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Formula: </Text>
                        <Textarea
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps(`formEntry.0.formula`)}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-0">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Address: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps(`formEntry.0.address`)}
                        />
                    </Grid>

                    <Divider className="mt-[30px] mb-[30px]" />

                    <Code block>{JSON.stringify(form.values, null, 2)}</Code>

                    <Grid justify="flex-end" className="mt-[20px] mb-[20px] sm:mb-0 flex flex-col sm:flex-row m-0 sm:m-[-8px] pt-0 sm:pt-[20px">
                        <Button
                            type="submit"
                            radius="sm"
                            size="sm"
                            color="teal"
                            className="mr-0 sm:mr-[10px] mb-[10px]"
                        >
                            Create Entry
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
        </Modal >
    )
}

export default ModalAddEntry