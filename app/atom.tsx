"use client";

import { recoilPersist } from "recoil-persist";
import { atom } from "recoil";

const localStorage =
  typeof window !== "undefined" ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

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

export const modalState = atom<boolean>({
  key: "modal",
  default: false,
});

export const editModalState = atom<boolean>({
  key: "editModal",
  default: false,
});

export const newTaskState = atom<string>({
  key: "newTaskState",
  default: "",
});

export const newTaskTypeState = atom<string>({
  key: "newTaskType",
  default: "ToDo",
});

export const editState = atom<boolean>({
  key: "edit",
  default: false,
});

export const editIndexState = atom<number>({
  key: "editIndex",
  default: 0,
});
