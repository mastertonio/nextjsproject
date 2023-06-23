import React, { useState } from 'react'
import { Modal, Button, Divider, Text, TextInput, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useModalEntryStore } from '@app/store/builderStore';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useCardStore, useTokenStore } from '@app/store/builder/builderState';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { UserDataProp } from '@app/context/user.context';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

interface IModalEntryProps {
    showModal: boolean
    setOpened: (b: any) => void
    setClose: (b: any) => void
    open: boolean
    cardID: string
    user: UserDataProp
    adminId: string
    id?: string
}

const EditVideoModal: React.FC<any> = ({ id, adminId, user, cardID, setOpened, setClose, open, contentElem }) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const hideModal = useModalEntryStore((state) => state.hide);
    const tokenChar = useTokenStore((state) => state.tokenChar);
    const setVideoLink = useCardStore((state) => state.updateSectionVideoLink)
    const [value, setValue] = useState<string>("")
    const form = useForm({
        initialValues: {
            link: ""
        }
    })

    console.log('contentElem', value.toString())

    const ModalTitle = (title: string) => (
        <div className="flex flex-row items-center">
            <HiOutlineDocumentText className="mr-[10px] text-[36px] sm:text-[26px]" />
            <Text className="text-[18px] sm:text-[22px] mb-0 mt-[3px] font-semibold">{title}</Text>
        </div>
    )

    const sectionVideoLink = useMutation({
        mutationFn: (roi: any) =>
            axios.patch(`/v1/company/admintool/${adminId}/section/${id}/element/${contentElem}`,
                {
                    headers: {
                        title: {
                            content: {
                                elements: [
                                    {
                                        dataType: "media",
                                        class: "col-lg-5",
                                        span: "auto",
                                        mediaOrigin: "video",
                                        link: roi.toString()
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.tokens.access.token}`
                    }
                }
            ).then((response) => {
                console.log('video link response', roi);
                response.data
            }),
        onMutate: (roi) => {
            console.log("Section Write Up", roi)
            showNotification({
                id: "add-video",
                loading: true,
                title: `Adding Video`,
                message: "Please wait ...",
                autoClose: false,

            });
        },
        onSuccess: (newRoi) => {
            console.log('link success', newRoi)
            setOpened(false)
            setClose(cardID)
            Promise.all(
                [
                    queryClient.invalidateQueries({ queryKey: ['adminToolData'] }),
                    queryClient.invalidateQueries({ queryKey: ['enterpriseData'] }),
                    // queryClient.invalidateQueries({ queryKey: ['ranking_list'] })
                ]
            )
            updateNotification({
                id: "add-video",
                color: "teal",
                title: `Video Added!`,
                message: "",
                icon: <IconCheck size={16} />,
                autoClose: 3000,
            });
        },
        onError: (error) => {
            console.log("link error", error)
            setOpened(false)
            setClose(cardID)
            if (error instanceof Error) {
                updateNotification({
                    id: "add-video",
                    color: "red",
                    title: `Video Add failed`,
                    message: error.message,
                    autoClose: false,
                });
            }

            updateNotification({
                id: "add-video",
                color: "red",
                title: `Video Add failed`,
                message: "Something went wrong, Please try again",
                autoClose: false,
            });
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
        <Modal opened={open} onClose={() => setClose(cardID)} size="920px" title={ModalTitle('Update Video')} padding={0} className="section-wrapper section-modal w-[100%] sm:-w-[700px] mx-auto" id={cardID} key={cardID}>
            <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
                <Grid className="p-[10px]">
                    <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Video Link </Text>
                    <TextInput
                        required
                        className="w-[100%] sm:w-[75%] ml-auto"
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
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
                        onClick={() => {
                            sectionVideoLink.mutateAsync(value)
                            setClose(cardID)
                        }}
                    >
                        Add Media
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
        </Modal>
    )
}

export default EditVideoModal