import { create } from "zustand";

interface CursorStore {
  x: number;
  y: number;
  cursorVisible: boolean;
  setCursorPosition: (a: number, b: number) => void;
  hideCursor: () => void;
  showCursor: () => void;
}

const useCursorStore = create<CursorStore>((set) => ({
  x: 0,
  y: 0,
  cursorVisible: true,
  setCursorPosition: (a, b) => {
    set({
      x: a,
      y: b,
    });
  },
  hideCursor: () =>
    set({
      cursorVisible: false,
    }),
  showCursor: () =>
    set({
      cursorVisible: true,
    }),
}));

export default useCursorStore;
