import { useEffect, useState } from "react";
import {
    Modal,
    Button,
    Text,
    TextInput,
    Grid,
    Stack,
    Select,
    PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useInputState, useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { ICompanyProps } from "@app/dashboard/components/table/utils/tableMethods";
import { useQuery } from "react-query";
import { useUserStore } from "@app/store/userState";
import { UserDataProp } from "@app/context/user.context";

const DeleteListUser: React.FC<any> = ({ item, manager, user, company, id, refetch }) => {
    const [opened, setOpened] = useState(false);
    const router = useRouter();
    const p = router.query;
    const [state, setState] = useState<string | null>(null);
    const [password, setPass] = useInputState("");
    const userZ = useUserStore((state) => (state.user))

    const form = useForm({
        initialValues: {
            status: 0,
        },
    });

    const handleSubmit = async () => {
        console.log('Delete')
        try {
            showNotification({
                id: "edit-comp",
                loading: true,
                title: `Updating ...`,
                message: "Please wait, updating edited row",
                autoClose: false,
                 
                color: "teal",
            });

            const response = await axios.patch(`/v1/company/${company}/user/${id}`,
                {
                    status: 0,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.tokens.access.token}`,
                    },
                }
            );

            if (response) {
                refetch();
                updateNotification({
                    id: "edit-comp",
                    color: "teal",
                    title: `Delete success!`,
                    message: "Delete succeeded! ",
                    icon: <IconCheck size={16} />,
                    autoClose: 2500,
                });
            }
            setOpened(false)
            console.log('delete res', response);
        } catch (error) {
            console.log('delete error', error);
            updateNotification({
                id: "edit-comp",
                color: "red",
                title: "Delete failed",
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
                size="xl"
                padding={0}
            >
                <Text
                    weight={700}
                    color="gray"
                    className="pt-[20px] text-[30px] !bg-[#073e52] text-white"
                    align="center"
                >
                    Delete {item.email}?
                </Text>

                <Text
                    weight={400}
                    color="gray"
                    className="pb-[20px] text-[14px] !bg-[#073e52] text-white"
                    align="center"
                >
                    This action cannot be undone
                </Text>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack
                        justify="flex-start"
                        sx={(theme) => ({
                            backgroundColor:
                                theme.colorScheme === "dark"
                                    ? theme.colors.dark[8]
                                    : theme.colors.gray[0],
                            height: 150,
                        })}
                    >
                        <Grid
                            className="ml-[30px] mr-[30px] mt-[40px] mb-[15px]"
                        >
                            <Text>Are you sure you want to delete {item.email}? This action cannot be undone and all created ROIs may be lost. </Text>
                        </Grid>
                    </Stack>

                    <Grid justify="flex-end" className="m-[20px]">
                        <Button
                            type="submit"
                            radius="sm"
                            size="sm"
                            color="red"
                            className="mr-[10px]"
                        >
                            Delete {item.email}
                        </Button>
                        <Button
                            type="button"
                            radius="sm"
                            size="sm"
                            onClick={() => setOpened(false)}
                            className="bg-white text-black border-gray-500"
                        >
                            Close
                        </Button>
                    </Grid>
                </form>
            </Modal>

            <Button
                type="button"
                leftIcon={<AiOutlineEdit />}
                radius="sm"
                size="xs"
                onClick={() => setOpened(true)}
                className="ml-[5px]"
                color="red"
            >
                Delete
            </Button>
        </>
    );
};

export default DeleteListUser;
