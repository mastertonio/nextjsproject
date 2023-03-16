import React from 'react'
import { Modal, Button, Divider, Text, TextInput, Textarea, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { HiOutlineDocumentText } from 'react-icons/hi'
import RichTextSection from '@app/core/components/richtext/RichTextSection';
import FormSelect from '@app/core/components/dropdown/FormSelect';
import { useModalEntryStore } from '@app/store/builderStore';
import { useNewStore } from '@app/store/builder/builderState';
import { iSectionData } from '../Sections';

interface IModalEntryProps {
    showModal: boolean
    // sectionData: iSectionData[]
    // setSectionData: (arr: iSectionData[]) => void
    setOpened: (b: boolean) => void
    open: boolean
}

const AddNewChoiceModal: React.FC<IModalEntryProps> = ({ showModal, setOpened, open }) => {
    const setUpdateChoice = useNewStore((state) => state.setUpdateChoice)
    const hideModal = useModalEntryStore((state) => state.hide);
    const form = useForm({
        initialValues: {
            text: "",
            value: "",
            elementShow: "",
            format: "",
            toolTip: "",
            append: "",
            formula: "",
            address: ""
        }
    })

    const ModalTitle = (title: string) => (
        <div className="flex flex-row items-center">
            <HiOutlineDocumentText className="mr-[10px] text-[36px] sm:text-[26px]" />
            <Text className="text-[18px] sm:text-[22px] mb-0 mt-[3px] font-semibold">{title}</Text>
        </div>
    )

    const handleSubmit = async (values: typeof form.values) => {
        try {
            console.log('Values: ', values)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <Modal opened={open} onClose={() => setUpdateChoice(false)} size="920px" title={ModalTitle('Add New Choice')} padding={0} className="section-wrapper">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
                    <Grid className="p-[10px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Text: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("text")}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-0">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Value: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("value")}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-0">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Elements to Show: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("elementShow")}
                        />
                    </Grid>

                    <Divider className="mt-[30px] mb-[30px]" />

                    <Grid justify="flex-end" className="mt-[20px] mb-[20px] sm:mb-0 flex flex-col sm:flex-row m-0 sm:m-[-8px] pt-0 sm:pt-[20px">
                        <Button
                            type="button"
                            radius="sm"
                            size="sm"
                            color="teal"
                            className="mr-0 sm:mr-[10px] mb-[10px]"
                        >
                            Add Choice
                        </Button>
                        <Button
                            type="button"
                            radius="sm"
                            size="sm"
                            color="gray"
                            className="mr-0 sm:mr-[10px]"
                            onClick={() => setUpdateChoice(false)}
                        >
                            Cancel
                        </Button>
                    </Grid>


                    {/* <Grid className="p-[10px] mt-[20px] sm:mt-[40px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Format: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("format")}
                        />
                    </Grid>
                    <Grid className="p-[10px] mt-[10px] sm:mt-0">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Tooltip: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("tooltip")}
                        />
                    </Grid>
                    <Grid className="p-[10px] mt-[10px] sm:mt-0">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Append Value: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("append")}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-0">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Formula: </Text>
                        <Textarea
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("formula")}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-0">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Address: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("address")}
                        />
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
                            onClick={() => setUpdateChoice(false)}
                        >
                            Cancel
                        </Button>
                    </Grid> */}
                </div>
            </form>
        </Modal>
    )
}

export default AddNewChoiceModal