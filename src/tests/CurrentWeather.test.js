import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrentWeather from '../components/CurrentWeather';
import { iconUrlFromCode } from '../utilities/fetchData';
import '@testing-library/jest-dom';

// Sample weather data to use for testing
const sampleWeatherData = {
  dt: 1633442430,
  icon: '04d',
  temp: 23,
  humidity: 60,
  feels_like: 24,
  speed: 1.54,
  name: 'Sample City',
  temp_max: 25,
  temp_min: 21,
  details: 'Partly cloudy',
};

// Mock the iconUrlFromCode function
jest.mock('../utilities/fetchData', () => ({
  iconUrlFromCode: jest.fn(),
}));

describe('CurrentWeather Component', () => {
  // Before each test, reset the mock function and render the component
  beforeEach(() => {
    iconUrlFromCode.mockReturnValue('sample-icon-url');
    render(<CurrentWeather weather={sampleWeatherData} />);
  });

  test('renders current weather information correctly', () => {
    // Assertions for various elements and data
    expect(screen.getByText('Sample City')).toBeInTheDocument();
    expect(screen.getByText('23°')).toBeInTheDocument();
    expect(screen.getByText('Feels like 24°. Partly cloudy.')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 60% | Wind: 1.54km/h | High: 25° | Low: 21°')).toBeInTheDocument();
  });

  test('displays the weather icon', () => {
    // Assertion for the weather icon
    const iconElement = screen.getByAltText('current-weather');
    expect(iconElement).toHaveAttribute('src', 'sample-icon-url');
  });

  test('displays the date and time', () => {
    // Assertion for the date and time
    expect(screen.getByText('1633442430')).toBeInTheDocument();
  });
});
