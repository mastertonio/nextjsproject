import { useState } from "react";
import { Modal, Button, Text, TextInput, Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineDelete } from "react-icons/ai";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import axios from "axios";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useUserStore } from "@app/store/userState";
import { useMutation, useQueryClient } from "react-query";
import { MdClose } from 'react-icons/md'
import { UserDataProp } from "@app/context/user.context";

type RemoveSectionModalProps = {
    id: string;
    refetch: () => void;
    name: string;
    notes: string;
    status: string;
    user: UserDataProp
}

const DeleteVideoModal: React.FC<any> = ({ id, adminId, user, cardID, setOpened, setClose, open, contentElem }) => {
    // const [opened, setOpened] = useState(false);
    const [value] = useLocalStorage({ key: "auth-token" });
    const router = useRouter();
    const p = router.query;
    const userZ = useUserStore((state) => (state.user))
    const queryClient = useQueryClient()

    // const form = useForm({
    //     initialValues: {
    //         name: name,
    //         notes: notes,
    //         status: status.toString(),
    //     },
    // });

    type iDeleteTempProp = {
        title: string
    }

    const handleDelete = useMutation({
        mutationFn: () =>
            axios.patch(`v1/company/admintool/${adminId}/section/${id}/element/${contentElem}`, {
                headers: {
                    title: {
                        content: {
                            elements: [
                                {
                                    dataType: "media",
                                    class: "col-lg-5",
                                    span: "auto",
                                    mediaOrigin: "video",
                                    link: ""
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
                response.data
                console.log('response', response)
            }),
        onMutate: () => {
            showNotification({
                id: "delete-video",
                loading: true,
                title: `Deleting ...`,
                message: "Please wait...",
                autoClose: false,
            });
        },
        onSuccess: (videoRes) => {
            console.log('videoRes', videoRes)
            setOpened(false)
            setClose(cardID)
            Promise.all(
                [
                    queryClient.invalidateQueries({ queryKey: ['adminToolData'] }),
                    queryClient.invalidateQueries({ queryKey: ['enterpriseData'] }),
                ]
            )
            updateNotification({
                id: "delete-video",
                color: "teal",
                title: `Video Deleted!`,
                message: "",
                icon: <IconCheck size={16} />,
                autoClose: 3000,
            });
        },
        onError: (error) => {
            console.log('delete', error);
            setOpened(false)
            setClose(cardID)
            if (error instanceof Error) {
                updateNotification({
                    id: "delete-video",
                    color: "red",
                    title: `Video Delete failed`,
                    message: error.message,
                    autoClose: false,
                });
            }

            updateNotification({
                id: "delete-video",
                color: "red",
                title: `Video Delete failed`,
                message: "Something went wrong, Please try again",
                autoClose: false,
            });
        }
    })

    return (
        <>
            <Modal
                opened={open}
                onClose={() => setClose(cardID)}
                withCloseButton={false}
                size="lg"
                padding={0}
                id={cardID}
                key={cardID}
            >
                <Text align="center" className="mt-[20px]">
                    <AiOutlineExclamationCircle size={70} color="#f8bb86" />
                </Text>
                <Text
                    weight={500}
                    color="gray"
                    className="mt-[20px] text-[18px] text-gray-400 bg-white"
                    // style={{
                    //   paddingTop: 30,
                    //   paddingLeft: 30,
                    //   paddingRight: 30,
                    //   fontSize: 30,
                    //   backgroundColor: "white",
                    //   color: "gray",
                    // }}
                    align="center"
                >
                    Are you sure to delete video link?
                </Text>

                <Grid justify="flex-end" className="m-[20px]">
                    <Button
                        type="submit"
                        radius="sm"
                        size="sm"
                        color="red"
                        style={{ marginRight: 10 }}
                        onClick={() => {
                            handleDelete.mutateAsync();
                            setClose(cardID)
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        type="button"
                        radius="sm"
                        size="sm"
                        onClick={() => setClose(cardID)}
                        style={{
                            backgroundColor: "white",
                            color: "black",
                            borderColor: "gray",
                        }}
                    >
                        Close
                    </Button>
                </Grid>
            </Modal>
            {/* <MdClose
                className="text-red-600 text-[16px] cursor-pointer"
                onClick={() => {
                    setOpened(true);
                }}
            /> */}
            {/* <Button
                type="button"
                radius="sm"
                size="xs"
                onClick={() => {
                    setOpened(true);
                }}
                className="mr-[5px"
                color="red"
            >
                Delete
            </Button> */}
        </>
    );
};

export default DeleteVideoModal;
