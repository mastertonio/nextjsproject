import React, { useState, useEffect } from 'react'
import { createStyles, Text, Button } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd';
import { IconGripVertical, IconEdit, IconX } from '@tabler/icons';
import CollapseSection from '@app/admin/components/CollapseSection';
import { useModalEntryStore } from '@app/store/builderStore';
import { IBuilderSubState, useBuilderStore, useNewStore } from '@app/store/builder/builderState';
import { iSectionData } from '../../../admin/components/Sections'
import EditQuestions from '@app/admin/components/SectionModals/EditQuestions';
import axios from 'axios';
import { UserDataProp } from '@app/context/user.context';
import EditSectionEntryModal from '../SectionEditEntries';

const useStyles = createStyles((theme) => ({
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: theme.radius.md,
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
        padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
        paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
        marginBottom: theme.spacing.sm,
        boxShadow: theme.shadows.md,
    },

    itemDragging: {
        boxShadow: theme.shadows.sm,
    },

    symbol: {
        fontSize: 30,
        fontWeight: 700,
        width: 60,
    },

    dragHandle: {
        // ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },
}));

export interface DragNDropProps {
    data?: any[],
    type?: string,
    user: UserDataProp,
    id?: string
    adminId: string,
    choices: []
}

// type iSectionNewProps = {
//     _id: string;
//     label: string;
//     classes: string;
//     forcedValue: number;
//     icon: string;
//     isDisabled: boolean | null;
//     isProcess: boolean | null;
//     rightSection: string;
//     sliderType: string;
//     value: number;
//     dataType: string;
//     format: string;
//     tooltip: string;
//     appendedText: string;
//     formula: string;
//     address: string;
// }

type iSectionProps = {
    id: number
    title: string
    type: string
    format: string
    tooltip: string
    appendedText: string
    formula: string
    address: string
}

export function DragNDrop({ data, type, user, adminId, id, choices }: DragNDropProps) {
    const { classes, cx } = useStyles();
    const show = useModalEntryStore((state) => state.show);
    const setUpdateChoice = useNewStore((state) => state.setUpdateChoice)
    const [hideShow, setHideShow] = useState<any>({});
    resetServerContext();
    const [display, setDisplay] = useState<any>(false)
    const [sectData, setSectData] = useState<iSectionData[]>([])
    const [opened, setOpened] = useState(false);
    const [update, setUpdate] = useState(false);
    const [getID, setGetID] = useState(0);

    const equalsCheck = (a: IBuilderSubState[], b: IBuilderSubState[]) => a.length === b.length && a.every((v, i) => v === b[i])

    const remove = useBuilderStore((state) => state.remove)
    const [state, handlers] = useListState(data);

    useEffect(() => {
        if (data) {
            handlers.setState(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleShow = (id: number) => {
        setHideShow((state: any[]) => ({
            ...state,
            [id]: !state[id]
        }))
    };

    const items = data?.map((item, index) => {
        console.log('item drag', item)
        return (
            <Draggable key={item._id} index={index} draggableId={`${item._id}-sectionName`} isDragDisabled={true}>
                {(provided, snapshot) => (
                    <div>
                        <div
                            className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        // onClick={() => {
                        //     setGetID(item.id);
                        //     setUpdate(true)
                        // }}
                        // onClick={() => type === "collapse" ? handleShow(item.id) : show()}
                        >
                            <div {...provided.dragHandleProps} className={classes.dragHandle}>
                                <IconGripVertical size={18} stroke={1.5} />
                            </div>
                            <div>
                                <div className="h-[20px] flex flex-row">
                                    <EditSectionEntryModal itemId={item._id} data={item} adminId={adminId} id={id} user={user} secName={item.title} choices={choices}/>
                                    <Text className="text-[14px] ml-[5px]">{item.title}</Text>
                                </div>
                            </div>
                            <div className="ml-auto button-section">
                                <Button
                                    type="button"
                                    radius="sm"
                                    color="red"
                                    size="sm"
                                    className="h-[20px] w-full"
                                    onClick={async () => {
                                        console.log(item)
                                        await axios.delete(`/v1/company/admintool/${adminId}/section/${id}/element/${item._id}`, {
                                            headers: {
                                                Authorization: `Bearer ${user.tokens.access.token}`,
                                            }
                                        })
                                    }}
                                >
                                    <IconX size={12} stroke={1.5} />
                                </Button>
                            </div>
                        </div>
                        <EditQuestions items={item} setOpened={setUpdate} open={update} setOpenChoice={setUpdateChoice} />

                        {/* {hideShow[item.id] && (
                        <CollapseSection item={item} />
                    )} */}

                    </div>
                )}
            </Draggable >
        )
    })

    return (
        <DragDropContext
            onDragEnd={({ destination, source }) => {
                handlers.reorder({ from: source.index, to: destination?.index || 0 })
            }
            }
        >
            <Droppable droppableId="dnd-list" direction="vertical">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {/* <ModalUpdateEntry showModal={opened} sectionData={sectData} setSectionData={setSectData} setOpened={setUpdate} open={update} setOpenChoice={setUpdateChoice} /> */}
        </DragDropContext>
    )
}
