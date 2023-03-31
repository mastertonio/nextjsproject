import React from 'react'
import { Modal, Button, Divider, Text, TextInput, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useModalEntryStore } from '@app/store/builderStore';
import { HiOutlineDocumentText } from 'react-icons/hi'
import FormSelect from '@app/core/components/dropdown/FormSelect';
import { useBuilderStore } from '@app/store/builder/builderState';

interface IModalEntryProps {
    showModal: boolean
    setOpened: (b: boolean) => void
    setUpdateEntry: (b: boolean) => void
    open: boolean
}

const ModalAddQuestion: React.FC<IModalEntryProps> = ({ showModal, setOpened, open, setUpdateEntry }) => {
    const hideModal = useModalEntryStore((state) => state.hide);
    const addEmptySection = useBuilderStore((state) => state.addSection)
    const form = useForm({
        initialValues: {
            entryName: "",
            addToSection: "",
        }
    })

    const dataSelect = [
        { value: 'section1', label: 'New Section' },
        { value: 'section2', label: 'New Section 2' },
    ]

    const ModalTitle = (title: string) => (
        <div className="flex flex-row items-center">
            <HiOutlineDocumentText className="mr-[10px] text-[36px] sm:text-[26px]" />
            <Text className="text-[18px] sm:text-[22px] mb-0 mt-[3px] font-semibold">{title}</Text>
        </div>
    )

    const handleSubmit = async (values: typeof form.values) => {
        try {
            console.log('Values: ', values)
            addEmptySection();
            setOpened(false);
            setUpdateEntry(true);
            form.reset();
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <Modal opened={open} onClose={() => setOpened(false)} size="920px" title={ModalTitle('Add a New Entry')} padding={0} className="section-wrapper section-modal w-[100%] sm:w-[700px] mx-auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
                    <Grid className="p-[10px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Entry Name </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("entryName")}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-0">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Add to Section: </Text>
                        <div className="w-[100%] sm:w-[75%]">
                            <FormSelect data={dataSelect} values={{ ...form.getInputProps(`addToSection`) }} />
                        </div>
                    </Grid>

                    <Divider className="mt-[40px] mb-[40px]" />

                    <Grid justify="flex-end" className="flex flex-col sm:flex-row m-0 sm:m-[-8px]">
                        <Button
                            type="submit"
                            radius="sm"
                            size="sm"
                            color="teal"
                            className="mr-0 sm:mr-[10px] mb-[10px] sm:mb-0"
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
                            Close
                        </Button>
                    </Grid>
                </div>
            </form>
        </Modal>
    )
}

export default ModalAddQuestion