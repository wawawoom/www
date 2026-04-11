import { Image, Linking, Pressable, StyleSheet, View } from "react-native";
import { SvgUri } from "react-native-svg";

import { LinearGradient } from "expo-linear-gradient";

export const Header = () => {
  return (
    <View style={styles.header}>
      <LinearGradient
        colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.headerGradient}
        pointerEvents="none"
      />

      <SvgUri
        uri="https://wawawoom.fr/projects/cdn/wawawood/logo/logo.svg"
        width={styles.headerLogo.width}
        height={styles.headerLogo.height}
      />

      <Pressable
        onPress={() =>
          Linking.openURL("https://www.instagram.com/wawawoodstudio/")
        }
      >
        <Image
          source={{
            uri: "https://wawawoom.fr/projects/cdn/wawawood/logo/instagram.png",
          }}
          style={styles.headerInstagram}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 120,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingTop: 50,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerGradient: {
    ...StyleSheet.absoluteFillObject,
  },

  headerLogo: {
    width: 150,
    height: 17,
  },

  headerInstagram: {
    width: 24,
    height: 24,
  },
});
