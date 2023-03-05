import { create } from "zustand";

interface SubmissionStore {
  score: number;
  attempts: number;
  questionNo: number;
  currentKey: number;
  penalty: number;
  setAttempts: (n: number) => void;
  setQuestionNumber: (n: number) => void;
  setKey: (n: number) => void;
  setScore: (n: number) => void;
  setPenalty: (n: number) => void;
  resetAttempts: () => void;
}

const key = [
  "7415646ae7msh37f791037366780p1132e2jsna7ba58f2266b",
  "ed67a98a33mshad1b6fdbf4be75cp154094jsnfac461e9aa5a",
  "feccccf95cmshe9988a3d5b027c9p114069jsncbd641030485",
];

const useSubmissionStore = create<SubmissionStore>((set, get) => ({
  attempts: 0,
  questionNo: 0,
  currentKey: 0,
  score: 0,
  penalty: 0,
  setAttempts: (n) => set({ attempts: get().attempts + n }),
  setQuestionNumber: (n) => set({ questionNo: get().questionNo + n }),
  setKey: (n) => set({ currentKey: get().currentKey + n }),
  setScore: (n) => set({ score: get().score + n }),
  setPenalty: (n: number) => set({ penalty: get().penalty + n }),
  resetAttempts: () => set({ attempts: 0 }),
}));

export default useSubmissionStore;
