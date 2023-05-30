import React, { useState } from 'react'
import { Modal, Button, Divider, Text, Textarea, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useModalEntryStore } from '@app/store/builderStore';
import { HiOutlineDocumentText } from 'react-icons/hi'
import { useCardStore, useTokenStore } from '@app/store/builder/builderState';
import RichTextSection from '@app/core/components/richtext/WriteUpRTE';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { UserDataProp } from '@app/context/user.context';
import { MdModeEdit } from 'react-icons/md';

interface IModalEntryProps {
    cardID: string
    user: UserDataProp
    adminId: string
    id?: string
    defData?: string
}

const SectionWriteUpModal: React.FC<IModalEntryProps> = ({ cardID, user, adminId, id, defData }) => {
    const router = useRouter()
    const hideModal = useModalEntryStore((state) => state.hide);
    const setWriteup = useCardStore((state) => state.updateSectionWriteUp)
    const initialValue =
        "<p></p>";
    const [value, setValue] = useState<string>(defData ? defData : initialValue)
    const queryClient = useQueryClient()
    const [opened, setOpened] = useState(false);
    const form = useForm({
        initialValues: {
            formEntry: [{
                dataType: "description",
                span: "auto",
                class: null,
                mediaOrigin: null,
                text: "",
                link: null,
            }]
        }
    })

    console.log('card id: ', cardID)

    const ModalTitle = (title: string) => (
        <div className="flex flex-row items-center">
            <HiOutlineDocumentText className="mr-[10px] text-[36px] sm:text-[26px]" />
            <Text className="text-[18px] sm:text-[22px] mb-0 mt-[3px] font-semibold">{title}</Text>
        </div>
    )

    const sectionWriteUp = useMutation({
        mutationFn: (roi: any) =>
            axios.patch(`/v1/company/admintool/${adminId}/section/${id}`,
                {
                    headers: {
                        title: {
                            description: roi
                        }
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.tokens.access.token}`
                    }
                }
            ).then((response) => response.data),
        onMutate: (roi) => {
            console.log(roi, "Section Write Up")
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
    //         // setWriteup(cardID, values.sectioWriteUp)

    //         const data = {
    //             sections: [
    //                 {
    //                     address: "3c681809-0e2d-45fd-8603-124d6cde3cb2",
    //                     sectionTitle: "test title entry",
    //                     order: 1,
    //                     headers: {
    //                         dataType: "element",
    //                         mainTitle: {
    //                             dataType: "text",
    //                             style: "",
    //                             text: '<h1 class="text-left text-[green] text-[26px] sm:text-[2em]">ROI DASHBOARD | 2 Year Projection <span class="float-right">$0</span></h1>',
    //                         },
    //                         subTitle: {
    //                             dataType: "text",
    //                             text: values.sectioWriteUp,
    //                         },
    //                         description: "",
    //                         quotes: {
    //                             dataType: "",
    //                             position: "",
    //                             elements: [],
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
        <>
            <Modal centered opened={opened} onClose={() => setOpened(false)} size="920px" title={ModalTitle('Change New Section Writeup')} padding={0} className="section-wrapper w-[100%] sm:w-[800px]" id={cardID} key={cardID} >
                <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
                    <Grid className="p-[10px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Section Writeup: </Text>
                        {/* <Textarea
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("sectioWriteUp")}
                        />
                        */}
                        <div className="w-[100%] sm:w-[75%] ml-auto">
                            <RichTextSection content={value} onChange={setValue} />
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
                            onClick={() => {
                                setOpened(false)
                                sectionWriteUp.mutateAsync(value)
                            }}
                        >
                            Create Section Write Up
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
            </Modal>
            <MdModeEdit
                className="text-blue-600 text-[20px] mr-[10px] cursor-pointer"
                onClick={() => {
                    setOpened(true)
                    // setGetID(card.id)
                }}

            />
        </>
    )
}

export default SectionWriteUpModal