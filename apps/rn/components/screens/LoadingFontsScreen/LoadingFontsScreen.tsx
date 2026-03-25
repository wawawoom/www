import { ActivityIndicator, View } from "react-native";
import { StyleSheet } from "react-native";

const LoadingFontsScreen = (): React.ReactNode => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default LoadingFontsScreen;
