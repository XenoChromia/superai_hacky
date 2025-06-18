// src/components/VitalCard.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { AppStyles } from '../styles/AppStyles';

const VitalCard = ({ children, title, value, status, footer, statusColor }) => (
  <View style={AppStyles.vitalCard}>
    <View style={AppStyles.vitalCardHeader}>
      {children}
      <View style={[AppStyles.vitalCardStatus, { backgroundColor: statusColor }]}>
        <Text style={{ color: statusColor.replace('100', '700'), fontSize: 10, fontWeight: '500' }}>
          {status}
        </Text>
      </View>
    </View>
    <Text style={AppStyles.vitalCardTitle}>{title}</Text>
    <Text style={AppStyles.vitalCardValue}>{value}</Text>
    <Text style={AppStyles.vitalCardFooter}>{footer}</Text>
  </View>
);

export default VitalCard;
