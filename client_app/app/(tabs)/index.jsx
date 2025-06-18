// app/(tabs)/index.jsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Using Feather icons

import AppHeader from '../../src/components/AppHeader'; // Re-added AppHeader import
import VitalCard from '../../src/components/VitalCard';
import { Colors } from '../../src/constants/Colors';
import { AppStyles } from '../../src/styles/AppStyles'; // Adjusted import path

const DashboardScreen = () => {
  // Mock data for appointments
  const scheduledAppointments = [
    {
      id: '1',
      date: 'July 5, 2025',
      time: '10:00 AM',
      type: 'General Check-up',
      doctor: 'Dr. Jane Doe',
      location: 'Clinic Room 3',
    },
    {
      id: '2',
      date: 'July 15, 2025',
      time: '02:30 PM',
      type: 'Follow-up Consultation',
      doctor: 'Dr. Alexander Smith',
      location: 'Online via Telehealth',
    },
  ];

  const medicalHistoryEntries = [
    {
      id: 'h1',
      title: 'Annual Physical Examination',
      provider: 'Dr. Eleanor Vance',
      date: 'May 17, 2025',
      description: 'Comprehensive physical assessment. All vitals within normal range. Discussion about lifestyle adjustments.',
    },
    {
      id: 'h2',
      title: 'Blood Test Results Review',
      provider: 'Dr. Alexander Smith',
      date: 'April 20, 2025',
      description: 'Reviewed latest blood test results. Cholesterol levels stable. Iron levels slightly low, advised dietary changes.',
    },
    {
      id: 'h3',
      title: 'Vaccination - Flu Shot',
      provider: 'Nurse Sarah Jenkins',
      date: 'October 10, 2024',
      description: 'Administered annual influenza vaccination. Patient tolerated well, no immediate side effects.',
    },
  ];

  // Mock data for recent appointments (currently empty for display)
  const recentAppointments = []; // Keep this empty to show "No recent appointments"

  return (
    <SafeAreaView style={AppStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <AppHeader /> {/* Restored the AppHeader */}
      <ScrollView style={AppStyles.screenContent}> {/* Changed to a more generic style */}

        {/* New Dashboard Title Section */}
        <View style={AppStyles.dashboardTitleSection}>
          <Text style={AppStyles.dashboardMainTitle}>Patient Health Dashboard</Text>
          <Text style={AppStyles.dashboardSubtitle}>Comprehensive health monitoring and medical record management</Text>
          <View style={AppStyles.dashboardMeta}>
            <Text style={AppStyles.dashboardMetaText}>Last Updated: June 17, 2025 - 14:32 EST</Text>
            <View style={AppStyles.dashboardMetaDot} />
            <Text style={AppStyles.dashboardMetaText}>Next Appointment: June 25, 2025</Text>
          </View>
          <View style={AppStyles.dashboardButtonsRow}> {/* New style for buttons */}
            <TouchableOpacity style={AppStyles.primaryButton}>
              <Text style={AppStyles.primaryButtonText}>Emergency Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={AppStyles.secondaryButton}>
              <Text style={AppStyles.secondaryButtonText}>Print Records</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Vital Cards */}
        <View style={AppStyles.vitalCardsGrid}>
          <VitalCard
            title="Cardiovascular"
            value="112/74 mmHg"
            status="Normal"
            footer="HR: 50 BPM"
            statusColor={Colors.greenStatus}
          >
            <Icon name="heart" size={24} color={Colors.redHeart} />
          </VitalCard>
          <VitalCard
            title="Physical Activity"
            value="18,233 steps"
            status="Active"
            footer="18.8 km today"
            statusColor={Colors.blueStatus}
          >
            <Icon name="activity" size={24} color={Colors.blueActivity} />
          </VitalCard>
          <VitalCard
            title="Health Risk Score"
            value="49/100"
            status="Needs Improvement"
            footer="Low Risk"
            statusColor={Colors.yellowStatus}
          >
            <Icon name="alert-triangle" size={24} color={Colors.yellowWarning} />
          </VitalCard>
          <VitalCard
            title="Medications"
            value="5 Active"
            status="Compliant"
            footer="Next: None"
            statusColor={Colors.purpleStatus}
          >
            <Icon name="clipboard" size={24} color={Colors.purpleMedicine} />
          </VitalCard>
        </View>

        {/* Physical Assessment - Now full width */}
        <View style={AppStyles.fullWidthCard}>
          <View style={AppStyles.cardHeader}>
            <Text style={AppStyles.cardTitle}>Physical Assessment</Text>
            <View style={[AppStyles.vitalCardStatus, { backgroundColor: Colors.greenStatus }]}>
              <Text style={{ color: Colors.greenText, fontSize: 10, fontWeight: '500' }}>
                Normal Range
              </Text>
            </View>
          </View>
          <View style={AppStyles.physicalAssessmentContent}>
            <View style={AppStyles.assessmentList}>
              <View style={AppStyles.assessmentItem}>
                <View style={[AppStyles.assessmentDot, { backgroundColor: Colors.redHeart }]} />
                <Text style={AppStyles.assessmentText}>Cardiovascular: Normal</Text>
              </View>
              <View style={AppStyles.assessmentItem}>
                <View style={[AppStyles.assessmentDot, { backgroundColor: Colors.blueActivity }]} />
                <Text style={AppStyles.assessmentText}>Respiratory: Normal</Text>
              </View>
              <View style={AppStyles.assessmentItem}>
                <View style={[AppStyles.assessmentDot, { backgroundColor: Colors.purpleMedicine }]} />
                <Text style={AppStyles.assessmentText}>Neurological: Normal</Text>
              </View>
            </View>
            <Text style={{ fontSize: 12, color: Colors.grayText, marginTop: 10 }}>
              Detailed physical assessment results are available in your full medical history.
            </Text>
          </View>
        </View>

        {/* Medical History - Now full width */}
        <View style={AppStyles.fullWidthCard}>
          <View style={AppStyles.cardHeader}>
            <Text style={AppStyles.cardTitle}>Medical History</Text>
            <TouchableOpacity>
              <Text style={AppStyles.linkText}>View Full History</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ maxHeight: 200 }}>
            {medicalHistoryEntries.map((entry, index) => (
              <View key={entry.id} style={[AppStyles.historyItem, index === medicalHistoryEntries.length - 1 && { borderBottomWidth: 0 }]}>
                <Text style={AppStyles.historyItemTitle}>{entry.title}</Text>
                <Text style={AppStyles.historyItemSubtitle}>{entry.provider}</Text>
                <Text style={AppStyles.historyItemDate}>{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                <Text style={AppStyles.historyItemDescription}>{entry.description}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recent Appointments - Now full width */}
        <View style={AppStyles.fullWidthCard}>
          <View style={AppStyles.cardHeader}>
            <Text style={AppStyles.cardTitle}>Recent Appointments</Text>
            <Icon name="clock" size={20} color={Colors.grayText} />
          </View>
          {recentAppointments.length > 0 ? (
            <ScrollView style={{ maxHeight: 200 }}>
              {/* Render recent appointments if available */}
            </ScrollView>
          ) : (
            <>
              <Text style={AppStyles.noDataText}>No recent appointments to display.</Text>
              <TouchableOpacity style={AppStyles.addAppointmentButton}>
                <Text style={AppStyles.addAppointmentButtonText}>+ Schedule New</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Scheduled Appointments - Now full width */}
        <View style={AppStyles.fullWidthCard}>
          <View style={AppStyles.cardHeader}>
            <Text style={AppStyles.cardTitle}>Scheduled Appointments</Text>
            <Icon name="calendar" size={20} color={Colors.grayText} />
          </View>
          {scheduledAppointments.length > 0 ? (
            <ScrollView style={{ maxHeight: 200 }}>
              {scheduledAppointments.map((appointment, index) => (
                <View key={appointment.id} style={[AppStyles.appointmentItem, index === scheduledAppointments.length - 1 && { borderBottomWidth: 0 }]}>
                  <View style={AppStyles.appointmentDateCircle}>
                    <Text style={AppStyles.appointmentDay}>{new Date(appointment.date).getDate()}</Text>
                    <Text style={AppStyles.appointmentMonth}>{new Date(appointment.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</Text>
                  </View>
                  <View style={AppStyles.appointmentDetails}>
                    <Text style={AppStyles.appointmentType}>{appointment.type}</Text>
                    <Text style={AppStyles.appointmentDoctorTime}>{appointment.doctor} - {appointment.time}</Text>
                    <Text style={AppStyles.appointmentLocation}>{appointment.location}</Text>
                  </View>
                  <TouchableOpacity style={AppStyles.editAppointmentButton}>
                    <Icon name="edit" size={16} color={Colors.primaryBlue} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          ) : (
            <>
              <Text style={AppStyles.noDataText}>No scheduled appointments to display.</Text>
              <TouchableOpacity style={AppStyles.addAppointmentButton}>
                <Text style={AppStyles.addAppointmentButtonText}>+ Schedule New</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;