import React, { useState, useEffect } from 'react'
import { createStyles, Text, Button } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd';
import { IconGripVertical, IconEdit, IconX } from '@tabler/icons';
import CollapseSection from '@app/admin/components/CollapseSection';
import { useModalEntryStore } from '@app/store/builderStore';
import { IBuilderSubState, useBuilderStore, useSectionsStore } from '@app/store/builder/builderState';
import { iSectionData } from '../Sections';

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
    data: iSectionData[],
    type: string
    setUpdate: (b: boolean) => void
}

function SectionDnd({ data, type, setUpdate }: DragNDropProps) {
    const { classes, cx } = useStyles();
    const show = useModalEntryStore((state) => state.show);
    const [hideShow, setHideShow] = useState<any>({});
    resetServerContext();
    const remove = useSectionsStore((state) => state.remove)
    const [state, handlers] = useListState(data);

    useEffect(() => {
        handlers.setState(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleShow = (id: number) => {
        setHideShow((state: any[]) => ({
            ...state,
            [id]: !state[id]
        }))
    };

    const items = state.map((item, index) => (
        <Draggable key={item.id} index={index} draggableId={`${item.id}-sectionName`}>
            {(provided, snapshot) => (
                <div>
                    <div
                        className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => setUpdate(true)}
                    >
                        <div {...provided.dragHandleProps} className={classes.dragHandle}>
                            <IconGripVertical size={18} stroke={1.5} />
                        </div>
                        <div>
                            <div className="h-[20px] flex flex-row">
                                <IconEdit size={18} stroke={1.5} />
                                <Text className="text-[14px] ml-[5px]">{item.title}</Text>
                            </div>
                        </div>
                        <div className="ml-auto button-section">
                            <Button
                                radius="sm"
                                color="red"
                                size="sm"
                                className="h-[20px] w-full"
                                onClick={() => {
                                    remove(item.id)
                                }
                                }
                            >
                                <IconX size={12} stroke={1.5} />
                            </Button>
                        </div>
                    </div>

                </div>
            )}
        </Draggable >
    ))

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
        </DragDropContext>
    )
}


export default SectionDnd