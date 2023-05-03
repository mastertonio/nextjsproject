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

const EditListUser: React.FC<any> = () => {
    const [opened, setOpened] = useState(false);
    const router = useRouter();
    const p = router.query;
    const [state, setState] = useState<string | null>(null);
    const [password, setPass] = useInputState("");
    const userZ = useUserStore((state) => (state.user))

    const form = useForm({
        initialValues: {
            username: "",
            userTemplates: ""
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        console.log(values)
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
                    Edit User
                </Text>

                <Text
                    weight={400}
                    color="gray"
                    className="pb-[20px] text-[14px] !bg-[#073e52] text-white"
                    align="center"
                >
                    Change the username if a new user will be using this account
                </Text>

                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack
                        justify="flex-start"
                        sx={(theme) => ({
                            backgroundColor:
                                theme.colorScheme === "dark"
                                    ? theme.colors.dark[8]
                                    : theme.colors.gray[0],
                            height: 200,
                        })}
                    >
                        <Grid
                            className="ml-[30px] mr-[30px] mt-[40px] mb-[15px]"
                        >
                            <Text>Username: </Text>
                            <TextInput
                                required
                                className="w-[350px] ml-auto"
                                placeholder=""
                                {...form.getInputProps("username")}
                            />
                        </Grid>

                        <Grid
                            className="ml-[30px] mr-[30px] mt-[10px] mb-[15px]"
                        >
                            <Text>Pick User Template: </Text>
                            <TextInput
                                required
                                className="w-[350px] ml-auto"
                                placeholder=""
                                {...form.getInputProps("username")}
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
                            onClick={() => setOpened(false)}
                        >
                            Reset Username
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
            >
                Edit User
            </Button>
        </>
    );
};

export default EditListUser;
