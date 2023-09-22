"use client";

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Columns from "./Columns";
import { useRecoilState } from "recoil";
import { columnsState, IToDoState } from "@/app/atom";

const ColumnsArraytmp: Column[] = [
  {
    id: "todoColumn",
    todos: [
      { title: "1", status: "todo", id: "1" },
      { title: "2", status: "todo", id: "2" },
    ],
  },
  {
    id: "inprogressColumn",
    todos: [
      { title: "3", status: "inprogress", id: "3" },
      { title: "4", status: "inprogress", id: "4" },
    ],
  },
  {
    id: "doneColumn",
    todos: [
      { title: "5", status: "done", id: "5" },
      { title: "6", status: "done", id: "6" },
    ],
  },
];
function Board() {
  // Recoil Hydration Issue
  const [recoilColumnsArray, setColumnsArray] = useRecoilState(columnsState);
  const [ColumnsArray, setClientColumnsArray] = useState<IToDoState>({});
  useEffect(() => {
    setClientColumnsArray(recoilColumnsArray);
  }, [recoilColumnsArray]);
  const handleOnDragEnd = (result: DropResult) => {
    const { draggableId, destination, source, type } = result;

    // Check if use dragged card outside of board
    if (!destination) return;
    // Handle column drag
    if (type === "column") {
      setColumnsArray((columns) => {
        const obj = Object.entries(columns);
        const [target] = obj.splice(source.index, 1);
        obj.splice(destination.index, 0, target);
        const main = Object.fromEntries(obj);
        return main;
      });
    }
    if (type === "card") {
      if (destination.droppableId === source.droppableId) {
        setColumnsArray((oldTodos) => {
          const todoCopy = [...oldTodos[source.droppableId]];
          todoCopy.splice(source.index, 1);
          todoCopy.splice(destination.index, 0, draggableId);
          return { ...oldTodos, [source.droppableId]: todoCopy };
        });
      }
      if (destination.droppableId !== source.droppableId) {
        setColumnsArray((oldToDos) => {
          const sourceCopy = [...oldToDos[source.droppableId]];
          const desCopy = [...oldToDos[destination.droppableId]];
          sourceCopy.splice(source.index, 1);
          desCopy.splice(destination?.index, 0, draggableId);
          return {
            ...oldToDos,
            [source.droppableId]: sourceCopy,
            [destination.droppableId]: desCopy,
          };
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-5"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {/* rendering all the columns */}
            {Object.keys(ColumnsArray).map((columnId, index) => (
              <Columns
                id={columnId}
                index={index}
                todos={ColumnsArray[columnId]}
                key={columnId}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
