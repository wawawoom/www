import React, { type ReactNode } from "react";
import { ScrollView } from "react-native";

export const StoryContainer = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        alignItems: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 0,
      }}
    >
      {children}
    </ScrollView>
  );
};
