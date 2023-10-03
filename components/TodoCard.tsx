"use client";
import {
  columnsState,
  IToDoState,
  newTaskState,
  newTaskTypeState,
} from "@/app/atom";
import { XCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useToast } from "@chakra-ui/react";

interface Props {
  todo: string;
  index: number;
  id: string;
}
function TodoCard({ todo, id, index }: Props) {
  const [newTaskInput, setNewTaskInput] = useRecoilState(newTaskState);
  const [recoilColumnsArray, setColumnsArray] = useRecoilState(columnsState);
  const [ColumnsArray, setClientColumnsArray] = useState<IToDoState>({});
  const [newTaskType, setNewTaskType] = useRecoilState(newTaskTypeState);
  const toast = useToast();
  const handleDelete = () => {
    setColumnsArray((oldTodos) => {
      const todoCopy = [...oldTodos[id]];
      todoCopy.splice(index, 1);
      return { ...oldTodos, [id]: todoCopy };
    });
    toast({
      title: "Todo deleted.",
      description: "We've deleted your Todo.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <div className="bg-white space-y-2 drop-shadow-md">
      <div className="flex justify-between items-center p-5">
        <p>{todo}</p>
        <button className="text-red-500 hover:text-red-600">
          <XCircleIcon onClick={handleDelete} className="ml-5 h-8 w-8" />
        </button>
      </div>
      {/* Add image here */}
    </div>
  );
}

export default React.memo(TodoCard);
