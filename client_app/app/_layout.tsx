// app/_layout.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Import Screens (Paths are relative to this file)
import DashboardScreen from './(tabs)/index'; // app/(tabs)/index.jsx
import MedicalNewsScreen from './(tabs)/medical-news'; // app/(tabs)/medical-news.jsx
import ChatScreen from './(tabs)/chat'; // app/(tabs)/chat.jsx
import SettingsScreen from './(tabs)/settings'; // app/(tabs)/settings.jsx

// Import Constants (Paths are relative to this file's parent directories)
import { Colors } from '../src/constants/Colors';

const Tab = createBottomTabNavigator();

// This component will be used inside NavigationContainer in your main App.js
const MainTabNavigator = ({ onSignOut }) => { // Receive onSignOut prop from App.js
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // We'll use a custom header within each screen
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // Determine icon based on route name defined in Tab.Screen 'name' prop
          if (route.name === 'DashboardTab') {
            iconName = 'home';
          } else if (route.name === 'MedicalNewsTab') {
            iconName = 'book-open';
          } else if (route.name === 'ChatTab') {
            iconName = 'message-square';
          } else if (route.name === 'SettingsTab') {
            iconName = 'settings';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primaryBlue,
        tabBarInactiveTintColor: Colors.grayText,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      })}
    >
      <Tab.Screen
        name="DashboardTab" // Unique name for this tab
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="MedicalNewsTab" // Unique name for this tab
        component={MedicalNewsScreen}
        options={{
          title: 'News',
        }}
      />
      <Tab.Screen
        name="ChatTab" // Unique name for this tab
        component={ChatScreen}
        options={{
          title: 'Chat',
        }}
      />
      <Tab.Screen
        name="SettingsTab" // Unique name for this tab
        // Pass the onSignOut function as a prop to SettingsScreen
        children={() => <SettingsScreen onSignOut={onSignOut} />}
        options={{
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: Platform.OS === 'ios' ? 80 : 70, // Increased height for better spacing
    paddingTop: 8, // More padding at the top
    paddingBottom: Platform.OS === 'ios' ? 25 : 10, // Adjusted padding for iOS notch and Android
    backgroundColor: Colors.white,
    borderTopWidth: 0, // Remove default top border
    borderRadius: 20, // Rounded corners for a softer look
    marginHorizontal: 10, // Add horizontal margin to lift it slightly from edges
    marginBottom: Platform.OS === 'ios' ? 15 : 10, // Lift it from the bottom on iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 }, // More pronounced shadow
    shadowOpacity: 0.15, // Increased opacity for more depth
    shadowRadius: 10, // Softer shadow spread
    elevation: 8, // Android elevation
    position: 'absolute', // Make it float above content
    left: 0,
    right: 0,
  },
  tabBarLabelStyle: {
    fontSize: 12, // Slightly larger font size
    fontWeight: '600', // Make labels a bit bolder
    marginTop: 4,
  },
});

export default MainTabNavigator;
