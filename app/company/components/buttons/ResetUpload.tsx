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

const ResetUpload: React.FC<any> = ({ file, reset, openReset, setOpenReset }) => {
    console.log('file', file?.name);
    return (
        <>
            <Modal
                opened={openReset}
                onClose={() => setOpenReset(false)}
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
                    Reset upload
                </Text>
                <Stack
                    justify="flex-start"
                    // sx={(theme) => ({
                    //     backgroundColor:
                    //         theme.colorScheme === "dark"
                    //             ? theme.colors.dark[8]
                    //             : theme.colors.gray[0],
                    //     height: 150,
                    // })}
                    h={150}
                >
                    <Grid
                        className="ml-[30px] mr-[30px] mt-[40px] mb-[15px]"
                    >
                        <Text className="text-[20px]">Are you sure you want to delete the file - {file?.name} ?. </Text>
                    </Grid>
                </Stack>

                <Grid justify="flex-end" className="m-[20px]">
                    <Button
                        type="button"
                        radius="sm"
                        size="sm"
                        color="red"
                        className="mr-[10px]"
                        onClick={reset}
                    >
                        Delete
                    </Button>
                    <Button
                        type="button"
                        radius="sm"
                        size="sm"
                        onClick={() => setOpenReset(false)}
                        className="bg-white text-black border-gray-500"
                    >
                        Close
                    </Button>
                </Grid>
            </Modal>

            <Button
                type="button"
                radius="sm"
                size="xs"
                onClick={() => setOpenReset(true)}
                className="ml-[5px]"
                color="red"
                disabled={!file}
            >
                Reset
            </Button>
        </>
    );
};

export default ResetUpload;
