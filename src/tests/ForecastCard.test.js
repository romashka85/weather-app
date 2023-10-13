import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ForecastCard from '../components/ForecastCard';
import { iconUrlFromCode } from '../utilities/fetchData';
import '@testing-library/jest-dom'; // Import jest-dom for toBeInTheDocument

// Mock the iconUrlFromCode function
jest.mock('../utilities/fetchData', () => ({
  iconUrlFromCode: jest.fn(),
}));

describe('ForecastCard Component', () => {
  beforeEach(() => {
    // Reset the mock function before each test
    iconUrlFromCode.mockClear();
  });

  test('renders correctly for daily forecast', () => {
    // Define a sample item for daily forecast
    const item = {
      title: 'Tuesday, 10 Oct 2023 03:00 AM',
      icon: '03n',
      temp: 28,
      dtText: 'timestamp',
      desc: 'scattered clouds',
      hour: '03:00 AM',
    };

    // Mock the iconUrlFromCode function to return a known URL
    iconUrlFromCode.mockReturnValue('sample-icon-url');

    // Render the ForecastCard for daily forecast
    render(<ForecastCard item={item} name="daily" setHourlyForecast={() => {}} />);

    // Assertions
    expect(screen.getByText('Tuesday, 10 Oct 2023 03:00 AM')).toBeInTheDocument();
    expect(screen.getByAltText('daily-weather')).toHaveAttribute('src', 'sample-icon-url');
    expect(screen.getByText('28° scattered clouds')).toBeInTheDocument();  
  });

  test('renders "Check Hourly" button for hourly forecast', () => {
    // Define a sample item for hourly forecast
    const item = {
      title: 'Tuesday, 10 Oct 2023 03:00 AM',
      icon: '03n',
      temp: 287.61,
      dtText: 'timestamp',
      desc: 'scattered clouds',
      hour: '03:00 AM',
    };

    // Mock the iconUrlFromCode function to return a known URL
    iconUrlFromCode.mockReturnValue('sample-icon-url');

    // Render the ForecastCard for hourly forecast
    render(<ForecastCard item={item} name="hourly" setHourlyForecast={() => {}} />);

    // Assertions
    expect(screen.getByRole('button', { name: 'Check Hourly' })).toBeInTheDocument();
  });

  test('Clicking "Check Hourly" button calls setHourlyForecast function', () => {
    // Define a sample item for hourly forecast
    const item = {
      title: 'Tuesday, 10 Oct 2023 03:00 AM',
      icon: '03n',
      temp: 287.61,
      dtText: 'timestamp',
      desc: 'scattered clouds',
      hour: '03:00 AM',
    };

    const setHourlyForecast = jest.fn();

    // Mock the iconUrlFromCode function to return a known URL
    iconUrlFromCode.mockReturnValue('sample-icon-url');

    // Render the ForecastCard for hourly forecast
    render(<ForecastCard item={item} name="hourly" setHourlyForecast={setHourlyForecast} />);

    // Click the "Check Hourly" button
    fireEvent.click(screen.getByRole('button', { name: 'Check Hourly' }));

    // Assert that the setHourlyForecast function was called
    expect(setHourlyForecast).toHaveBeenCalledWith('timestamp');
  });
});