"use client";

import { useState, useEffect } from 'react';

interface WeatherData {
  location: {
    lat: number;
    lon: number;
    timezone: string;
  };
  current: {
    tempC: number;
    condition: string;
    windKph: number;
  };
  forecast: Array<{
    date: string;
    minC: number;
    maxC: number;
    condition: string;
  }>;
}

// Weather condition to emoji mapping
const getWeatherEmoji = (condition: string): string => {
  const emojiMap: { [key: string]: string } = {
    'Clear': '☀️',
    'Mainly Clear': '🌤️',
    'Partly Cloudy': '⛅',
    'Overcast': '☁️',
    'Foggy': '🌫️',
    'Depositing Rime Fog': '🌫️',
    'Light Drizzle': '🌦️',
    'Moderate Drizzle': '🌧️',
    'Dense Drizzle': '🌧️',
    'Light Freezing Drizzle': '🌨️',
    'Dense Freezing Drizzle': '🌨️',
    'Slight Rain': '🌦️',
    'Moderate Rain': '🌧️',
    'Heavy Rain': '🌧️',
    'Light Freezing Rain': '🌨️',
    'Heavy Freezing Rain': '🌨️',
    'Slight Snow': '🌨️',
    'Moderate Snow': '❄️',
    'Heavy Snow': '❄️',
    'Snow Grains': '🌨️',
    'Slight Rain Showers': '🌦️',
    'Moderate Rain Showers': '🌧️',
    'Violent Rain Showers': '⛈️',
    'Slight Snow Showers': '🌨️',
    'Heavy Snow Showers': '❄️',
    'Thunderstorm': '⛈️',
    'Thunderstorm with Slight Hail': '⛈️',
    'Thunderstorm with Heavy Hail': '⛈️',
  };
  return emojiMap[condition] || '🌤️';
};

// Loading skeleton component
const WeatherSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-3 bg-gray-200 rounded w-full"></div>
      ))}
    </div>
  </div>
);

const RightbarWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    const getLocationAndWeather = async () => {
      try {
        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ lat: latitude, lon: longitude });
            },
            () => {
              // Fallback to Istanbul if geolocation is denied
              setLocation({ lat: 41.0082, lon: 28.9784 });
            }
          );
        } else {
          // Fallback to Istanbul if geolocation is not supported
          setLocation({ lat: 41.0082, lon: 28.9784 });
        }
      } catch (err) {
        setLocation({ lat: 41.0082, lon: 28.9784 });
      }
    };

    getLocationAndWeather();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return;

      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/weather?lat=${location.lat}&lon=${location.lon}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError('Weather unavailable');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchWeather();
    }
  }, [location]);

  // Refresh weather data every 30 minutes
  useEffect(() => {
    if (!location) return;

    const interval = setInterval(() => {
      fetch(`/api/weather?lat=${location.lat}&lon=${location.lon}`)
        .then(res => res.json())
        .then(data => setWeatherData(data))
        .catch(() => console.error('Weather refresh error'));
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [location]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  if (loading) {
    return (
      <div className="rounded-2xl shadow-md p-4 bg-white dark:bg-gray-800 max-w-[320px]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🌤</span>
          <h3 className="font-semibold text-gray-900 dark:text-white">Weather</h3>
        </div>
        <WeatherSkeleton />
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="rounded-2xl shadow-md p-4 bg-white dark:bg-gray-800 max-w-[320px]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🌤</span>
          <h3 className="font-semibold text-gray-900 dark:text-white">Weather</h3>
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          {error || 'Weather unavailable'}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl shadow-md p-4 bg-white dark:bg-gray-800 max-w-[320px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🌤</span>
        <h3 className="font-semibold text-gray-900 dark:text-white">Weather</h3>
      </div>

      {/* Current Weather */}
      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {weatherData.current.tempC}°C
          </span>
          <span className="text-2xl">
            {getWeatherEmoji(weatherData.current.condition)}
          </span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          {weatherData.current.condition}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Wind: {weatherData.current.windKph} km/h
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          5-Day Forecast
        </h4>
        <div className="space-y-2">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 w-12">
                  {formatDate(day.date)}
                </span>
                <span className="text-lg">
                  {getWeatherEmoji(day.condition)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-300">
                  {day.minC}°
                </span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {day.maxC}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location info */}
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {weatherData.location.timezone}
        </div>
      </div>
    </div>
  );
};

export default RightbarWeather;
