// app/(tabs)/medical-news.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking // To open URLs
} from 'react-native';

import AppHeader from '../../src/components/AppHeader'; // Re-added AppHeader import
import { Colors } from '../../src/constants/Colors';
import { AppStyles } from '../../src/styles/AppStyles'; // Adjusted import path

const MedicalNewsScreen = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicalNews = async () => {
      // IMPORTANT: Replace 'YOUR_NEWSAPI_KEY_HERE' with your actual API key from newsapi.org
      // For testing, you might use a public API key provided by NewsAPI, but remember daily limits.
      const NEWS_API_KEY = '88deb3a8aeb944788a570334910810dd';
      const NEWS_API_URL = `https://newsapi.org/v2/everything?q=medical OR health OR disease OR cure OR medicine OR wellness&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

      try {
        const response = await fetch(NEWS_API_URL);
        const data = await response.json();

        if (data.status === 'ok' && data.articles) {
          // Filter out articles without images or descriptions for better display
          const filteredArticles = data.articles.filter(article =>
            article.urlToImage && article.description && article.title && article.url
          );
          setNewsArticles(filteredArticles);
        } else {
          setError(data.message || 'Failed to fetch news articles.');
        }
      } catch (err) {
        console.error("Error fetching medical news:", err);
        setError('Could not connect to the news API. Please check your network and API key.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalNews();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return (
      <SafeAreaView style={AppStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <AppHeader /> {/* Added AppHeader for consistency */}
        <View style={AppStyles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primaryBlue} />
          <Text style={AppStyles.loadingText}>Fetching Medical News...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={AppStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <AppHeader /> {/* Added AppHeader for consistency */}
        <View style={AppStyles.errorContainer}>
          <Text style={AppStyles.errorText}>Error: {error}</Text>
          <Text style={AppStyles.errorSubText}>Please ensure your NewsAPI.org key is correct and valid.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={AppStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <AppHeader /> {/* Restored the AppHeader */}
      <ScrollView style={AppStyles.screenContent}> {/* Changed to a more generic style */}
        <Text style={AppStyles.newsScreenTitle}>Latest Medical News</Text>
        {newsArticles.map((article, index) => (
          <TouchableOpacity
            key={index}
            style={AppStyles.newsCard}
            onPress={() => Linking.openURL(article.url)} // Open article in browser
          >
            {article.urlToImage && (
              <Image source={{ uri: article.urlToImage }} style={AppStyles.newsImage} />
            )}
            <View style={AppStyles.newsContent}>
              <Text style={AppStyles.newsTitle}>{article.title}</Text>
              <Text style={AppStyles.newsSource}>
                {article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}
              </Text>
              <Text style={AppStyles.newsDescription}>{article.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MedicalNewsScreen;