// app/(tabs)/chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import AppHeader from '../../src/components/AppHeader'; // Adjusted import path
import { Colors } from '../../src/constants/Colors';    // Adjusted import path
import { AppStyles } from '../../src/styles/AppStyles'; // Adjusted import path

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'AI Health Assistant', text: 'Hello! I\'m your AI Health Assistant. How can I help you today? You can ask me about your health records, medications, or general health questions.', time: '09:15 AM', type: 'received', status: 'online' },
    { id: 2, sender: 'AI Health Assistant', text: 'Here are some things I can help with:\n• Explain your latest test results\n• Provide medication information\n• Answer health-related questions\n• Help schedule appointments', time: '09:16 AM', type: 'received', status: 'online' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  // Scroll to bottom of chat
  useEffect(() => {
    // Timeout ensures layout has rendered before scrolling
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMsg = inputMessage.trim();
    const newMessage = {
      id: messages.length + 1,
      sender: 'User',
      text: userMsg,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'sent',
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');
    setLoading(true);

    // IMPORTANT FOR TESTING/EDUCATIONAL PURPOSES:
    // This directly exposes your SambaNova API key in the client-side code.
    // DO NOT USE THIS APPROACH IN A PRODUCTION APPLICATION.
    // Replace 'YOUR_SAMBANOBA_API_KEY_HERE' with your actual SambaNova API Key.
    const SAMBANOBA_API_KEY = '73504db2-339d-4dde-82c9-766a73d544f6'; // Keep this for testing, but be aware of security risks.
    const SAMBANOBA_BASE_URL = 'https://api.sambanova.ai/v1';
    const SAMBANOBA_MODEL = 'Meta-Llama-3.3-70B-Instruct';

    const systemInstructions = `
You are required to extract the medical symptoms, i.e. the keywords mentioned by the patient's complaint

You are required to respond the json output in this XML tag:
<json>
{
  "gender": <patient gender, stored as string, "null" string if not mentioned>,
  "age": <patient age, stored as integer, "null" string if not mentioned>
  "symptom": <patient symptoms extracted from the complaint here, stored as a list, all text in lower case>
}
</json>

I only want you to respond in this format, and nothing else. any details not provided will be "null" string
`;
    try {
      const response = await fetch(`${SAMBANOBA_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SAMBANOBA_API_KEY}`,
        },
        body: JSON.stringify({
          model: SAMBANOBA_MODEL,
          messages: [
            { role: "system", content: systemInstructions },
            { role: "user", content: userMsg }
          ],
          max_tokens: 256,
          temperature: 0.1
        }),
      });

      const result = await response.json();

      if (response.ok && result.choices && result.choices.length > 0 && result.choices[0].message) {
        const aiText = result.choices[0].message.content || "I'm sorry, I couldn't process that request.";
        const aiResponse = {
          id: messages.length + 2,
          sender: 'AI Health Assistant',
          text: aiText,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          type: 'received',
          status: 'online',
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      } else {
        console.error('SambaNova API response error or unexpected structure:', result);
        const errorDetail = result.error ? result.error.message : 'Unknown error';
        const defaultErrorResponse = {
          id: messages.length + 2,
          sender: 'AI Health Assistant',
          text: `I apologize, but I could not get a response from the AI. Error: ${errorDetail}. Please try again later.`,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          type: 'received',
          status: 'online',
        };
        setMessages((prevMessages) => [...prevMessages, defaultErrorResponse]);
      }
    } catch (error) {
      console.error('Error fetching AI response from SambaNova:', error);
      const errorResponse = {
        id: messages.length + 2,
        sender: 'AI Health Assistant',
        text: 'There was an error connecting to the SambaNova AI service. Please check your network and API key.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: 'received',
        status: 'online',
      };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={AppStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <AppHeader />
      <KeyboardAvoidingView
        style={AppStyles.screenContent} // Use a consistent style with bottom padding
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Standard offset
      >
        <ScrollView
          ref={scrollViewRef}
          style={AppStyles.chatMessagesContainer}
          contentContainerStyle={AppStyles.chatMessagesContentContainer}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                AppStyles.messageRow,
                msg.type === 'sent' ? AppStyles.messageRowSent : AppStyles.messageRowReceived,
              ]}
            >
              {msg.type === 'received' && (
                <View style={AppStyles.aiAvatar}>
                  <Text style={AppStyles.aiAvatarText}>AI</Text>
                </View>
              )}
              <View
                style={[
                  AppStyles.messageBubble,
                  msg.type === 'sent' ? AppStyles.messageBubbleSent : AppStyles.messageBubbleReceived,
                ]}
              >
                <Text style={msg.type === 'sent' ? AppStyles.messageTextSent : AppStyles.messageTextReceived}>
                  {msg.text}
                </Text>
                <Text style={msg.type === 'sent' ? AppStyles.messageTimeSent : AppStyles.messageTimeReceived}>
                  {msg.time}
                </Text>
              </View>
            </View>
          ))}
          {loading && (
            <View style={AppStyles.loadingIndicatorContainer}>
              <ActivityIndicator size="small" color={Colors.primaryBlue} />
              <Text style={AppStyles.loadingText}>AI is typing...</Text>
            </View>
          )}
        </ScrollView>

        <View style={AppStyles.chatInputContainer}>
          <View style={AppStyles.textInputWrapper}>
            <Icon name="search" size={18} color={Colors.grayText} style={AppStyles.textInputIcon} />
            <TextInput
              style={AppStyles.chatInput}
              placeholder="Ask me about your health..."
              placeholderTextColor={Colors.grayText}
              value={inputMessage}
              onChangeText={setInputMessage}
              onSubmitEditing={handleSendMessage}
              returnKeyType="send"
            />
          </View>
          <TouchableOpacity style={AppStyles.chatAttachButton}>
            <Icon name="paperclip" size={20} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSendMessage} style={AppStyles.chatSendButton}>
            <Icon name="send" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={AppStyles.chatFooter}>
          <Text style={AppStyles.chatFooterText}>
            All messages are HIPAA compliant and encrypted end-to-end
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;