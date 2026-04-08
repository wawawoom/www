import { StyleSheet, Text, View } from "react-native";

export const CardsList = () => {
  return (
    <View style={styles.listContainer}>
      <Text>Liste des lampes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 5,
    borderColor: "red",
  },
});
