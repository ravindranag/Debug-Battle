import { create } from "zustand";

const contentList: Record<string, CursorContent> = {
  hero: {
    text: "Ready to save the day🥊",
    img: "shield.png",
  },
  villain: {
    text: "Time to destroy☠️",
    img: "redskull.png",
  },
  hammer: {
    text: "",
    img: "hammer.png",
  },
  spider: {
    text: "",
    img: "spider.png",
  },
  groot: {
    text: "",
    img: "groot.png",
  },
};

type CursorContent = {
  text: string;
  img: string;
};

interface CursorStore {
  x: number;
  y: number;
  cursorVisible: boolean;
  isHovering: boolean;
  backgroundColor: string;
  cursorContent: CursorContent | null;
  setCursorPosition: (a: number, b: number) => void;
  hideCursor: () => void;
  showCursor: () => void;
  setHoveringState: (V: boolean, bgColor?: string) => void;
  setCursorContent: (v: boolean, type?: string) => void;
}

const useCursorStore = create<CursorStore>((set) => ({
  x: 0,
  y: 0,
  cursorVisible: true,
  isHovering: false,
  backgroundColor: "#009900",
  cursorContent: null,
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
  setHoveringState: (v, bgColor) =>
    set({
      isHovering: v,
      backgroundColor: bgColor ? bgColor : "#009900",
    }),
  setCursorContent: (v, type) => {
    if (v && type) {
      set({
        backgroundColor: "transparent",
        cursorContent: contentList[type],
      });
    } else {
      set({
        backgroundColor: "#009900",
        cursorContent: null,
      });
    }
  },
}));

export default useCursorStore;
