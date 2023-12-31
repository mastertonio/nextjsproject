import { createStyles, Text } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconGripVertical } from "@tabler/icons";
import { useContext, useEffect } from "react";
import BuilderContext from "@app/context/builder.context";
import DefaultSection from "@app/company/components/DefaultSection";
import SectionContentDnd from "@app/company/components/SectionContentDnd";

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
    title: string;
    description: string;
    quote: string;
    media: string;
    price: number;
    author: string
    type: string
  }[];
}

export function DndListHandle({ data }: DndListHandleProps) {
  const { classes, cx } = useStyles();
  const builderCtx = useContext(BuilderContext);
  const [state, handlers] = useListState(data);

  useEffect(() => {
    handlers.setState(builderCtx.sections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builderCtx.sections]);

  useEffect(() => {
    // console.log(state, "state");
    console.log(state, "reorder");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlers.reorder]);

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.name} isDragDisabled={builderCtx.draggableDisabled}>
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
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            title={item.title}
            quote={item.quote}
            media={item.media}
            price={item.price}
            author={item.author}
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
