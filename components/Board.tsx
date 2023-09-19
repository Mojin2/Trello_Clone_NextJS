"use client";

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Columns from "./Columns";
import { useRecoilState } from "recoil";
import { columnsState } from "@/app/atom";

const ColumnsArray: Column[] = [
  {
    id: "todoColumn",
    todos: [
      { title: "1", status: "todo", id: "1todo" },
      { title: "2", status: "todo", id: "2todo" },
    ],
  },
  {
    id: "inprogressColumn",
    todos: [
      { title: "3", status: "inprogress", id: "1inprogress" },
      { title: "4", status: "inprogress", id: "2inprogress" },
    ],
  },
  {
    id: "doneColumn",
    todos: [
      { title: "5", status: "done", id: "1done" },
      { title: "6", status: "done", id: "2done" },
    ],
  },
];
function Board() {
  // Recoil Hydration Issue
  const [recoilColumnsArray, setColumnsArray] = useRecoilState(columnsState);
  // const [ColumnsArray, setClientColumnsArray] = useState<Column[]>([]);
  const [winReady, setwindReady] = useState(false);
  useEffect(() => {
    setwindReady(true);
    // setClientColumnsArray(recoilColumnsArray);
    // get Board if use DB
  }, [recoilColumnsArray]);
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // Check if use dragged card outside of board
    if (!destination) return;
    // console.log(source);
    // console.log(destination);
    // console.log(type);
    // Handle column drag
    if (type === "column") {
      // when use Recoil //
      // setColumnsArray((columns) => {
      //   const columnCopy = [...columns];
      //   const [sourceColumn] = columnCopy.splice(source.index, 1);
      //   columnCopy.splice(destination.index, 0, sourceColumn);
      //   return columnCopy;
      // });
      const [sourceColumn] = ColumnsArray.splice(source.index, 1);
      ColumnsArray.splice(destination.index, 0, sourceColumn);
    }
    if (type === "card") {
      if (source.droppableId === destination.droppableId) {
        const [sourceTodoColumn] = ColumnsArray.filter(
          (items) => items.id === source.droppableId
        );
        const sourceTodo = sourceTodoColumn.todos[source.index];
        const [Arr] = ColumnsArray.filter(
          (items) => items.id === source.droppableId
        );
        Arr.todos.splice(source.index, 1);
        Arr.todos.splice(destination.index, 0, sourceTodo);
      }
      if (source.droppableId !== destination.droppableId) {
        const [sourceTodoColumn] = ColumnsArray.filter(
          (items) => items.id === source.droppableId
        );
        const sourceTodo = sourceTodoColumn.todos[source.index];
        const [sourceArr] = ColumnsArray.filter(
          (items) => items.id === source.droppableId
        );
        sourceArr.todos.splice(source.index, 1);
        const [destinationArr] = ColumnsArray.filter(
          (items) => items.id === destination.droppableId
        );
        destinationArr.todos.splice(destination.index, 0, sourceTodo);
      }
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-5"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {/* rendering all the columns */}
            {winReady
              ? ColumnsArray.map((column, index) => (
                  <Columns
                    id={column.id}
                    index={index}
                    todos={column.todos}
                    key={column.id}
                  />
                ))
              : null}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
