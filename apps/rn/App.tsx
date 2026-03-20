import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useWuiFonts, WuiButton, WuiButtonColor } from 'wui-rn/src';

export default function App() {
  const [fontsLoaded] = useWuiFonts();

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Open up App.tsx to start working on your app!</Text>
      <WuiButton
        color={WuiButtonColor.PRIMARY}
        label="WuiButton from wui-rn"
        onPress={() => {}}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    marginBottom: 8,
  },
});
