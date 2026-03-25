import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { WuiText, WuiTextSize } from "wui-rn/src";
import type { RootStackParamList } from "../../../navigation/types";
import useStore from "../../../state/useStore";

type JsonPlaceholderPhoto = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen = (): React.ReactNode => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { increaseCount } = useStore();

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [photos, setPhotos] = useState<JsonPlaceholderPhoto[]>([]);

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos"
        );
        const json = (await response.json()) as JsonPlaceholderPhoto[];

        setPhotos(Array.isArray(json) ? json : []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingData(false);
      }
    })();
  }, []);

  return (
    <FlatList
      data={isLoadingData ? [] : photos}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
          onPress={() => {
            increaseCount();

            navigation.navigate("Details", {
              screen: "Details",
              params: {
                itemId: item.id,
                otherParam: item.title,
              },
            });
          }}
          accessibilityRole="button"
          accessibilityLabel={item.title}
        >
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={styles.thumbnail}
            accessible={false}
          />

          <View style={styles.titleWrap}>
            <WuiText size={WuiTextSize.M}>{item.title}</WuiText>
          </View>
        </Pressable>
      )}
      ListEmptyComponent={
        isLoadingData ? (
          <View style={styles.empty}>
            <ActivityIndicator size="large" />

            <Text style={styles.emptyText}>Loading data…</Text>
          </View>
        ) : (
          <Text style={styles.emptyText}>No photos</Text>
        )
      }
      contentContainerStyle={styles.listContent}
      keyboardShouldPersistTaps="handled"
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },

  rowPressed: {
    opacity: 0.7,
  },

  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: "#eee",
  },

  titleWrap: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
  },

  empty: {
    flex: 1,
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 8,
    color: "#666",
  },
});

export default HomeScreen;
