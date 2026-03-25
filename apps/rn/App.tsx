import React from "react";

import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WuiText, WuiTextSize, useWuiFonts } from "wui-rn/src";

import DetailsScreen from "./components/screens/DetailsScreen/DetailsScreen";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";
import LoadingFontsScreen from "./components/screens/LoadingFontsScreen/LoadingFontsScreen";
import ModalScreen from "./components/screens/ModalScreen/ModalScreen";

const stackScreenOptions = {
  headerBackButtonDisplayMode: "minimal" as const,
};

const DetailsFlowStack = createNativeStackNavigator({
  initialRouteName: "Details",
  screenOptions: stackScreenOptions,
  screens: {
    Details: {
      screen: DetailsScreen,
      options: {
        title: "Details",
      },
    },
    Modal: {
      screen: ModalScreen,
      options: {
        title: "Modal",
        presentation: "modal",
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  initialRouteName: "Home",
  screenOptions: stackScreenOptions,
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerTitle: () => <WuiText size={WuiTextSize.L}>Home Screen</WuiText>,
      },
    },
    Details: {
      screen: DetailsFlowStack,
      options: {
        headerShown: false,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  const [fontsLoaded] = useWuiFonts();

  if (!fontsLoaded) {
    return <LoadingFontsScreen />;
  }

  return <Navigation />;
}
