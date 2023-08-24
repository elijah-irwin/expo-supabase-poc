import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactElement,
} from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error('Theme context must be used within the provider.');
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactElement }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme || 'light');

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme);
  }

  useEffect(() => {
    async function getTheme() {
      try {
        const theme = await AsyncStorage.getItem('theme');
        if ((theme && theme === 'light') || theme === 'dark') setTheme(theme);
      } catch (err) {
        console.log(err);
      }
    }

    getTheme();
  }, []);

  // Render.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
