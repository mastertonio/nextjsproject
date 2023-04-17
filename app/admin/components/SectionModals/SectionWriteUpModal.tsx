import React from 'react'
import { Modal, Button, Divider, Text, Textarea, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useModalEntryStore } from '@app/store/builderStore';
import { HiOutlineDocumentText } from 'react-icons/hi'
import { useCardStore, useTokenStore } from '@app/store/builder/builderState';

interface IModalEntryProps {
    showModal: boolean
    setOpened: (b: boolean) => void
    open: boolean
    cardID: string
}

const SectionWriteUpModal: React.FC<IModalEntryProps> = ({ showModal, setOpened, open, cardID }) => {
    const hideModal = useModalEntryStore((state) => state.hide);
    const setWriteup = useCardStore((state) => state.updateSectionWriteUp)
    const tokenChar = useTokenStore((state) => state.tokenChar);
    const form = useForm({
        initialValues: {
            sectioWriteUp: "",
        }
    })

    console.log('card id: ', cardID)

    const ModalTitle = (title: string) => (
        <div className="flex flex-row items-center">
            <HiOutlineDocumentText className="mr-[10px] text-[36px] sm:text-[26px]" />
            <Text className="text-[18px] sm:text-[22px] mb-0 mt-[3px] font-semibold">{title}</Text>
        </div>
    )

    const handleSubmit = async (values: typeof form.values) => {
        try {
            console.log('Values: ', values)
            // setWriteup(cardID, values.sectioWriteUp)

            const data = {
                sections: [
                    {
                        address: "3c681809-0e2d-45fd-8603-124d6cde3cb2",
                        sectionTitle: "test title entry",
                        order: 1,
                        headers: {
                            dataType: "element",
                            mainTitle: {
                                dataType: "text",
                                style: "",
                                text: '<h1 class="text-left text-[green] text-[26px] sm:text-[2em]">ROI DASHBOARD | 2 Year Projection <span class="float-right">$0</span></h1>',
                            },
                            subTitle: {
                                dataType: "text",
                                text: values.sectioWriteUp,
                            },
                            description: "",
                            quotes: {
                                dataType: "",
                                position: "",
                                elements: [],
                            },
                        },
                        grayContent: {
                            dataType: "sliders",
                            classes: "row border-bottom gray-bg dashboard-header",
                            elements: [],
                        },
                    },
                ],
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${tokenChar}`,
                },
            };


            try {
                const res = await axios.put(
                    "/v1/company/62b2a6f9061ed2a095b55555/template/6287791836bddb586c11082a/version/64368eebd9ff1b8e24aa6323/adminTool",
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
        <Modal opened={open} onClose={() => setOpened(false)} size="920px" title={ModalTitle('Change New Section Writeup')} padding={0} className="section-wrapper section-modal w-[100%] sm:w-[800px] mx-auto">
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

export default SectionWriteUpModal