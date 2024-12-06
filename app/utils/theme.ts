import {AppTheme} from '@app/types/theme';

const theme: AppTheme = {
  light: {
    background: '#FOFOFO',
    text: '#E1F5FE',
    primary: '#362A84',
    secondary: '#DDB130',
    card: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

};
export function useThemeColors() {
  return theme.light;
}
