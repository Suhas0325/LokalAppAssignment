import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import JobsScreen from '../screens/JobScreen';
import BookmarksScreen from '../screens/BookmarkScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import { Ionicons } from '@expo/vector-icons';

// Create stack navigator for Jobs
const JobsStack = createStackNavigator();

const JobsStackScreen = () => (
  <JobsStack.Navigator screenOptions={{ headerShown: false }}>
    <JobsStack.Screen name="JobsList" component={JobsScreen} />
    <JobsStack.Screen name="JobDetail" component={JobDetailScreen} />
  </JobsStack.Navigator>
);

// Create stack navigator for Bookmarks
const BookmarksStack = createStackNavigator();

const BookmarksStackScreen = () => (
  <BookmarksStack.Navigator screenOptions={{ headerShown: false }}>
    <BookmarksStack.Screen name="BookmarksList" component={BookmarksScreen} />
    <BookmarksStack.Screen name="JobDetail" component={JobDetailScreen} />
  </BookmarksStack.Navigator>
);

// Create main tab navigator
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Jobs') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Bookmarks') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Jobs" component={JobsStackScreen} />
      <Tab.Screen name="Bookmarks" component={BookmarksStackScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;