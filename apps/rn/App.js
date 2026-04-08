import { ScrollView, StyleSheet } from "react-native";

import { CardsList } from "./components/CardsList/CardsLists";
import { Header } from "./components/Header/Header";
import { HeroVideo } from "./components/HeroVideo/HeroVideo";

export default function VideoScreen() {
  return (
    <ScrollView style={styles.contentContainer}>
      <Header />

      <HeroVideo />

      <CardsList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "black",
    position: "relative",
  },
});
