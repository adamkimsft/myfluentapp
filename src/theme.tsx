import { createTheme } from "@fluentui/react";
import { useEffect, useState } from "react";

export const LIGHT = 'light';
export const DARK = 'dark';
const getSystemTheme = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
};

const AUTO = 'auto';
const THEME_KEY = 'user-theme';

export const getStoredTheme = () => {
  return localStorage.getItem(THEME_KEY) || AUTO;
};

export const storeTheme = (theme: string) => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getCurrentTheme = (storedTheme: string) => {
    if (storedTheme === AUTO) {
      return getSystemTheme();
    }
    return storedTheme;
  };
  
export const useTheme = () => {
    const [theme, setTheme] = useState<string>(getCurrentTheme(getStoredTheme()));

    useEffect(() => {
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        if (getStoredTheme() === AUTO) {
            setTheme(e.matches ? DARK : LIGHT);
        }
        };

        const systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        systemThemeMediaQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
        systemThemeMediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, []);

    const updateTheme = (newTheme: string) => {
        storeTheme(newTheme);
        setTheme(getCurrentTheme(newTheme));
    };

    return { theme, updateTheme };
};


export const webLightTheme = createTheme({
    palette: {
      themePrimary: '#a6d400',
      themeLighterAlt: '#fbfdf3',
      themeLighter: '#eff8d0',
      themeLight: '#e2f2a9',
      themeTertiary: '#c7e55c',
      themeSecondary: '#b0d91a',
      themeDarkAlt: '#95be00',
      themeDark: '#7ea100',
      themeDarker: '#5d7700',
      neutralLighterAlt: '#faf9f8',
      neutralLighter: '#f3f2f1',
      neutralLight: '#edebe9',
      neutralQuaternaryAlt: '#e1dfdd',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c6c4',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralSecondaryAlt: '#8a8886',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
    }});

    export const webDarkTheme = createTheme({
        palette: {
          themePrimary: '#a6d400',
          themeLighterAlt: '#fbfdf3',
          themeLighter: '#eff8d0',
          themeLight: '#e2f2a9',
          themeTertiary: '#c7e55c',
          themeSecondary: '#b0d91a',
          themeDarkAlt: '#95be00',
          themeDark: '#7ea100',
          themeDarker: '#5d7700',
          neutralLighterAlt: '#525252',
          neutralLighter: '#595959',
          neutralLight: '#646464',
          neutralQuaternaryAlt: '#6b6b6b',
          neutralQuaternary: '#717171',
          neutralTertiaryAlt: '#898989',
          neutralTertiary: '#463421',
          neutralSecondary: '#8b6743',
          neutralSecondaryAlt: '#8b6743',
          neutralPrimaryAlt: '#cc9762',
          neutralPrimary: '#e8ac6f',
          neutralDark: '#eebf90',
          black: '#f2cfac',
          white: '#4a4a4a',
        }});