import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { useDb } from "../../store/UseDb";
import { CardLamp } from "../CardLamp/CardLamp";

export const CardsList = () => {
  const { lamps } = useDb();

  useEffect(() => {
    console.log(lamps);
  }, [lamps]);

  return (
    <View style={styles.listContainer}>
      {lamps.map((lamp) => (
        <CardLamp key={lamp.id} lamp={lamp} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: -60,
    paddingHorizontal: 16,
    paddingBottom: 64,
    gap: 16,
  },
});
