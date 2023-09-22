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

const localStorage =
  typeof window !== "undefined" ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

// export const columnsState = atom<Column[]>({
//   key: "toDos",
//   default: [
//     {
//       id: "todoColumn",
//       todos: [
//         { title: "1", status: "todo", id: "1" },
//         { title: "2", status: "todo", id: "2" },
//       ],
//     },
//     {
//       id: "inprogressColumn",
//       todos: [
//         { title: "3", status: "inprogress", id: "3" },
//         { title: "4", status: "inprogress", id: "4" },
//       ],
//     },
//     {
//       id: "doneColumn",
//       todos: [
//         { title: "5", status: "done", id: "5" },
//         { title: "6", status: "done", id: "6" },
//       ],
//     },
//   ],
//   effects_UNSTABLE: [persistAtom],
// });

export interface IToDoState {
  [key: string]: string[];
}
export const columnsState = atom<IToDoState>({
  key: "toDos",
  default: {
    ToDo: ["a", "b"],
    Doing: ["c", "d"],
    Done: ["e", "f"],
  },
  effects_UNSTABLE: [persistAtom],
});

export const searchState = atom<string>({
  key: "search",
  default: "",
});
