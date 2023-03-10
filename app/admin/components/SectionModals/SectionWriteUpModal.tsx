import React from 'react'
import { Modal, Button, Divider, Text, Textarea, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useModalEntryStore } from '@app/store/builderStore';
import { HiOutlineDocumentText } from 'react-icons/hi'

interface IModalEntryProps {
    showModal: boolean
    setOpened: (b: boolean) => void
    open: boolean
}

const SectionWriteUpModal: React.FC<IModalEntryProps> = ({ showModal, setOpened, open }) => {
    const hideModal = useModalEntryStore((state) => state.hide);
    const form = useForm({
        initialValues: {
            sectioWriteUp: "",
        }
    })

    const ModalTitle = (title: string) => (
        <div className="flex flex-row items-center">
            <HiOutlineDocumentText className="mr-[10px] text-[26px]" />
            <Text className="text-[22px] mb-0 mt-[3px] font-semibold">{title}</Text>
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
        <Modal opened={open} onClose={() => setOpened(false)} size="920px" title={ModalTitle('Change New Section Writeup')} padding={0} className="section-wrapper section-modal w-[800px] mx-auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
                    <Grid className="p-[10px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Section Writeup: </Text>
                        <Textarea
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("sectioWriteUp")}
                        />
                    </Grid>


                    <Divider className="mt-[40px] mb-[40px]" />

                    <Grid justify="flex-end" className="flex flex-col sm:flex-row m-0 sm:m-[-8px]">
                        <Button
                            type="submit"
                            radius="sm"
                            size="sm"
                            color="teal"
                            className="mr-0 sm:mr-[10px]"
                        >
                            Create Section
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

export default SectionWriteUpModal