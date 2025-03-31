import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { BookmarksProvider } from './src/context/BookmarksContext';
import AppNavigator from './src/navigations/AppNavigator';

export default function App() {
  return (
    <BookmarksProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </BookmarksProvider>
  );
}