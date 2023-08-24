import { Slot } from 'expo-router';

// Contexts.
import { ThemeProvider } from '../contexts/ThemeContext';

/****************************************
 * - Root Layout -
 ***************************************/
export default function RootLayout() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
