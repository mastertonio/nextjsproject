import React from 'react'
import { Button, Grid, Card } from '@mantine/core';
import { DragNDrop } from '@app/core/components/dragdrop'
import { IconBookmark } from '@tabler/icons';
import ModalUpdateEntry from './ModalUpdateEntry';
import ModalAddEntry from './ModalAddEntry';
import { useModalEntryStore, useModalAddEntryStore } from '@app/store/builderStore';
import data from "@app/core/components/dragdrop/data";
import dataSection from '@app/core/components/dragdrop/dataSection';

type iSectionProps = {}

const Sections: React.FC<iSectionProps> = () => {
    const showModalEntry = useModalEntryStore((state) => state.value);
    const showAddModalEntry = useModalAddEntryStore((state) => state.value);
    const showAddEntry = useModalAddEntryStore((state) => state.show);

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
                    <DragNDrop data={data} type="collapse" />
                </div>

                <Grid justify="flex-end" className="mt-[20px] mb-[20px]">
                    <Button
                        type="submit"
                        radius="sm"
                        size="sm"
                        color="teal"
                        className="mr-[10px]"
                    >
                        Add New Entry
                    </Button>
                </Grid>
            </Card>

            <div className="bg-[#ffffff] rounded-[5px] shadow p-[10px] mt-[50px]">
                <h1 className="text-[28px] text-[#676a6c] font-bold flex flex-row items-center">
                    <IconBookmark size={30} stroke={3} />
                    <span>Sales Information Sections</span>
                </h1>
            </div>

            <Card className="mt-[20px] mb-[20px]">
                <div className="mt-[20px]">
                    <DragNDrop data={dataSection} type="modal" />
                </div>

                <Grid justify="flex-end" className="mt-[20px] mb-[20px]">
                    <Button
                        type="submit"
                        radius="sm"
                        size="sm"
                        color="teal"
                        className="mr-[10px]"
                        onClick={showAddEntry}
                    >
                        Add New Entry
                    </Button>
                </Grid>
            </Card>
            <ModalUpdateEntry showModal={showModalEntry} />
            <ModalAddEntry showModal={showAddModalEntry} />
        </div>
    )
}

export default Sections