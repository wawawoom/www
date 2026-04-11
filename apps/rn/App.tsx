import { useEffect } from "react";

import { useWuiFonts } from "wui-rn";

import { LoadingFont } from "./components/LoadingFont/LoadingFont";
import { Main } from "./components/Main/Main";
import { useDb } from "./store/UseDb";

export const App = () => {
  const [fontsLoaded] = useWuiFonts();
  const { lamps, fetchLamps } = useDb();

  useEffect(() => {
    if (lamps.length === 0) {
      fetchLamps();
    }
  }, [lamps.length]);

  if (!fontsLoaded || lamps.length === 0) {
    return <LoadingFont />;
  }

  return <Main />;
};
