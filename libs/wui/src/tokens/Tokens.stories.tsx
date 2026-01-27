import type { Meta, StoryObj } from '@storybook/react';
import { WuiTitle } from '../components/WuiTitle';
import colorTokens from './core/color.json';
import { WuiText, WuiTextSize } from '../components/WuiText';

const meta = {
  title: 'Tokens/Colors',
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  render: () => {
    const colors = colorTokens.color;
    const colorNames = Object.keys(colors) as Array<keyof typeof colors>;

    // Collect all color entries
    const colorEntries: Array<{ colorName: string; shade: string; value: string }> = [];

    colorNames.forEach((colorName) => {
      const colorPalette = colors[colorName];
      Object.entries(colorPalette).forEach(([shade, colorData]) => {
        if (colorData && typeof colorData === 'object' && 'value' in colorData) {
          colorEntries.push({
            colorName: colorName as string,
            shade: shade.trim(),
            value: colorData.value as string,
          });
        }
      });
    });

    // Sort by color name, then by shade number
    colorEntries.sort((a, b) => {
      if (a.colorName !== b.colorName) {
        return a.colorName.localeCompare(b.colorName);
      }
      const numA = parseInt(a.shade) || 0;
      const numB = parseInt(b.shade) || 0;
      return numA - numB;
    });

    return (
      <div>
        <WuiTitle>Colors Tokens</WuiTitle>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '24px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #e0e0e0' }}><WuiText size={WuiTextSize.L}>Color</WuiText></th>
              <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #e0e0e0' }}><WuiText size={WuiTextSize.L}>Shade</WuiText></th>
              <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #e0e0e0' }}><WuiText size={WuiTextSize.L}>Example</WuiText></th>
              <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #e0e0e0' }}><WuiText size={WuiTextSize.L}>Value</WuiText></th>
              <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #e0e0e0' }}><WuiText size={WuiTextSize.L}>Enum</WuiText></th>
            </tr>
          </thead>

          <tbody>
            {colorEntries.map((entry, index) => (
              <tr key={`${entry.colorName}-${entry.shade}-${index}`}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                  <WuiText>{entry.colorName.charAt(0).toUpperCase() + entry.colorName.slice(1)}</WuiText>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}><WuiText>{entry.shade}</WuiText></td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '40px',
                      backgroundColor: entry.value,
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                    }}
                  />
                </td>

                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>
                  <code>{entry.value}</code>
                </td>

                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>
                  <code>WuiColor.{entry.colorName.toUpperCase()}_{entry.shade.toUpperCase()}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
