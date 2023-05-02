import React from 'react'
import { Modal, Button, Divider, Text, TextInput, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useModalEntryStore } from '@app/store/builderStore';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useCardStore, useTokenStore } from '@app/store/builder/builderState';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { UserDataProp } from '@app/context/user.context';

interface IModalEntryProps {
    showModal: boolean
    setOpened: (b: any) => void
    setClose: (b: any) => void
    open: boolean
    cardID: string
    user: UserDataProp
}

const SectionVideoModal: React.FC<IModalEntryProps> = ({ showModal, setOpened, setClose, open, cardID, user }) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const hideModal = useModalEntryStore((state) => state.hide);
    const tokenChar = useTokenStore((state) => state.tokenChar);
    const setVideoLink = useCardStore((state) => state.updateSectionVideoLink)
    const form = useForm({
        initialValues: {
            formEntry: [{
                dataType: "media",
                span: "auto",
                class: "col-lg-5",
                mediaOrigin: "video",
                text: null,
                link: "",
            }]
        }
    })

    const ModalTitle = (title: string) => (
        <div className="flex flex-row items-center">
            <HiOutlineDocumentText className="mr-[10px] text-[36px] sm:text-[26px]" />
            <Text className="text-[18px] sm:text-[22px] mb-0 mt-[3px] font-semibold">{title}</Text>
        </div>
    )

    const sectionVideoLink = useMutation({
        mutationFn: (roi: any) =>
            axios.put(`/v1/company/${router.query.comp_id}/template/${router.query.temp_id}/version/${router.query.id}/adminTool`,
                {
                    "_id": "643f36cc92ecfde71079db69",
                    "sectionTitle": "test jjjjj", //nullable
                    "order": 1,
                    "content": {
                        "dataType": "headerElements",
                        "elements": roi
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.tokens.access.token}`
                    }
                }
            ).then((response) => response.data),
        onMutate: (roi) => {
            console.log("Section Write Up", roi)
        },
        onSuccess: (newRoi) => {
            setOpened(false)
            Promise.all(
                [
                    queryClient.invalidateQueries({ queryKey: ['adminToolData'] }),
                    queryClient.invalidateQueries({ queryKey: ['enterpriseData'] }),
                    // queryClient.invalidateQueries({ queryKey: ['ranking_list'] })
                ]
            )
        },
        onError: (error) => {
            if (error instanceof Error) {
            }
        }
    })

    // const handleSubmit = async (values: typeof form.values) => {
    //     try {
    //         console.log('Values: ', values)
    //         // setVideoLink(cardID, values.sectionVideo)
    //         setOpened(false)

    //         const newMedia = {
    //             dataType: "media",
    //             span: "auto",
    //             class: "col-lg-5",
    //             mediaOrigin: "video",
    //             text: null,
    //             link: values.sectionVideo,
    //         }

    //         const data = {
    //             sections: [
    //                 {
    //                     address: "3c681809-0e2d-45fd-8603-124d6cde3cb2",
    //                     sectionTitle: "test title entry",
    //                     order: 1,
    //                     headers: {
    //                         title: {
    //                             mainTitle: {
    //                                 dataType: "text",
    //                                 style: "",
    //                                 text: '<h1 class="text-left text-[green] text-[26px] sm:text-[2em]">ROI DASHBOARD | 2 Year Projection <span class="float-right">$0</span></h1>',
    //                             },
    //                             subTitle: {
    //                                 dataType: "text",
    //                                 text: '<hr><h3 class="text-[22px] font-bold">Select a section below to review your ROI</h3>',
    //                             },
    //                             description: "",
    //                             quotes: {
    //                                 dataType: "",
    //                                 position: "",
    //                                 elements: [],
    //                             },
    //                             content: {
    //                                 dataType: "headerElements",
    //                                 elements: [newMedia]
    //                             }
    //                         },
    //                     },
    //                     grayContent: {
    //                         dataType: "sliders",
    //                         classes: "row border-bottom gray-bg dashboard-header",
    //                         elements: [],
    //                     },
    //                 },
    //             ],
    //         };

    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${tokenChar}`,
    //             },
    //         };


    //         try {
    //             const res = await axios.put(
    //                 "/v1/company/62b2a6f9061ed2a095b55555/template/6287791836bddb586c11082a/version/64368eebd9ff1b8e24aa6323/adminTool",
    //                 data,
    //                 config
    //             );
    //             console.log("PUT response", res);
    //         } catch (error) {
    //             console.log("PUT ERROR", error);
    //         }

    //         setOpened(false)
    //     } catch (error) {
    //         console.log('Error: ', error)
    //     }
    // }


    return (
        <Modal opened={open} onClose={() => setClose(cardID)} size="920px" title={ModalTitle('Embed Video')} padding={0} className="section-wrapper section-modal w-[100%] sm:-w-[700px] mx-auto" id={cardID} key={cardID}>
            <form onSubmit={form.onSubmit((values) => sectionVideoLink.mutate(values.formEntry))}>
                <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
                    <Grid className="p-[10px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Video Link </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("sectionVideo")}
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
                            onClick={() => setClose(cardID)}
                        >
                            Close
                        </Button>
                    </Grid>
                </div>
            </form>
        </Modal>
    )
}

export default SectionVideoModal