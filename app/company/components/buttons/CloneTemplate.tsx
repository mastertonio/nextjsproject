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
    Textarea,
    NumberInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useInputState, useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import {
    ICompanyProps,
    ICompanyTemplatesProps,
} from "@app/dashboard/components/table/utils/tableMethods";
import { useQuery } from "react-query";
import { useUserStore } from "@app/store/userState";
import { UserDataProp } from "@app/context/user.context";

export interface IButtonTemplateProps {
    id: string;
    refetch: () => void;
    name: string;
    notes: string;
    status: string;
    user: UserDataProp
    version_id: string;
}

const CloneTemplate: React.FC<IButtonTemplateProps> = ({
    id,
    refetch,
    name,
    notes,
    status,
    user,
    version_id
}) => {
    const [opened, setOpened] = useState(false);
    const router = useRouter();

    const form = useForm({
        initialValues: {
            name,
            notes,
            status: status.toString(),
            month: 0,
            year: 0
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        const month = values.month;
        const year = Math.floor(values.year * 12);

        try {
            showNotification({
                id: "edit-comp",
                loading: true,
                title: `Cloning ...`,
                message: "Please wait, cloning row",
                autoClose: false,
                disallowClose: true,
                color: "teal",
            });

            const response = await axios.post(
                `/v1/company/${user.user.company_id}/template/${id}/version/${version_id}/clone`,
                {
                    name: values.name,
                    notes: values.notes,
                    status: parseInt(values.status),
                    projection: values.year !== 0 ? year : values.month !== 0 ? month : year
                }, {
                headers: {
                    Authorization: `Bearer ${user.tokens.access.token}`,
                },
            }
            );

            console.log('clone response', response);

            if (response) {
                refetch();
                updateNotification({
                    id: "edit-comp",
                    color: "teal",
                    title: `Template clone!`,
                    message: "A row was clone! ",
                    icon: <IconCheck size={16} />,
                    autoClose: 2500,
                });
            }

            router.push({ pathname: `/admin/builder/${response.data._id}`, query: { comp_id: user.user.company_id, temp_id: response.data._id, ver_id: response.data.templateVersion.id } })
        } catch (error) {
            updateNotification({
                id: "edit-comp",
                color: "red",
                title: "Cloning a table row failed",
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
                    className="p-[30px] text-[30px] !bg-[#073e52] text-white"
                    align="center"
                >
                    Clone Template
                </Text>

                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack
                        justify="flex-start"
                        sx={(theme) => ({
                            backgroundColor:
                                theme.colorScheme === "dark"
                                    ? theme.colors.dark[8]
                                    : theme.colors.gray[0],
                            height: 'auto',
                        })}
                    >
                        <Grid className="ml-[30px] mr-[30px] mt-[30px] mb-[15px]">
                            <Text className="text-[16px] text-slate-700 font-semibold mb-[10px] sm:mb-0">Name : </Text>
                            <TextInput
                                required
                                className="w-[550px] ml-auto"
                                // defaultValue={myCompany.licenses}
                                placeholder="Enter New Name"
                                {...form.getInputProps("name")}
                            />
                        </Grid>
                        <Grid className="ml-[30px] mr-[30px] mb-[15px]">
                            <Text className="text-[16px] text-slate-700 font-semibold mb-[10px] sm:mb-0">Notes : </Text>
                            <Textarea
                                required
                                className="w-[550px] ml-auto"
                                // defaultValue={myCompany.licenses}
                                placeholder="Template Notes"
                                {...form.getInputProps("notes")}
                            />
                        </Grid>
                        <Grid className="ml-[30px] mr-[30px] mb-[20px]">
                            <Text className="text-[16px] text-slate-700 font-semibold mb-[10px] sm:mb-0">Projection</Text>
                            <div className="w-full sm:w-[450px] ml-auto flex flex-col sm:flex-row items-center">
                                <div className="flex flex-row items-center mr-0 sm:mr-[30px] mt-[20px] sm:mt-0">
                                    <Text className="text-[14px] mr-[10px] text-slate-700 font-semibold w-[50px]">Month</Text>
                                    <NumberInput defaultValue={0}  {...form.getInputProps("month")} hideControls className="w-[150px]" />
                                </div>
                                <div className="flex flex-row items-center mt-[20px] sm:mt-0">
                                    <Text className="text-[14px] mr-[22px] sm:mr-[10px] text-slate-700 font-semibold w-[50px]">Year</Text>
                                    <NumberInput defaultValue={0}  {...form.getInputProps("year")} hideControls className="w-[150px]" />
                                </div>
                            </div>
                        </Grid>
                        <Grid className="ml-[30px] mr-[30px]">
                            <Text className="text-[16px] text-slate-700 font-semibold mb-[10px] sm:mb-0">Status : </Text>
                            <Select
                                data={[
                                    { label: "Active", value: "1" },
                                    { label: "Inactive", value: "0" },
                                ]}
                                placeholder="Set Status"
                                {...form.getInputProps("status")}
                                className="w-[550px] ml-auto"
                            />
                        </Grid>

                        <Grid justify="flex-end" className="m-[20px] pt-[10px] bg-[#f8f9fa]">
                            <Button
                                type="submit"
                                radius="sm"
                                size="sm"
                                color="teal"
                                className="mr-[10px]"
                                onClick={() => setOpened(false)}
                            >
                                Build Template
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
                    </Stack>

                </form>
            </Modal>

            <Button
                type="button"
                leftIcon={<AiOutlineEdit />}
                radius="sm"
                size="xs"
                onClick={() => {
                    setOpened(true);
                }}
                color="teal"
                className="mr-[5px] ml-[5px]"
            >
                Clone
            </Button>
        </>
    );
};

export default CloneTemplate;
