import React, { useState } from 'react'
import { Modal, Button, Divider, Text, TextInput, Grid, Select, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useModalEntryStore } from '@app/store/builderStore';
import { HiOutlineDocumentText } from 'react-icons/hi'
import { useCardStore } from '@app/store/builder/builderState';
import { MdAddBox, MdModeEdit, MdClose } from 'react-icons/md'
import { UserDataProp } from '@app/context/user.context';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck, IconEdit } from '@tabler/icons';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { iSectionData } from './Sections';
import { format } from 'highcharts';

interface IModalEntryProps {
    id?: string
    user: UserDataProp
    secName: string
    adminId: string
    data: any
    choices: []
    itemId: string
}

interface CardSection {
    id: string;
    sectioName: string;
}

const EditSectionEntryModal: React.FC<IModalEntryProps> = ({ id, user, secName, adminId, data, choices, itemId }) => {
    const [opened, setOpened] = useState(false);
    const hideModal = useModalEntryStore((state) => state.hide);
    const cards = useCardStore((state) => state.cards);
    const newCardName = useCardStore((state) => state.newCardName);
    const addCard = useCardStore((state) => state.addCard);
    const setNewCardName = useCardStore((state) => state.setNewCardName);
    const queryClient = useQueryClient()
    // console.log("NEW DATA", choices)
    const form = useForm({
        initialValues: {
            id: data._id,
            title: data.title,
            choices: "",
            format: data.format,
            decimalPlace: data.decimalPlace ? data.decimalPlace : "",
            currency: data.currency ? data.currency : "",
            tooltip: data.tooltip,
            appendedText: data.appendedText,
            prefilled: data.prefilled,
            formula: data.formula,
            address: data.address,
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

    const editSectionEntry = useMutation({
        mutationFn: (sect: any) => axios.patch(`/v1/company/admintool/${adminId}/section/${id}/element/${itemId}`, {
            grayContent: sect
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
                disallowClose: true,
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

    const dataSelect = [
        { value: 'Input', label: 'Input' },
        { value: 'Output', label: 'Output' },
        { value: 'Textarea', label: 'Textarea' },
        { value: 'Dropdown', label: 'Dropdown' },
        { value: 'Radio', label: 'Radio' },
        { value: 'Checkbox', label: 'Checkbox' },
        { value: 'Slider', label: 'Slider' },
        { value: 'Header', label: 'Header' },
        { value: 'HTML', label: 'HTML' },
        { value: 'Ratings', label: 'Ratings' },
    ];

    const format = [
        { value: "Text", label: "Text" },
        { value: "Currency", label: "Currency" },
        { value: "Percent", label: "Percent" },
        { value: "Number", label: "Number" },
    ];

    const currencyFormat = [
        { value: "USD", label: "USD" },
    ]

    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)} size="920px" title={ModalTitle(`Rename ${secName} section`)} padding={0} className="section-wrapper section-modal w-[100%] sm:w-[70%] mx-auto">
                <form onSubmit={form.onSubmit((values) => editSectionEntry.mutate(values))}>
                <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
                    <Grid className="p-[10px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Auto ID: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("id")}
                            disabled={true}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[20px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Entry Name: </Text>
                        <Textarea
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps(`title`)}
                        />

                    </Grid>

                    {/* <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Type: </Text>
                        <div className="w-[100%] sm:w-[75%]">
                            <Select
                                placeholder="Choose"
                                data={dataSelect}
                                {...form.getInputProps("type")}
                            />
                        </div>
                    </Grid> */}

                    {/* {form.values.type === 'Dropdown' || form.values.type === 'Radio' || form.values.type === 'Checkbox' ? (
                        <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Choices: </Text>
                            <Button
                                type="button"
                                radius="sm"
                                size="sm"
                                color="teal"
                                className="ml-auto w-[100%] sm:w-[unset]"
                                onClick={addChoice}
                            >
                                Add New Choice
                            </Button>
                        </Grid>
                    ) : null} */}

                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Format: </Text>
                        <div className="w-[100%] sm:w-[75%]">
                            <Select
                                placeholder="Choose"
                                data={format}
                                {...form.getInputProps("format")}
                            />
                        </div>
                    </Grid>

                    {form.values.format === "Number" || form.values.format === "Percent" || form.values.format === "Currency" || data.format === "Number" || data.format === "Percent" || data.format === "Currency" ? (
                        <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Decimal Place: </Text>
                            <TextInput
                                required
                                className="w-[100%] sm:w-[75%] ml-auto"
                                {...form.getInputProps("decimalPlace")}
                            />
                        </Grid>
                    ) : null}

                    {form.values.format === "Currency" || data.format === "Currency" ? (
                        <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Currency: </Text>
                            <div className="w-[100%] sm:w-[75%]">
                                <Select
                                    placeholder="Choose"
                                    data={currencyFormat}
                                    {...form.getInputProps("currency")}
                                />
                            </div>
                        </Grid>
                    ) : null}

                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Helpful Tip: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("tooltip")}
                        />
                    </Grid>
                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Prefilled Value: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("prefilled")}
                        />
                    </Grid>
                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Append Value: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("appendedText")}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Address: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("address")}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Formula: </Text>
                        <Textarea
                            className="w-[100%] sm:w-[75%] ml-auto"
                            {...form.getInputProps("formula")}
                        />
                    </Grid>

                    <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Other Sections: </Text>
                        <div className="w-[100%] sm:w-[75%]">
                            <Select
                                placeholder="Choose"
                                data={choices ? choices : []}
                                {...form.getInputProps("sections")}
                            />
                        </div>
                    </Grid>

                    <Divider className="mt-[30px] mb-[30px]" />

                    <Grid justify="flex-end" className="mt-[20px] mb-[20px] sm:mb-0 flex flex-col sm:flex-row m-0 sm:m-[-8px] pt-0 sm:pt-[20px">
                        <Button
                            type="submit"
                            radius="sm"
                            size="sm"
                            color="teal"
                            className="mr-0 sm:mr-[10px] mb-[10px]"
                        >
                            Update Entry
                        </Button>
                        {/* <Button
                            type="button"
                            radius="sm"
                            size="sm"
                            color="red"
                            className="mr-0 sm:mr-[10px] mb-[10px]"
                        >
                            Delete
                        </Button> */}
                        <Button
                            type="button"
                            radius="sm"
                            size="sm"
                            color="gray"
                            className="mr-0 sm:mr-[10px]"
                            onClick={() => setOpened(false)}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </div>
                </form>
            </Modal>
            <IconEdit onClick={() => setOpened(true)} size={18} stroke={1.5} />
        </>
    )
}

export default EditSectionEntryModal