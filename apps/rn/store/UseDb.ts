import { create } from "zustand";

import Lamp from "../interface/lamp.interface";

interface LampState {
  lamps: Lamp[];
  fetchLamps: () => Promise<void>;
  getLamp: (id: number) => Lamp | undefined;
  getLamps: () => Lamp[];
  getHeroLamp: () => Lamp | null;
}

export const useDb = create<LampState>()((set, get) => ({
  lamps: [],
  fetchLamps: async () => {
    try {
      const res = await fetch(
        "https://wawawoom.fr/projects/wawawood/db/db.json"
      );
      const data: Lamp[] = await res.json();

      set({ lamps: data });
    } catch (error) {
      console.error(error);
    }
  },

  getLamp: (id: number) => {
    return get().lamps.find((lamp) => lamp.id === id);
  },

  getLamps: () => {
    return get().lamps;
  },

  getHeroLamp: () => {
    return get().lamps.find((lamp) => lamp.isFeatured) ?? null;
  },
}));
