import { createContext, useContext } from "react";

export type ModalContextValue = {
  isDreamJobModalOpen: boolean;
  openDreamJobModal: () => void;
  closeDreamJobModal: () => void;
};

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModal = (): ModalContextValue => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return ctx;
};
