import { NextRequest, NextResponse } from 'next/server';

// Weather condition mapping based on Open-Meteo weather codes
const weatherConditions: { [key: number]: string } = {
  0: 'Clear',
  1: 'Mainly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing Rime Fog',
  51: 'Light Drizzle',
  53: 'Moderate Drizzle',
  55: 'Dense Drizzle',
  56: 'Light Freezing Drizzle',
  57: 'Dense Freezing Drizzle',
  61: 'Slight Rain',
  63: 'Moderate Rain',
  65: 'Heavy Rain',
  66: 'Light Freezing Rain',
  67: 'Heavy Freezing Rain',
  71: 'Slight Snow',
  73: 'Moderate Snow',
  75: 'Heavy Snow',
  77: 'Snow Grains',
  80: 'Slight Rain Showers',
  81: 'Moderate Rain Showers',
  82: 'Violent Rain Showers',
  85: 'Slight Snow Showers',
  86: 'Heavy Snow Showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with Slight Hail',
  99: 'Thunderstorm with Heavy Hail',
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat') || '41.0082';
    const lon = searchParams.get('lon') || '28.9784';

    // Fetch current weather
    const currentWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`;
    
    // Fetch 5-day forecast
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    // Extract current weather
    const current = {
      tempC: Math.round(currentData.current.temperature_2m),
      condition: weatherConditions[currentData.current.weather_code] || 'Unknown',
      windKph: Math.round(currentData.current.wind_speed_10m * 3.6) // Convert m/s to km/h
    };

    // Extract forecast data
    const forecast = forecastData.daily.time.slice(0, 5).map((date: string, index: number) => ({
      date,
      minC: Math.round(forecastData.daily.temperature_2m_min[index]),
      maxC: Math.round(forecastData.daily.temperature_2m_max[index]),
      condition: weatherConditions[forecastData.daily.weather_code[index]] || 'Unknown'
    }));

    const response = {
      location: {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        timezone: currentData.timezone
      },
      current,
      forecast
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
