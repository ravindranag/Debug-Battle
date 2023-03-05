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

export const key = [
  "feccccf95cmshe9988a3d5b027c9p114069jsncbd641030485", //0 f
  "1d13b209a5msh63cc1cce3a3e3f9p191553jsn3b54d7a1745d", //1
  "ee70bb5b9emsh2f44446ebf359a2p1f2f2ejsnc80fc661899f", //2
  "9f231d56cemsh7739d039c2154b0p10c572jsnf2e868eafe12", //3
  "c6f4bf0d9fmsh1ba75d0ff371561p1f0d1cjsn235cb4570c73", //4
  "ed67a98a33mshad1b6fdbf4be75cp154094jsnfac461e9aa5a", //5f
  "0baafedbf4mshf64b7552bdd016ap1d7195jsn1b707c7f67a0", //6
  "b76c95f293mshb59a141eb58aedcp12bce7jsn2e4d2654cd45", //7
  "c335f82bebmsh5bb5336998e4e3bp16f736jsne23cd207edaa", //8
  "0c130f71e8msh172fa197b96039dp15356ejsn97dbc5e16b1e", //9
  "b53a86fc76mshdf0b3d1b21ae140p14ebfajsne6824f3a5097", //10
  "051ca3aceamshca04520cb35b5f6p1c8474jsnd92e574d4671", //11
  "cceeb1d42amsh00f4b698342d17ap1a66d4jsn445b353dc7a6", //12

  "7415646ae7msh37f791037366780p1132e2jsna7ba58f2266b",
  "ed67a98a33mshad1b6fdbf4be75cp154094jsnfac461e9aa5a",
  "feccccf95cmshe9988a3d5b027c9p114069jsncbd641030485",
  "e65a98c75cmsh67bd83bd9251413p183893jsn3e3aa6cd1920",
];

const useSubmissionStore = create<SubmissionStore>((set, get) => ({
  attempts: 0,
  questionNo: 5,
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
