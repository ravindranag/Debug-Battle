import { create } from "zustand";

interface User {
  username: string;
  reg: number;
  type: string;
  score: number;
  setUser: (username: string, reg: number) => void;
}

const useUserStore = create<User>((set) => ({
  username: "",
  reg: 0,
  type: "",
  score: 0,
  setUser: (un, r) => {
    set({
      username: un,
      reg: r,
    });
  },
}));
