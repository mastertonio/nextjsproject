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
    data: any
}

interface CardSection {
    id: string;
    sectioName: string;
}

const AddSectionModal: React.FC<IModalEntryProps> = ({ showModal, setOpened, open, user, data }) => {
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

            const data = {
                sectionTitle: values.sectioName,
                order: 1,
                headers: {
                    title: {
                        dataType: "element",
                        mainTitle: {
                            dataType: "text",
                            style: "",
                            text: "<h1 class=\"text-left text-[green] text-[26px] sm:text-[2em]\">ROI DASHBOARD | 2 Year Projection <span class=\"float-right\">$0</span></h1>"
                        },
                        subTitle: {
                            dataType: "text",
                            text: "<hr><h3 class=\"text-[22px] font-bold\">Select a section below to review your ROI</h3>"
                        },
                        description: "<p class=\"text-[16px]\">To calculate your return on investment, begin with the first section below. The information entered therein will automatically populate corresponding fields in the other sections. You will be able to move from section to section to add and/or adjust values to best reflect your organization and process. To return to this screen, click the ROI Dashboard button to the left. <br><br></p>",
                        quotes: {
                            dataType: "revolver",
                            position: "bottom",
                            elements: [
                                {
                                    dataType: "quote",
                                    qoute: {
                                        text: "We love the tool! It is changing the conversation we have with our existing customers.",
                                        author: "David Verhaag, Vice President Customer Success"
                                    }
                                },
                                {
                                    dataType: "quote",
                                    qoute: {
                                        text: "Hey McDonaldx, I created an ROI for my first client yesterday and we closed today. The ROI Shop made getting approval from the CFO a piece of cake and resulted in my first sale!",
                                        author: "Natalie Grant - Sales Rep"
                                    }
                                }
                            ]
                        }
                    }
                },
                grayContent: {
                    dataType: "sliders",
                    classes: "row border-bottom gray-bg dashboard-header",
                    elements: [
                        {
                            dataType: "card",
                            label: "Conservative Factor:",
                            classes: "col-lg-4",
                            title: "Improve Win Rate",
                            sliderType: "stacked",
                            value: 50,
                            address: "CON1940"
                        },
                        {
                            dataType: "card",
                            label: "Reduce:",
                            classes: "col-lg-4",
                            title: "Improve Win Rate",
                            sliderType: "stacked",
                            value: 100,
                            address: "CON1941"
                        }
                    ]
                }
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${user.tokens.access.token}`,
                },
            };


            try {
                const res = await axios.put(
                    `https://api.theroishop.com/v1/company/628778331f0d2a1dec275404/template/6287791836bddb586c11082a/version/64368eebd9ff1b8e24aa6323/adminTool`,
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