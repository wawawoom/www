import { ScrollView, StyleSheet } from "react-native";

import { CardsList } from "../CardsList/CardsLists";
import { Header } from "../Header/Header";
import { HeroSection } from "../HeroSection/HeroSection";

export const Main = () => {
  return (
    <ScrollView style={styles.contentContainer}>
      <Header />

      <HeroSection />

      <CardsList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "black",
    position: "relative",
  },
});
