import React, { useEffect, useState } from 'react'
import { Button, Grid, Card } from '@mantine/core';
import { DragNDrop } from '@app/core/components/dragdrop'
import { IconBookmark } from '@tabler/icons';
import ModalUpdateEntry from './ModalUpdateEntry';
import ModalAddEntry from './ModalAddEntry';
import { useModalEntryStore, useModalAddEntryStore } from '@app/store/builderStore';
import { customConfig, IBuilderSubState, useBuilderStore, useSectionsStore } from '@app/store/builder/builderState';
import SectionDnd from './SectionDnd';
import { uniqueNamesGenerator } from 'unique-names-generator';
import SectionItems from './SectionItems';

type iSectionProps = {}

export type iSectionData = {
    id: number
    title: string
    type: string
    format: string
    tooltip: string
    appendedText: string
    formula: string
    address: string
}

const Sections: React.FC<iSectionProps> = () => {
    const showModalEntry = useModalEntryStore((state) => state.value);
    const showAddModalEntry = useModalAddEntryStore((state) => state.value);
    const showAddEntry = useModalAddEntryStore((state) => state.show);
    const contentData = useBuilderStore((state) => state.content)
    const sectionData = useSectionsStore((state) => state.section)
    const addEmptySection = useBuilderStore((state) => state.addSection)

    return (
        <div className="w-full mt-[20px]">
            <div className="bg-[#ffffff] rounded-[5px] shadow p-[10px]">
                <h1 className="text-[28px] text-[#676a6c] font-bold flex flex-row items-center">
                    <IconBookmark size={30} stroke={3} />
                    <span>Current Sections</span>
                </h1>
            </div>

            <Card className="mt-[20px] mb-[20px]">
                <div className="mt-[20px]">
                    <DragNDrop data={contentData} type="collapse" />
                </div>

                <Grid justify="flex-end" className="mt-[20px] mb-[20px]">
                    <Button
                        type="submit"
                        radius="sm"
                        size="sm"
                        color="teal"
                        className="mr-[10px]"
                        onClick={addEmptySection}
                    >
                        Add New Entry
                    </Button>
                </Grid>
            </Card>

            {contentData.length > 0 ? contentData.map((content) => (<SectionItems key={content.id} content={content} />)
            ) : (<div>No Sections Yet</div>)}
        </div>
    )
}

export default Sections