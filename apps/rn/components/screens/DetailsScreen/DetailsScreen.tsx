import { ScrollView, Text, View } from "react-native";

import {
  type RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { WuiButton, WuiButtonColor, WuiButtonSize, WuiText } from "wui-rn/src";

import type { DetailsFlowParamList } from "../../../navigation/types";
import useStore from "../../../state/useStore";

type DetailsScreenRouteProp = RouteProp<DetailsFlowParamList, "Details">;
type DetailsScreenNavigationProp = NativeStackNavigationProp<
  DetailsFlowParamList,
  "Details"
>;

const DetailsScreen = (): React.ReactNode => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const route = useRoute<DetailsScreenRouteProp>();
  const { count } = useStore();

  const { itemId, otherParam } = route.params;

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
      }}
    >
      <WuiText>Items viewed count: {count}</WuiText>

      <View style={{ marginBottom: 30 }}>
        <Text>Item ID: {itemId}</Text>
        <Text>Other Param: {otherParam}</Text>
      </View>

      <WuiButton
        label="Go Back"
        color={WuiButtonColor.SUCCESS}
        size={WuiButtonSize.S}
        onPress={() => navigation.goBack()}
      />

      <WuiButton
        label="Open Modal"
        color={WuiButtonColor.WARNING}
        size={WuiButtonSize.S}
        onPress={() => navigation.navigate("Modal")}
      />
    </ScrollView>
  );
};

export default DetailsScreen;
