import React from 'react'
import { Button, Grid, Card } from '@mantine/core';
import { DragNDrop } from '@app/core/components/dragdrop'
import ModalUpdateEntry from './ModalUpdateEntry';
import { useModalEntryStore } from '@app/store/builderStore';
import data from "@app/core/components/dragdrop/data";

type iSectionProps = {}

const Sections: React.FC<iSectionProps> = () => {
    const showModalEntry = useModalEntryStore((state) => state.value);

    return (
        <div className="w-full mt-[20px]">
            <div className="bg-[#ffffff] rounded-[5px] shadow p-[10px]">
                <h1 className="text-[30px] text-[#676a6c] font-normal">Current Sections</h1>
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
                        className="mr-[10px]"
                    >
                        Add New Entry
                    </Button>
                </Grid>
            </Card>

            <div className="bg-[#ffffff] rounded-[5px] shadow p-[10px] mt-[50px]">
                <h1 className="text-[30px] text-[#676a6c] font-normal">Sales Information</h1>
            </div>

            <Card className="mt-[20px] mb-[20px]">
                <div className="mt-[20px]">
                    <DragNDrop data={data} type="modal" />
                </div>

                <Grid justify="flex-end" className="mt-[20px] mb-[20px]">
                    <Button
                        type="submit"
                        radius="sm"
                        size="sm"
                        className="mr-[10px]"
                    >
                        Add New Entry
                    </Button>
                </Grid>
            </Card>
            <ModalUpdateEntry showModal={showModalEntry} />
        </div>
    )
}

export default Sections