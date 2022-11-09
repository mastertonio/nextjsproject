import { Card, Container, Grid, Stack, Text } from "@mantine/core";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

type Tesst = {
  column: any;
  tasks: any;
};

const Column: React.FC<Tesst> = ({ column, tasks }) => {
  return (
    <Card style={{ height: 900, width: 850, backgroundColor: 'azure'}} shadow="sm" p="sm" radius="md" withBorder>
      <Text>{column.title}</Text>
      <Droppable droppableId={column.id}>
            {(droppableProvided, droppableSnapshot) => (
                <Stack
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                    style={{ backgroundColor: 'aquamarine'}}
                >
                    {tasks.map((task: { id: React.Key | null | undefined; height: any; content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, index: number) => (
                        <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                            {(draggableProvided, draggableSnapshot) => (
                                <Stack
                
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.draggableProps}
                                    {...draggableProvided.dragHandleProps}
                                >
                                    <Text>{task.content}</Text>
                                </Stack>
                            )}
                        </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                </Stack>
            )}
        </Droppable>
    </Card>
  );
};

export default Column;
