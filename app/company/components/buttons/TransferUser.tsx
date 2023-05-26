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

const TransferUser: React.FC<any> = ({ item, manager, id, company, user, refetch }) => {
    const [opened, setOpened] = useState(false);
    const router = useRouter();
    const p = router.query;
    const [state, setState] = useState<string | null>(null);
    const [password, setPass] = useInputState("");
    const userZ = useUserStore((state) => (state.user))

    const form = useForm({
        initialValues: {
            transfer: "",
        },
    });

    const curData = [
        {
            label: "test@gmail.com",
            value: "test@gmail.com",
        },
    ]

    const handleSubmit = async (values: typeof form.values) => {
        console.log('Transfer values', values)
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
                    manager: values.transfer
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
                    title: `Transfer success!`,
                    message: "Transfer succeeded! ",
                    icon: <IconCheck size={16} />,
                    autoClose: 2500,
                });
            }
            setOpened(false)
            form.reset();
            console.log('tranfer res', response);
        } catch (error) {
            console.log('tranfer error', error);
            updateNotification({
                id: "edit-comp",
                color: "red",
                title: "Transfer failed",
                message: "Something went wrong, Please try again",
                autoClose: false,
            });
            form.reset();
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
                    Transfer User ROIs
                </Text>

                <Text
                    weight={400}
                    color="gray"
                    className="pb-[20px] text-[14px] !bg-[#073e52] text-white"
                    align="center"
                >
                    Transfer all of the user's ROIs to another user
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
                            <Text>Transfer {item.email} ROIs to: </Text>
                            <Select
                                data={manager}
                                placeholder="Select an Option"
                                {...form.getInputProps("transfer")}
                                className="w-[350px] ml-auto"
                            />
                        </Grid>
                    </Stack>
                    <Grid justify="flex-end" className="m-[20px]">
                        <Button
                            type="submit"
                            radius="sm"
                            size="sm"
                            color="teal"
                            className="mr-[10px]"
                        // onClick={() => setOpened(false)}
                        >
                            Transfer ROIs
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
                color="teal"
            >
                Transfer
            </Button>
        </>
    );
};

export default TransferUser;
