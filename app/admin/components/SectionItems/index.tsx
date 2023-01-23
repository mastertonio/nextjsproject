import React, { useState } from 'react'
import { Card, Grid, Text, TextInput, Button } from '@mantine/core'
import { useForm } from "@mantine/form"
import RichTextSection from '@app/core/components/richtext/RichTextSection'
import { DragNDrop } from '@app/core/components/dragdrop'
import { IconBookmark } from '@tabler/icons';
import { useModalEntryStore, useModalAddEntryStore } from '@app/store/builderStore';
import { customConfig, IBuilderSubState, useBuilderStore, useSectionsStore } from '@app/store/builder/builderState';
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
        <div>
            <div className="bg-[#ffffff] rounded-[5px] shadow p-[10px] mt-[50px]">
                <h1 className="text-[28px] text-[#676a6c] font-bold flex flex-row items-center">
                    <IconBookmark size={30} stroke={3} />
                    <span>{content.sectionName}</span>
                </h1>
            </div>

            <Card className="mt-[20px] mb-[20px]">
                <div className="mt-[20px]">
                    <SectionDnd data={sectData} type="modal" setUpdate={setUpdate} />
                </div>

                <Grid justify="flex-end" className="mt-[20px] mb-[20px]">
                    <Button
                        type="submit"
                        radius="sm"
                        size="sm"
                        color="teal"
                        className="mr-[10px]"
                        onClick={()=> {
                            setOpened(true)
                        }}
                    >
                        Add New Entry
                    </Button>
                </Grid>
            </Card>
            <ModalUpdateEntry showModal={opened} sectionData={sectData} setSectionData={setSectData} setOpened={setUpdate} open={update}/>
            <ModalAddEntry showModal={opened} sectionData={sectData} setSectionData={setSectData} setOpened={setOpened} open={opened}/>
        </div>
    )
}

export default SectionItems