import React, { useEffect, useState } from 'react'
import { Button, Grid, Card } from '@mantine/core';
import { DragNDrop } from '@app/core/components/dragdrop'
import { FcTodoList } from 'react-icons/fc'
import ModalUpdateEntry from './ModalUpdateEntry';
import ModalAddEntry from './ModalAddEntry';
import { useModalEntryStore, useModalAddEntryStore } from '@app/store/builderStore';
import { customConfig, IBuilderSubState, useBuilderStore, useSectionsStore } from '@app/store/builder/builderState';
import SectionDnd from './SectionDnd';
import { uniqueNamesGenerator } from 'unique-names-generator';
import SectionItems from './SectionItems';
import { UserDataProp } from '@app/context/user.context';

type iSectionProps = {
    user: UserDataProp
}

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

const Sections: React.FC<iSectionProps> = ({ user }) => {
    const showModalEntry = useModalEntryStore((state) => state.value);
    const showAddModalEntry = useModalAddEntryStore((state) => state.value);
    const showAddEntry = useModalAddEntryStore((state) => state.show);
    const contentData = useBuilderStore((state) => state.content)
    const sectionData = useSectionsStore((state) => state.section)
    const addEmptySection = useBuilderStore((state) => state.addSection)

    return (
        <div className="w-full mt-[40px]">
            <div className="bg-[#ffffff] shadow p-[10px]">
                <h1 className="text-[28px] text-slate-800 font-bold flex flex-row items-center ml-[20px]">
                    <FcTodoList size={30} className="text-blue-600 mr-[10px]" />
                    <span>Current Sections</span>
                </h1>
            </div>

            <div className="pl-[1rem] pr-[1rem] sm:pl-[2rem] sm:pr-[2rem] mt-[40px]">
                <Card className="mt-[15px] mb-[20px]">
                    <div className="mt-[20px]">
                        <DragNDrop data={[]} type="collapse" />
                    </div>

                    <Grid justify="flex-end" className="mt-[20px] mb-[20px] flex flex-col sm:flex-row m-0 sm:m-[unset] pt-0 sm:pt-[20px]">
                        <Button
                            type="submit"
                            radius="sm"
                            size="sm"
                            color="teal"
                            className="mr-0 sm:mr-[10px]"
                            onClick={addEmptySection}
                        >
                            Add New Entry
                        </Button>
                    </Grid>
                </Card>
            </div>

            {contentData.length > 0 ? contentData.map((content) => (<SectionItems user={user} key={content.id} content={content} />)
            ) : (<div className="pl-[2rem] pr-[2rem] mb-[40px]">No Sections Yet</div>)}
        </div>
    )
}

export default Sections