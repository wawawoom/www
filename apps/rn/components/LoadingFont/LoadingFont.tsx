import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useWuiFonts } from "wui-rn";

import { Main } from "../Main/Main";

export const LoadingFont = () => {
  const [fontsLoaded] = useWuiFonts();

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Main />;
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
