import {
  Button,
  Grid,
  Stack,
  TextInput,
  Image,
  Blockquote,
} from "@mantine/core";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import shortUUID from "short-uuid";

const Column = dynamic(() => import("./sectionComponents/layout/column"), {
  ssr: false,
});
type tplotOptions = {
  [key: string]: any;
};

const SectionContentDnd = () => {
  const [state, setState] = useState<tplotOptions>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid>
        <Grid px="4rem">
          {state.columnOrder.map((columnId: string) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId: React.Key | string | number) => state.tasks[taskId]
            );
            console.log(tasks, "tasks");
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export default SectionContentDnd;

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: <Button type="button">Test</Button> },
    "task-2": {
      id: "task-2",
      content: (
        <TextInput placeholder="Your name" label="Full name" withAsterisk />
      ),
    },
    "task-3": {
      id: "task-3",
      content: (
        <div style={{ width: 240, marginLeft: "auto", marginRight: "auto" }}>
          <Image
            radius="md"
            src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            alt="Random unsplash image"
          />
        </div>
      ),
    },
    "task-4": {
      id: "task-4",
      content: (
        <Blockquote cite="– Forrest Gump">
          Life is like an npm install – you never know what you are going to
          get.
        </Blockquote>
      ),
    },
    "task-5": {
      id: "task-5",
      content: (
        <div style={{ width: 240, marginLeft: "auto", marginRight: "auto" }}>
          <Image
            radius="md"
            src="https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
            alt="Random unsplash image"
          />
        </div>
      ),
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Tools",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"],
    },
    "column-2": {
      id: "column-2",
      title: "Drop either Description, quotes, buttons, or image",
      taskIds: [],
    },
    //   'column-3': {
    //     id: 'column-3',
    //     title: 'Done',
    //     taskIds: []
    //   }
  },
  // Facilitate reordering of the columns
  columnOrder: [
    "column-1",
    "column-2",
    // 'column-3'
  ],
};
