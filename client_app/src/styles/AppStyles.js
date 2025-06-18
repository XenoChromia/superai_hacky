// src/styles/AppStyles.js
import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../constants/Colors';

export const AppStyles = StyleSheet.create({
  // --- Core Layout & SafeArea ---
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  screenContent: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingBottom: 70, // Added padding to prevent tab bar overlap
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // --- Header ---
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centered title
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrayBorder,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },

  // --- Dashboard ---
  dashboardTitleSection: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  dashboardMainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  dashboardSubtitle: {
    fontSize: 14,
    color: Colors.grayText,
    marginTop: 4,
  },
  dashboardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  dashboardMetaText: {
    fontSize: 12,
    color: Colors.grayText,
  },
  dashboardMetaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.grayText,
    marginHorizontal: 8,
  },
  dashboardButtonsRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  primaryButton: {
    backgroundColor: Colors.primaryBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  primaryButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: Colors.lightGrayBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGrayBorder,
  },
  secondaryButtonText: {
    color: Colors.primaryText,
    fontWeight: '600',
  },
  vitalCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  fullWidthCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  linkText: {
    fontSize: 14,
    color: Colors.primaryBlue,
    fontWeight: '600',
  },
  vitalCardStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  physicalAssessmentContent: {
    marginTop: 8,
  },
  assessmentList: {
    flexDirection: 'column',
  },
  assessmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  assessmentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  assessmentText: {
    fontSize: 14,
    color: Colors.primaryText,
  },
  historyItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrayBorder,
  },
  historyItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primaryText,
  },
  historyItemSubtitle: {
    fontSize: 13,
    color: Colors.grayText,
    marginTop: 2,
  },
  historyItemDate: {
    fontSize: 12,
    color: Colors.grayText,
    marginTop: 4,
  },
  historyItemDescription: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginTop: 8,
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrayBorder,
  },
  appointmentDateCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lightGrayBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  appointmentDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  appointmentMonth: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.grayText,
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  appointmentDoctorTime: {
    fontSize: 14,
    color: Colors.grayText,
    marginTop: 2,
  },
  appointmentLocation: {
    fontSize: 14,
    color: Colors.grayText,
    marginTop: 2,
  },
  editAppointmentButton: {
    padding: 8,
  },
  noDataText: {
    textAlign: 'center',
    color: Colors.grayText,
    marginVertical: 20,
  },
  addAppointmentButton: {
    backgroundColor: Colors.primaryBlue,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  addAppointmentButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },

  // --- Chat Screen ---
  chatContainer: {
    flex: 1,
  },
  chatMessagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chatMessagesContentContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  messageRowSent: {
    justifyContent: 'flex-end',
  },
  messageRowReceived: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  aiAvatarText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 18,
  },
  messageBubbleSent: {
    backgroundColor: Colors.primaryBlue,
    borderTopRightRadius: 4,
  },
  messageBubbleReceived: {
    backgroundColor: Colors.lightGrayBackground,
    borderTopLeftRadius: 4,
  },
  messageTextSent: {
    color: Colors.white,
    fontSize: 15,
  },
  messageTextReceived: {
    color: Colors.primaryText,
    fontSize: 15,
  },
  messageTimeSent: {
    color: Colors.lightGrayText,
    fontSize: 11,
    marginTop: 4,
    textAlign: 'right',
  },
  messageTimeReceived: {
    color: Colors.grayText,
    fontSize: 11,
    marginTop: 4,
    textAlign: 'left',
  },
  loadingIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  loadingText: {
    marginLeft: 8,
    color: Colors.grayText,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGrayBorder,
    backgroundColor: Colors.white,
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGrayBackground,
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  textInputIcon: {
    marginRight: 8,
  },
  chatInput: {
    flex: 1,
    height: '100%',
  },
  chatAttachButton: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatSendButton: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatFooter: {
    paddingBottom: 5,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  chatFooterText: {
    fontSize: 11,
    color: Colors.grayText,
  },

  // --- Medical News ---
  newsScreenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryText,
    marginBottom: 20,
    paddingHorizontal: 4, // Align with cards
  },
  newsCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  newsImage: {
    width: '100%',
    height: 180,
  },
  newsContent: {
    padding: 16,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  newsSource: {
    fontSize: 12,
    color: Colors.grayText,
    marginVertical: 8,
  },
  newsDescription: {
    fontSize: 14,
    color: Colors.secondaryText,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 18,
    color: Colors.redHeart,
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubText: {
    fontSize: 14,
    color: Colors.grayText,
    textAlign: 'center',
  },

  // --- Settings Screen ---
  settingsSection: {
    marginBottom: 24,
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.grayText,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrayBorder,
  },
  settingsItemText: {
    fontSize: 16,
    color: Colors.primaryText,
  },
  settingsItemValue: {
    fontSize: 16,
    color: Colors.grayText,
  },
  settingsToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 8, // Less padding for switch
    paddingHorizontal: 16,
  },
  settingsItemLast: {
    borderBottomWidth: 0,
  },
  settingsLogoutButton: {
    backgroundColor: Colors.redWarning,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  settingsLogoutButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});