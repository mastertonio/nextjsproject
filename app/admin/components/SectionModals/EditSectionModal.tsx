import React, { useState } from 'react'
import { Modal, Button, Divider, Text, TextInput, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useModalEntryStore } from '@app/store/builderStore';
import { HiOutlineDocumentText } from 'react-icons/hi'
import { useCardStore } from '@app/store/builder/builderState';
import { MdAddBox, MdModeEdit, MdClose } from 'react-icons/md'
import { UserDataProp } from '@app/context/user.context';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

interface IModalEntryProps {
    id: string
    user: UserDataProp
    secName: string
    adminId: string
}

interface CardSection {
    id: string;
    sectioName: string;
}

const EditSectionModal: React.FC<IModalEntryProps> = ({ id, user, secName, adminId }) => {
    const [opened, setOpened] = useState(false);
    const hideModal = useModalEntryStore((state) => state.hide);
    const cards = useCardStore((state) => state.cards);
    const newCardName = useCardStore((state) => state.newCardName);
    const addCard = useCardStore((state) => state.addCard);
    const setNewCardName = useCardStore((state) => state.setNewCardName);
    const queryClient = useQueryClient()
    const form = useForm({
        initialValues: {
            sectioName: ""
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
            addCard()
            setOpened(false)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    const editSection = useMutation({
        mutationFn: (sect: string) => axios.patch(`/v1/company/admintool/${adminId}/section/${id}`, {
            sectionTitle: sect
        }, {
            headers: {
                Authorization: `Bearer ${user.tokens.access.token}`,
            },
        }).then((response) => response.data),
        onMutate: (roi) => {
            setOpened(false)
            showNotification({
                id: "update-section",
                loading: true,
                title: `Updating section`,
                message: "Please wait ...",
                autoClose: false,
                 
            });
        },
        onSuccess: (newRoi) => {
            console.log(newRoi, "roiroi")
            Promise.all(
                [
                    queryClient.invalidateQueries({ queryKey: ['adminToolData'] }),
                    queryClient.invalidateQueries({ queryKey: ['enterpriseData'] }),
                    // queryClient.invalidateQueries({ queryKey: ['ranking_list'] })
                ]
            )
            updateNotification({
                id: "update-section",
                color: "teal",
                title: `Section updated!`,
                message: "",
                icon: <IconCheck size={16} />,
                autoClose: 3000,
            });
        },
        onError: (error) => {
            if (error instanceof Error) {
                updateNotification({
                    id: "update-section",
                    color: "red",
                    title: `Update failed`,
                    message: error.message,
                    autoClose: false,
                });
            }

            updateNotification({
                id: "update-section",
                color: "red",
                title: `Update failed`,
                message: "Something went wrong, Please try again",
                autoClose: false,
            });
        }
    })

    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)} size="920px" title={ModalTitle(`Rename ${secName} section`)} padding={0} className="section-wrapper section-modal w-[100%] sm:w-[70%] mx-auto">
                <form onSubmit={form.onSubmit((values) => editSection.mutate(values.sectioName))}>
                    <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
                        <Grid className="p-[10px]">
                            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]"> New Section Name </Text>
                            <TextInput
                                required
                                className="w-[100%] sm:w-[75%] ml-auto"
                                {...form.getInputProps("sectioName")}
                            // onChange={(event) => setNewCardName(event.target.value)}
                            // value={newCardName}
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
                                Update Section
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
            <MdModeEdit onClick={() => setOpened(true)} className="!text-blue-600 text-[25px] mr-[10px] !cursor-pointer" />
        </>
    )
}

export default EditSectionModal