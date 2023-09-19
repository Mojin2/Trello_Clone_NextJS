"use client";

import { recoilPersist } from "recoil-persist";
import { atom } from "recoil";

interface Column {
  id: string;
  todos: Todo[];
}

interface Todo {
  id: string;
  title: string;
  status: TypedColumn;
}

// const localStorage =
//   typeof window !== "undefined" ? window.localStorage : undefined;

// const { persistAtom } = recoilPersist({
//   key: "recoil-persist",
//   storage: localStorage,
// });

export const columnsState = atom<Column[]>({
  key: "toDos",
  default: [
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
  ],
});
