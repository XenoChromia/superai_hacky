// src/components/AppHeader.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
// Removed Icon import as it's no longer used for the simplified header
import { Colors } from '../constants/Colors';
import { AppStyles } from '../styles/AppStyles';

// ScreenWidth is no longer needed for responsive hiding as elements are removed
// const ScreenWidth = Dimensions.get('window').width;

const AppHeader = () => (
  // The header container with a marginTop of 20, now much simpler.
  <View style={[AppStyles.headerContainer, { marginTop: 20, justifyContent: 'center' }]}>
    <View style={AppStyles.headerTitleContainer}>
      <Text style={AppStyles.headerTitle}>Genki-San</Text>
    </View>
  </View>
);

export default AppHeader;
