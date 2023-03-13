import React, { useState } from 'react'
import { Card, Grid, Text, TextInput, Button } from '@mantine/core'
import { useForm } from "@mantine/form"
import RichTextSection from '@app/core/components/richtext/RichTextSection'
import { DragNDrop } from '@app/core/components/dragdrop'
import { IconBookmark } from '@tabler/icons';
import { FcTodoList } from 'react-icons/fc'
import { useModalEntryStore, useModalAddEntryStore } from '@app/store/builderStore';
import { customConfig, IBuilderSubState, useNewStore } from '@app/store/builder/builderState';
import { uniqueNamesGenerator } from 'unique-names-generator';
import SectionDnd from '../SectionDnd'
import ModalUpdateEntry from '../ModalUpdateEntry'
import ModalAddEntry from '../ModalAddEntry'
import { iSectionData } from '../Sections'

interface ICollapseProps {
    content: IBuilderSubState
}

const SectionItems: React.FC<ICollapseProps> = ({ content }) => {
    const showModalEntry = useModalEntryStore((state) => state.value);
    const showAddModalEntry = useModalAddEntryStore((state) => state.value);
    const showAddEntry = useModalAddEntryStore((state) => state.show);
    const setUpdateChoice = useNewStore((state) => state.setUpdateChoice)
    const [opened, setOpened] = useState(false);
    const [update, setUpdate] = useState(false);

    const [sectData, setSectData] = useState<iSectionData[]>([])

    const form = useForm({
        initialValues: {
            sectionName: "",
            sectionWriteUp: "",
            sectionVideo: "",
            sectionFormula: "",
        }
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            console.log('Values: ', values)
            console.log({ ...form.getInputProps("sectionVideo") })
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <div className='pl-0 pr-0'>
            <div className="bg-[#ffffff] rounded-[5px] shadow p-[10px] mt-[50px]">
                <h1 className="text-[28px] text-[#676a6c] font-bold flex flex-row items-center ml-[20px]">
                    <FcTodoList size={30} className="text-blue-600 mr-[10px]" />
                    <span>{content.sectionName}</span>
                </h1>
            </div>

            <div className="pl-[2rem] pr-[2rem]">
                <Card className="mt-[20px] mb-[20px] !border-t-[4px] border-t-[#e7eaec] hover:border-t-[#2f4050] animate-card" radius="sm" withBorder>
                    <div className="mt-[20px]">
                        <SectionDnd data={sectData} type="modal" setUpdate={setUpdate} />
                    </div>

                    <Grid justify="flex-end" className="mt-[20px] mb-[20px] flex flex-col sm:flex-row m-0 sm:m-[-unset] pt-0 sm:pt-[20px]">
                        <Button
                            type="submit"
                            radius="sm"
                            size="sm"
                            color="teal"
                            className="mr-[10px]"
                            onClick={() => {
                                setOpened(true)
                            }}
                        >
                            Add New Entry
                        </Button>
                    </Grid>
                </Card>
            </div>
            <ModalUpdateEntry showModal={opened} sectionData={sectData} setSectionData={setSectData} setOpened={setUpdate} open={update} setOpenChoice={setUpdateChoice} />
            <ModalAddEntry showModal={opened} sectionData={sectData} setSectionData={setSectData} setOpened={setOpened} open={opened} />
        </div>
    )
}

export default SectionItems