import { create } from "zustand";

interface BoardState {
  board: Board;
  getBoard: () => void;
}

const useBoardStore = create((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: () => {},
}));
