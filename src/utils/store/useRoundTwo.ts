import { create } from "zustand";

interface RoundTwoStore {
  id: string;
  setId: (i: string) => void;
}

const useRoundTwoStore = create<RoundTwoStore>((set) => ({
  id: "",
  setId: (i) => set({ id: i }),
}));

export default useRoundTwoStore;
