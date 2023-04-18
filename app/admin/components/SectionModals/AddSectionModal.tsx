import React from 'react'
import { Modal, Button, Divider, Text, TextInput, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useModalEntryStore } from '@app/store/builderStore';
import { HiOutlineDocumentText } from 'react-icons/hi'
import { useCardStore, useSectionBuilderStore, useTokenStore } from '@app/store/builder/builderState';
import { UserDataProp } from '@app/context/user.context';
import { useRouter } from 'next/router';

interface IModalEntryProps {
    showModal: boolean
    setOpened: (b: boolean) => void
    open: boolean,
    user: UserDataProp
}

interface CardSection {
    id: string;
    sectioName: string;
}

const AddSectionModal: React.FC<IModalEntryProps> = ({ showModal, setOpened, open, user }) => {
    const hideModal = useModalEntryStore((state) => state.hide);
    const cards = useCardStore((state) => state.cards);
    const newCardName = useCardStore((state) => state.newCardName);
    const tokenChar = useTokenStore((state) => state.tokenChar);
    const addCard = useCardStore((state) => state.addCard);
    const valueBucketName = useSectionBuilderStore((state) => state.valueBucketName);
    const addSection = useSectionBuilderStore((state) => state.addSection)
    const setValueBucketName = useSectionBuilderStore((state) => state.setValueBucketName)
    const setNewCardName = useCardStore((state) => state.setNewCardName);
    const router = useRouter()
    const form = useForm({
        initialValues: {
            sectioName: "",
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
            console.log("token", tokenChar);

            const newGrayContent = {
                text: values.sectioName,
                sliderType: "stacked",
                toggle: false,
                address: "CON1942",
                elements: []
            }

            const data = {}

            const config = {
                headers: {
                    Authorization: `Bearer ${user.tokens.access.token}`,
                },
            };


            try {
                const res = await axios.put(
                    `/v1/company/${router.query.comp_id}/template/${router.query.temp_id}/version/${router.query.id}/adminTool`,
                    data,
                    config
                );
                console.log("PUT response", res);
            } catch (error) {
                console.log("PUT ERROR", error);
            }

            setOpened(false)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <Modal opened={open} onClose={() => setOpened(false)} size="920px" title={ModalTitle('Add a New Section')} padding={0} className="section-wrapper section-modal w-[100%] sm:w-[70%] mx-auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
                    <Grid className="p-[10px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Section Name </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("sectioName")}
                        // onChange={(event) => setValueBucketName(event.target.value)}
                        // value={valueBucketName}
                        />
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

export default AddSectionModal