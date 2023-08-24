// React.
import { View, Button, Text } from 'react-native';
import { Link } from 'expo-router';
import 'react-native-url-polyfill/auto';

/****************************************
 * - Main Page -
 ***************************************/
export default function App() {
  // Render.
  return (
    <View
      style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>Landing Page</Text>
      <Link href='/account' asChild>
        <Button title='View Account Details' />
      </Link>
    </View>
  );
}
