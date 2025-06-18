"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";

// Define message type
type MessageType = {
  id: number;
  sender: string;
  message: string;
  time: string;
  type: 'sent' | 'received';
  avatar?: string;
};

// System instructions for the AI assistant
const SYSTEM_INSTRUCTIONS = `
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

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      sender: 'AI Health Assistant',
      message: "Hello! I'm your AI Health Assistant. How can I help you today? You can ask me about your health records, medications, or general health questions.",
      time: '09:15 AM',
      type: 'received',
      avatar: 'AI'
    },
    {
      id: 2,
      sender: 'AI Health Assistant',
      message: "Here are some things I can help with:\n• Explain your latest test results\n• Provide medication information\n• Answer health-related questions\n• Help schedule appointments",
      time: '09:16 AM',
      type: 'received',
      avatar: 'AI'
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to call SambaNova API
  const callAI = async (userMessage: string) => {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userMessage,
          systemInstructions: SYSTEM_INSTRUCTIONS
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.aiResponse;
    } catch (error) {
      console.error('Error calling AI:', error);
      return "I'm having trouble connecting right now. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      // Add user message
      const newUserMessage: MessageType = {
        id: messages.length + 1,
        sender: 'You',
        message: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'sent'
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      setMessage('');
      setIsTyping(true);

      // Call AI and get response
      const aiResponse = await callAI(message);
      
      // Add AI response to messages
      const newAIMessage: MessageType = {
        id: messages.length + 2,
        sender: 'AI Health Assistant',
        message: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'received',
        avatar: 'AI'
      };
      
      setMessages(prev => [...prev, newAIMessage]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Professional Container */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">

            {/* Official Header */}
            <NavBar />

            {/* Main Chat Interface */}
            <main className="h-[calc(100vh-240px)]">
              {/* Chat Area */}
              <div className="w-full h-full flex flex-col bg-white">
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">AI</span>
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">AI Health Assistant</h3>
                        <p className="text-sm text-gray-600">Always available • Online</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                        msg.type === 'sent' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        {msg.type === 'received' && (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-xs">{msg.avatar}</span>
                          </div>
                        )}
                        <div className={`px-4 py-3 rounded-2xl ${
                          msg.type === 'sent'
                            ? 'bg-blue-600 text-white rounded-br-sm'
                            : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{msg.message}</p>
                          <p className={`text-xs mt-1 ${
                            msg.type === 'sent' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-end space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-xs">AI</span>
                        </div>
                        <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200 text-gray-900 rounded-bl-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-200 bg-white">
                  <div className="flex items-end space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                        <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
                          <Paperclip className="w-5 h-5" />
                        </button>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask me about your health..."
                          className="flex-1 border-none outline-none resize-none text-sm min-h-[20px] max-h-32"
                          rows={1}
                        />
                        <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
                          <Smile className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isTyping}
                      className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    All messages are HIPAA compliant and encrypted end-to-end
                  </p>
                </div>
              </div>
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}