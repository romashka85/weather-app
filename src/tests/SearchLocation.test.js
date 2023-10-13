import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchLocation from '../components/SearchLocation';
import '@testing-library/jest-dom';

describe('SearchLocation Component', () => {
  // Test 1: Render input fields and buttons
  test('renders input fields and buttons', () => {
    // Render the component with mock functions for units and city search
    render(<SearchLocation units="metric" setUnits={() => {}} searchCity={() => {}}/>);

    // Assert that the input fields and buttons are rendered
    const cityInput = screen.getByPlaceholderText('Search for city...');
    const searchButton = screen.getByText('Search');
    const celsiusButton = screen.getByText('°C');
    const fahrenheitButton = screen.getByText('°F');

    expect(cityInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(celsiusButton).toBeInTheDocument();
    expect(fahrenheitButton).toBeInTheDocument();
  });

  // Test 2: Handle input change
  test('handles input change', () => {
    // Render the component with mock functions for units and city search
    render(<SearchLocation units="metric" setUnits={() => {}} searchCity={() => {}} />);

    // Get the city input element and simulate changing the value
    const cityInput = screen.getByPlaceholderText('Search for city...');
    fireEvent.change(cityInput, { target: { value: 'New York' } });

    // Assert that the input value is updated correctly
    expect(cityInput).toHaveValue('New York');
  });  

  // Test 3: Handle form submission
  test('handles form submission', () => {
    // Mock the searchCity function
    const searchCity = jest.fn();

    // Render the component with the mocked searchCity function
    render(<SearchLocation units="metric" setUnits={() => {}} searchCity={searchCity} />);

    // Get the city input and search button
    const cityInput = screen.getByPlaceholderText('Search for city...');
    const searchButton = screen.getByText('Search');

    // Change the input value and simulate form submission
    fireEvent.change(cityInput, { target: { value: 'New York' } });
    fireEvent.click(searchButton);

    // Assert that searchCity is called with the correct city name
    expect(searchCity).toHaveBeenCalledWith('New York');

    // Assert that the input is cleared
    expect(cityInput).toHaveValue('');
  });
});
