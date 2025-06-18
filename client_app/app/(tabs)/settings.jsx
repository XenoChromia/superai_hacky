// app/(tabs)/settings.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Switch, // Import Switch component
  Alert, // For simple alerts, replace with custom modal in production
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Using Feather icons

import AppHeader from '../../src/components/AppHeader';
import { Colors } from '../../src/constants/Colors';
import { AppStyles } from '../../src/styles/AppStyles';

const SettingsScreen = () => {
  const [isOptedOut, setIsOptedOut] = useState(false); // State for data opting out

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens,
    // navigate to login screen, etc.
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => {
            console.log("User logged out");
            // Perform actual logout logic here (e.g., clear tokens, navigate)
            // For now, just a console log and alert for demonstration
            Alert.alert("Logged Out", "You have been successfully logged out.");
          }
        }
      ]
    );
  };

  const toggleOptOut = () => {
    setIsOptedOut(previousState => !previousState);
    // In a real app, you would save this preference to storage or a backend
    console.log(`Opt out of selling data: ${!isOptedOut}`);
  };

  return (
    <SafeAreaView style={AppStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <AppHeader />
      <ScrollView style={AppStyles.screenContent}>
        <Text style={AppStyles.newsScreenTitle}>Settings</Text> {/* Reusing title style */}

        {/* Account Settings Section */}
        <View style={AppStyles.settingsSection}>
          <Text style={AppStyles.settingsSectionTitle}>Account</Text>
          <TouchableOpacity style={AppStyles.settingsItem}>
            <Text style={AppStyles.settingsItemText}>Profile Information</Text>
            <Icon name="chevron-right" size={20} color={Colors.grayText} />
          </TouchableOpacity>
          <TouchableOpacity style={AppStyles.settingsItem}>
            <Text style={AppStyles.settingsItemText}>Change Password</Text>
            <Icon name="chevron-right" size={20} color={Colors.grayText} />
          </TouchableOpacity>
          <TouchableOpacity style={[AppStyles.settingsItem, AppStyles.settingsItemLast]}>
            <Text style={AppStyles.settingsItemText}>Linked Accounts</Text>
            <Icon name="chevron-right" size={20} color={Colors.grayText} />
          </TouchableOpacity>
        </View>

        {/* Privacy Settings Section */}
        <View style={AppStyles.settingsSection}>
          <Text style={AppStyles.settingsSectionTitle}>Privacy & Security</Text>
          <TouchableOpacity style={AppStyles.settingsItem}>
            <Text style={AppStyles.settingsItemText}>Privacy Policy</Text>
            <Icon name="chevron-right" size={20} color={Colors.grayText} />
          </TouchableOpacity>
          <TouchableOpacity style={AppStyles.settingsItem}>
            <Text style={AppStyles.settingsItemText}>Terms of Service</Text>
            <Icon name="chevron-right" size={20} color={Colors.grayText} />
          </TouchableOpacity>
          <View style={[AppStyles.settingsToggleContainer, AppStyles.settingsItemLast]}>
            <Text style={AppStyles.settingsItemText}>Opt out of selling data</Text>
            <Switch
              trackColor={{ false: Colors.lightGrayBorder, true: Colors.primaryBlue }}
              thumbColor={isOptedOut ? Colors.white : Colors.white}
              ios_backgroundColor={Colors.lightGrayBorder}
              onValueChange={toggleOptOut}
              value={isOptedOut}
            />
          </View>
        </View>

        {/* Notifications Settings Section */}
        <View style={AppStyles.settingsSection}>
          <Text style={AppStyles.settingsSectionTitle}>Notifications</Text>
          <TouchableOpacity style={AppStyles.settingsItem}>
            <Text style={AppStyles.settingsItemText}>App Notifications</Text>
            <Icon name="chevron-right" size={20} color={Colors.grayText} />
          </TouchableOpacity>
          <TouchableOpacity style={[AppStyles.settingsItem, AppStyles.settingsItemLast]}>
            <Text style={AppStyles.settingsItemText}>Email Preferences</Text>
            <Icon name="chevron-right" size={20} color={Colors.grayText} />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={AppStyles.settingsSection}>
          <Text style={AppStyles.settingsSectionTitle}>About</Text>
          <View style={AppStyles.settingsItem}>
            <Text style={AppStyles.settingsItemText}>Version</Text>
            <Text style={AppStyles.settingsItemValue}>1.0.0</Text>
          </View>
          <TouchableOpacity style={AppStyles.settingsItem}>
            <Text style={AppStyles.settingsItemText}>Help & Support</Text>
            <Icon name="external-link" size={18} color={Colors.grayText} />
          </TouchableOpacity>
          <TouchableOpacity style={[AppStyles.settingsItem, AppStyles.settingsItemLast]}>
            <Text style={AppStyles.settingsItemText}>Rate Us</Text>
            <Icon name="star" size={18} color={Colors.grayText} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={AppStyles.settingsLogoutButton} onPress={handleLogout}>
          <Text style={AppStyles.settingsLogoutButtonText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;