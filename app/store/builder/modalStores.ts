import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type CalculateModalState = {
  value: boolean;
  show: () => void;
  hide: () => void;
};

export const useModalCalculateStore = create<CalculateModalState>((set) => ({
  value: false,
  show: () => set(() => ({ value: true })),
  hide: () => set(() => ({ value: false })),
}));

type ModalState = {
  value: boolean;
  show: () => void;
  hide: () => void;
};

export const useModalEntryStore = create<ModalState>((set) => ({
  value: false,
  show: () => set(() => ({ value: true })),
  hide: () => set(() => ({ value: false })),
}));

type AddModalEntryState = {
  value: boolean;
  show: () => void;
  hide: () => void;
};

export const useModalAddEntryStore = create<AddModalEntryState>((set) => ({
  value: false,
  show: () => set(() => ({ value: true })),
  hide: () => set(() => ({ value: false })),
}));

type HeaderState = {
  value: boolean;
  open: () => void;
  close: () => void;
};

export const useHeaderStore = create<HeaderState>((set) => ({
  value: false,
  open: () => set(() => ({ value: true })),
  close: () => set(() => ({ value: false })),
}));

// Hamburger
type NavShowState = {
  value: boolean;
  show: () => void;
  hide: () => void;
};

export const useNavShowStore = create<NavShowState>((set) => ({
  value: false,
  show: () => set(() => ({ value: true })),
  hide: () => set(() => ({ value: false })),
}));
