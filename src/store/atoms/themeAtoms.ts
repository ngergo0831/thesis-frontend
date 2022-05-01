import { atom } from 'recoil';

export enum ThemeMode {
  Light = 'theme-mode-light',
  Dark = 'theme-mode-dark'
}

export enum ThemeColor {
  Blue = 'theme-mode-blue',
  Red = 'theme-mode-red',
  Cyan = 'theme-mode-cyan',
  Green = 'theme-mode-green',
  Orange = 'theme-mode-orange'
}

export const themeState = atom<IThemeState>({
  key: 'themeState',
  default: {
    mode: ThemeMode.Light,
    color: ThemeColor.Blue
  }
});

interface IThemeState {
  mode: ThemeMode;
  color: ThemeColor;
}
