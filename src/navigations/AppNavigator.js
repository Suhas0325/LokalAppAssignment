// navigation/AppNavigator.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobsScreen from '../screens/JobScreen';
import BookmarksScreen from '../screens/BookmarkScreen';
import TabBarIcon from './TabBarIcon';
import colors from '../constants/colors';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Jobs') {
            iconName = 'work';
          } else if (route.name === 'Bookmarks') {
            iconName = 'bookmarks';
          }
          return <TabBarIcon name={iconName} focused={focused} />;
        },
      })}
    >
      <Tab.Screen name="Jobs" component={JobsScreen} />
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
    </Tab.Navigator>
  );
}