import { Image, StyleSheet, View } from "react-native";

import { WuiText } from "wui-rn";

import { CardLampProps } from "./CardLamp.props";

export const CardLamp = ({ lamp }: CardLampProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: lamp.images[0],
        }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />

      <WuiText>{lamp.name}</WuiText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "red",
    height: 260,
  },
});
