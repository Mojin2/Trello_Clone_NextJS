"use client";
import {
  columnsState,
  editIndexState,
  editState,
  IToDoState,
  modalState,
  searchState,
} from "@/app/atom";
import { Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { useRecoilState } from "recoil";
import DropDownMenu from "./DropDownMenu";

interface Props {
  id: string;
  index: number;
  todos: string[];
}

interface Todo {
  title: string;
  status: string;
  id: string;
}

const idToColumnText: { [key in TypedColumn]: string } = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};
function Columns({ id, index, todos }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [recoilColumnsArray, setColumnsArray] = useRecoilState(columnsState);
  const [ColumnsArray, setClientColumnsArray] = useState<IToDoState>({});
  const [searchString, setSearchString] = useRecoilState(searchState);
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [isEdit, setIsEdit] = useRecoilState(editState);
  const [newTitle, setNewTitle] = useState("");
  const [editIndex, setEditIndex] = useRecoilState(editIndexState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setColumnsArray((oldTodos) => {
      const todoCopy = [...oldTodos[id]];
      return { ...oldTodos, [id]: todoCopy };
    });
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {/* rendring droppable todos in the  columns */}
          <Droppable droppableId={id} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 shadow-sm rounded-md ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-blue-100"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {/* {isEdit && index === editIndex ? (
                    <form onSubmit={handleSubmit}>
                      <input
                        ref={inputRef}
                        onChange={(e) => setNewTitle(e.target.value)}
                        type="text"
                        value={newTitle}
                        className={`${
                          snapshot.isDraggingOver ? "bg-green-200" : "bg-white"
                        }`}
                      />
                    </form>
                  ) : (
                    <div>{id}</div>
                  )} */}
                  {id}
                  <div className="flex flex-row items-center space-x-2">
                    <span className="text-gray-500 bg-gray-200 rounded-full font-normal px-2 py-1  text-sm">
                      {!searchString
                        ? todos.length
                        : todos.filter((todo) =>
                            todo
                              .toLowerCase()
                              .includes(searchString.toLowerCase())
                          ).length}
                    </span>
                    <DropDownMenu id={id} index={index} inputRef={inputRef} />
                  </div>
                </h2>
                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.toLowerCase().includes(searchString.toLowerCase())
                    ) {
                      return null;
                    }
                    return (
                      <Draggable key={todo} draggableId={todo} index={index}>
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <TodoCard id={id} todo={todo} index={index} />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <div className="flex items-end justify-end p-2">
                    <button
                      onClick={() => setIsOpen(true)}
                      className="text-green-500 hover:text-green-600"
                    >
                      <PlusCircleIcon className="h-10 w-10 " />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default React.memo(Columns);
