import type { Preview } from '@storybook/react-native';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useWuiFonts } from '../src/fonts/useWuiFonts';

function WithWuiFonts({ children }: { children: React.ReactNode }) {
  const [loaded] = useWuiFonts();

  if (!loaded) {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return <>{children}</>;
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <WithWuiFonts>
        <Story />
      </WithWuiFonts>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
