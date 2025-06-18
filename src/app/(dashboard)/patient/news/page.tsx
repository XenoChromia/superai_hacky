"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";

// Define strict TypeScript interfaces
interface NewsArticle {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  source: {
    name: string;
  };
  publishedAt: string;
}

interface GNewsResponse {
  articles: NewsArticle[];
  totalArticles?: number;
}

// Type guard for GNewsResponse
function isGNewsResponse(data: unknown): data is GNewsResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'articles' in data &&
    Array.isArray(data.articles)
  );
}

// Type guard for NewsArticle
function isValidArticle(article: unknown): article is NewsArticle {
  return (
    typeof article === 'object' &&
    article !== null &&
    'title' in article && typeof article.title === 'string' &&
    'url' in article && typeof article.url === 'string' &&
    'source' in article && typeof article.source === 'object' && article.source !== null &&
    'name' in article.source && typeof article.source.name === 'string'
  );
}

export default function NewsPage() {
  const [recommendedNews, setRecommendedNews] = useState<NewsArticle[]>([]);
  const [otherNews, setOtherNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Using GNews API (free tier) - healthcare news in English
        const apiKey = process.env.NEXT_PUBLIC_GNEWS_API_KEY || "7b3e9d7d3d3a4e5d3e9d7d3d3a9e5d3f";
        const response = await fetch(
          `https://gnews.io/api/v4/top-headlines?category=health&lang=en&max=5&apikey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
        }

        const data: unknown = await response.json();

        // Validate response structure
        if (!isGNewsResponse(data)) {
          throw new Error('Invalid news data format');
        }

        // Validate each article
        const validArticles = data.articles.filter(isValidArticle);

        if (validArticles.length === 0) {
          throw new Error('No valid news articles found');
        }

        // First 3 articles as recommended news
        setRecommendedNews(validArticles.slice(0, 3));
        // Remaining as other news
        setOtherNews(validArticles.slice(3));

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load news';
        setError(errorMessage);
        console.error('News fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Format date function with proper error handling
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error('Invalid date');

      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return 'Unknown date';
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            <NavBar />
            <main className="bg-gray-50 min-h-screen px-6 md:px-16 py-10 space-y-14">
              <div className="space-y-6">
                {/* Recommended News Skeleton */}
                <div>
                  <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-white rounded-xl shadow-md p-4 h-64 flex flex-col">
                        <div className="h-40 bg-gray-200 rounded-lg mb-3 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6 mb-3 animate-pulse"></div>
                        <div className="flex justify-between mt-auto">
                          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other News Skeleton */}
                <div>
                  <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
                  <div className="space-y-6">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="bg-white rounded-xl shadow-md p-6 h-40 flex flex-col">
                        <div className="flex-1 flex flex-col">
                          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded w-5/6 mb-3 animate-pulse"></div>
                          <div className="flex justify-between mt-auto">
                            <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            <NavBar />
            <main className="bg-gray-50 min-h-screen px-6 md:px-16 py-10 flex items-center justify-center">
              <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-xl text-center max-w-md">
                <h2 className="text-xl font-semibold mb-4">Error Loading News</h2>
                <p className="mb-6">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
                <p className="mt-4 text-sm text-gray-600">
                  If the problem persists, please try again later.
                </p>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  // Render news content
  return (
    <div className="relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
          <NavBar />
          <main className="bg-gray-50 min-h-screen px-6 md:px-16 py-10 space-y-14">
            {/* Recommended News */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recommended News</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedNews.map((article, index) => (
                  <a
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full group"
                  >
                    {article.urlToImage ? (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={article.urlToImage}
                          alt={article.title || "Health news"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.src = `https://picsum.photos/600/400?random=${index}&grayscale`;
                            target.classList.add("object-contain");
                            target.classList.add("p-4");
                          }}
                        />
                      </div>
                    ) : (
                      <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full aspect-video flex items-center justify-center">
                        <div className="text-gray-400 text-center p-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Image Not Available</span>
                        </div>
                      </div>
                    )}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {article.title || "Untitled Article"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">
                        {article.description ?? "No description available"}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {article.source?.name || "Unknown Source"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Other News */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">More Health News</h2>
              <div className="space-y-6">
                {otherNews.map((article, index) => (
                  <a
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group"
                  >
                    {article.urlToImage ? (
                      <div className="sm:w-1/3 aspect-video sm:aspect-auto sm:h-full overflow-hidden">
                        <img
                          src={article.urlToImage}
                          alt={article.title || "Health news"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.src = `https://picsum.photos/300/200?random=${index + 10}&grayscale`;
                            target.classList.add("object-contain");
                            target.classList.add("p-4");
                          }}
                        />
                      </div>
                    ) : (
                      <div className="sm:w-1/3 bg-gray-100 border-2 border-dashed flex items-center justify-center">
                        <div className="text-gray-400 text-center p-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm">No Image</span>
                        </div>
                      </div>
                    )}
                    <div className="p-4 sm:w-2/3">
                      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {article.title || "Untitled Article"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {article.description ?? "No description available"}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {article.source?.name || "Unknown Source"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}


