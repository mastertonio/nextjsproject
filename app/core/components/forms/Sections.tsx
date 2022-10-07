import { createStyles, Text } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconGripVertical } from "@tabler/icons";
import { useContext, useEffect } from "react";
import BuilderContext from "@app/context/builder.context";
import DefaultSection from "@app/company/components/DefaultSection";

const useStyles = createStyles((theme) => ({
  item: {
    padding: 0,
  },

  itemDragging: {
    padding: 0,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));

export interface DndListHandleProps {
  data: {
    id: string;
    name: string;
    description: string;
  }[];
}

export function DndListHandle({ data }: DndListHandleProps) {
  const { classes, cx } = useStyles();
  const builderCtx = useContext(BuilderContext);
  const [state, handlers] = useListState(data);

  useEffect(() => {
    
    handlers.setState(builderCtx.sections);
    // console.log(state, "state");
    console.log(builderCtx.sections, "builderCtx.section", data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builderCtx.sections]);


  useEffect(() => {
    // console.log(state, "state");
    console.log(state, 'teeest');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlers.reorder]);

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.name}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <DefaultSection
            id={item.id}
            name={item.name}
            description={item.description}
          />
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => 
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
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
  );
}
