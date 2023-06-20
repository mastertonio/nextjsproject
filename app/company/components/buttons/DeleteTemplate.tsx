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

const DeleteTemplate: React.FC<RemoveSectionModalProps> = ({ id,
    refetch,
    name,
    notes,
    status,
    user }) => {
    const [opened, setOpened] = useState(false);
    const [value] = useLocalStorage({ key: "auth-token" });
    const router = useRouter();
    const p = router.query;
    const userZ = useUserStore((state) => (state.user))
    const queryClient = useQueryClient()

    const form = useForm({
        initialValues: {
            name: name,
            notes: notes,
            status: status.toString(),
        },
    });

    type iDeleteTempProp = {
        title: string
    }

    const handleSubmit = async (values: typeof form.values) => {
        console.log("values del", values)
        try {
            showNotification({
                id: "edit-comp",
                loading: true,
                title: `Deleting ...`,
                message: "Please wait, deleting row",
                autoClose: false,

                color: "teal",
            });

            const response = await axios.patch(
                `/v1/company/${router.query.comp_id ? router.query.comp_id : user.user.company_id}/template/${id}`,
                {
                    name: name,
                    notes: 'For Delete',
                    status: 0,
                }, {
                headers: {
                    Authorization: `Bearer ${user.tokens.access.token}`,
                },
            }
            );

            console.log('delete template', response)

            if (response) {
                refetch();
                updateNotification({
                    id: "edit-comp",
                    color: "teal",
                    title: `Template deleted!`,
                    message: "A row was deleted! ",
                    icon: <IconCheck size={16} />,
                    autoClose: 2500,
                });
            }
        } catch (error) {
            console.log('delete template error', error)
            updateNotification({
                id: "edit-comp",
                color: "red",
                title: "Deleting a table row failed",
                message: "Something went wrong, Please try again",
                autoClose: false,
            });
            return error;
        }
    };


    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                withCloseButton={false}
                size="lg"
                padding={0}
            >
                <Text align="center" className="mt-[20px]">
                    <AiOutlineExclamationCircle size={70} color="#f8bb86" />
                </Text>
                <form onSubmit={form.onSubmit(handleSubmit)}>
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
                        Are you sure ?
                    </Text>
                    <Text
                        weight={300}
                        color="gray"
                        className="mb-[30px] text-[18px] text-gray-400 bg-white"
                        align="center"
                    >
                        You will not be able to recover{" "}
                        <Text weight={700} className="inline-block text-[18px]">
                            {name}
                        </Text>
                        !
                    </Text>
                    <Grid justify="flex-end" className="m-[20px]">
                        <Button
                            type="submit"
                            radius="sm"
                            size="sm"
                            color="red"
                            style={{ marginRight: 10 }}
                            onClick={() => {
                                setOpened(false)

                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            type="button"
                            radius="sm"
                            size="sm"
                            onClick={() => setOpened(false)}
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                borderColor: "gray",
                            }}
                        >
                            Close
                        </Button>
                    </Grid>
                </form>
            </Modal>
            <Button
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
            </Button>
        </>
    );
};

export default DeleteTemplate;
