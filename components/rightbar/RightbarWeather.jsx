"use client";

import { useState, useEffect } from 'react';


const RightbarWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get weather condition emoji
  const getWeatherEmoji = (condition) => {
    const emojiMap = {
      'Clear': '☀️',
      'Mainly Clear': '☀️',
      'Partly Cloudy': '⛅',
      'Overcast': '☁️',
      'Foggy': '🌫️',
      'Depositing Rime Fog': '🌫️',
      'Light Drizzle': '🌦️',
      'Moderate Drizzle': '🌦️',
      'Dense Drizzle': '🌧️',
      'Light Freezing Drizzle': '🌨️',
      'Dense Freezing Drizzle': '🌨️',
      'Slight Rain': '🌦️',
      'Moderate Rain': '🌧️',
      'Heavy Rain': '🌧️',
      'Light Freezing Rain': '🌨️',
      'Heavy Freezing Rain': '🌨️',
      'Slight Snow': '🌨️',
      'Moderate Snow': '🌨️',
      'Heavy Snow': '❄️',
      'Snow Grains': '🌨️',
      'Slight Rain Showers': '🌦️',
      'Moderate Rain Showers': '🌧️',
      'Violent Rain Showers': '🌧️',
      'Slight Snow Showers': '🌨️',
      'Heavy Snow Showers': '❄️',
      'Thunderstorm': '⚡',
      'Thunderstorm with Slight Hail': '⚡',
      'Thunderstorm with Heavy Hail': '⚡',
    };
    return emojiMap[condition] || '🌤️';
  };

  // Format date to weekday
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Fetch weather data
  const fetchWeather = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
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

  // Get user location and fetch weather
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => {
          // Fallback to Istanbul coordinates
          fetchWeather(41.0082, 28.9784);
        }
      );
    } else {
      // Fallback to Istanbul coordinates
      fetchWeather(41.0082, 28.9784);
    }
  }, []);

  if (loading) {
    return (
      <div className="weather-widget-loading">
        <div className="relative">
          {/* Glowing header background */}
          <div className="weather-loading-header"></div>
          
          <h3 className="weather-title relative">
            7-DAY FORECAST
          </h3>
          
          <div className="relative space-y-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="weather-loading-item">
                <div className="weather-loading-row">
                  <div className="weather-loading-skeleton weather-loading-skeleton-medium"></div>
                  <div className="weather-loading-skeleton weather-loading-skeleton-icon"></div>
                  <div className="weather-loading-skeleton weather-loading-skeleton-wide"></div>
                  <div className="weather-loading-skeleton weather-loading-skeleton-medium"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="weather-widget-error">
        <div className="relative">
          <div className="weather-error-bg"></div>
          
          <h3 className="weather-title-error relative">
            7-DAY FORECAST
          </h3>
          
          <div className="weather-error-content relative">
            <div className="weather-error-icon">⚠️</div>
            <p className="weather-error-text">{error || 'Weather unavailable'}</p>
          </div>
        </div>
      </div>
    );
  }

  // Create 7-day forecast data
  const sevenDayForecast = [
    {
      day: 'Today',
      condition: weatherData.current.condition,
      icon: getWeatherEmoji(weatherData.current.condition),
      high: weatherData.current.tempC,
      low: weatherData.current.tempC - 5 // Approximate low
    },
    ...weatherData.forecast.slice(0, 6).map(day => ({
      day: formatDate(day.date),
      condition: day.condition,
      icon: getWeatherEmoji(day.condition),
      high: day.maxC,
      low: day.minC
    }))
  ];

  return (
    <div className="weather-widget">
      {/* Animated background elements */}
      <div className="weather-bg-primary"></div>
      <div className="weather-bg-accent-1"></div>
      <div className="weather-bg-accent-2"></div>
      
      {/* Content */}
      <div className="weather-content">
        {/* Header with gradient text and glow effect */}
        <div className="weather-header">
          <h3 className="weather-title">
            7-DAY FORECAST
          </h3>
          <div className="weather-divider"></div>
        </div>
        
        {/* 7-Day Forecast List */}
        <div className="weather-forecast-container">
          {sevenDayForecast.map((day, index) => (
            <div key={index} className="weather-forecast-item">
              <div className="weather-forecast-row">
                {/* Day */}
                <div className="weather-day">
                  <span className="weather-day-text">
                    {day.day}
                  </span>
                </div>
                
                {/* Weather Icon with glow effect */}
                <div className="weather-icon-container">
                  <span className="weather-icon">
                    {day.icon}
                  </span>
                  <div className="weather-icon-glow"></div>
                </div>
                
                {/* Weather Condition */}
                <div className="weather-condition-container">
                  <span className="weather-condition-text">
                    {day.condition}
                  </span>
                </div>
                
                {/* Temperature Range with gradient */}
                <div className="weather-temp-container">
                  <span className="weather-temp-text">
                    {day.high}/{day.low}
                  </span>
                </div>
              </div>
              
              {/* Subtle divider with glow */}
              {index < sevenDayForecast.length - 1 && (
                <div className="weather-item-divider"></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Bottom accent line */}
        <div className="weather-bottom-accent">
          <div className="weather-bottom-line"></div>
        </div>
      </div>
    </div>
  );
};

export default RightbarWeather;
