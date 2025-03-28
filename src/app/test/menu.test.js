import React from 'react';
import Menu from '../../Components/Menu';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import {
  fetchCategories,
  fetchMealsByCategory,
  fetchMealDetails,
} from '../../utlis/api';

// Mock the API functions
jest.mock('../../utlis/api', () => ({
  fetchCategories: jest.fn(() => Promise.resolve(['Beef', 'Chicken'])),
  fetchMealsByCategory: jest.fn(() => Promise.resolve([])),
  fetchMealDetails: jest.fn(() => Promise.resolve(null)),
}));

describe('Menu Component', () => {
  // Mock data
  const mockCategories = [
    { category: 'Beef', image: 'beef-image.jpg' },
    { category: 'Chicken', image: 'chicken-image.jpg' },
  ];

  const mockMeals = [
    { idMeal: '1', strMeal: 'Beef Meal 1', strMealThumb: 'beef1.jpg' },
    { idMeal: '2', strMeal: 'Beef Meal 2', strMealThumb: 'beef2.jpg' },
  ];

  const mockMealDetails = {
    idMeal: '1',
    strMeal: 'Detailed Beef Meal',
    strMealThumb: 'detailed-beef.jpg',
    strIngredient1: 'Beef',
    strMeasure1: '300g',
    strIngredient2: 'Salt',
    strMeasure2: '1 tsp',
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup mock implementations
    fetchCategories.mockResolvedValue(['Beef', 'Chicken', 'Goat']);
    fetchMealsByCategory.mockResolvedValue(mockMeals);
    fetchMealDetails.mockResolvedValue(mockMealDetails);
  });

  // Test 1: Renders without crashing
  it('renders without errors', async () => {
    render(<Menu />);
    await waitFor(() => {
      expect(screen.getByText('MENU')).toBeInTheDocument();
    });
  });

  // Test 2: Loads and displays categories
  it('loads and displays filtered categories', async () => {
    render(<Menu />);

    await waitFor(() => {
      // Check that excluded category (Goat) is not rendered
      expect(screen.queryByText('Goat')).not.toBeInTheDocument();

      // Check that included categories are rendered
      expect(screen.getByText('Beef')).toBeInTheDocument();
      expect(screen.getByText('Chicken')).toBeInTheDocument();
    });
  });

  // Test 3: Handles category click with proper async handling
  it('shows meals when a category is clicked', async () => {
    render(<Menu />);

    await waitFor(() => screen.getByText('Beef'));

    await act(async () => {
      fireEvent.click(screen.getByText('Beef'));
    });

    await waitFor(() => {
      expect(fetchMealsByCategory).toHaveBeenCalledWith('Beef');
      expect(screen.getByText('Beef Meals')).toBeInTheDocument();
    });
  });

  // Test 4 (updated): Shows meal details with proper async handling
  it('shows meal details when a meal is clicked', async () => {
    render(<Menu />);

    await waitFor(() => screen.getByText('Beef'));

    await act(async () => {
      fireEvent.click(screen.getByText('Beef'));
    });

    await waitFor(() => screen.getByText('Beef Meal 1'));

    await act(async () => {
      fireEvent.click(screen.getByText('Beef Meal 1'));
    });

    await waitFor(() => {
      expect(screen.getByText('Detailed Beef Meal')).toBeInTheDocument();
    });
  });

  // Test 5: Closes meal overlay when close button is clicked
  it('closes meal overlay when close button is clicked', async () => {
    render(<Menu />);

    // Open the overlay by clicking a category
    await waitFor(() => screen.getByText('Beef'));
    fireEvent.click(screen.getByText('Beef'));

    // Click the close button
    fireEvent.click(screen.getByText('❌'));

    // Check if overlay is closed
    expect(screen.queryByText('Beef Meals')).not.toBeInTheDocument();
  });

  // Test 6: Returns to meal list from details view with Back button
  it('returns to meal list from details view', async () => {
    render(<Menu />);

    // Navigate to meal details
    await waitFor(() => screen.getByText('Beef'));
    await act(async () => {
      fireEvent.click(screen.getByText('Beef'));
    });
    await waitFor(() => screen.getByText('Beef Meal 1'));
    await act(async () => {
      fireEvent.click(screen.getByText('Beef Meal 1'));
    });

    // Click the BACK button (targeting the test ID)
    await act(async () => {
      fireEvent.click(screen.getByTestId('back-to-meals-button'));
    });

    // Verify user back to meal list
    await waitFor(() => {
      expect(screen.getByText('Beef Meals')).toBeInTheDocument();
      expect(screen.queryByText('Detailed Beef Meal')).not.toBeInTheDocument();
    });
  });

  // Test 7: Never show more than 6 meals(based on mealsToShow max 6)
  it('never shows more than mealsToShow limit', async () => {
    // Create 10 mock meals (more than our limit)
    const manyMeals = Array.from({ length: 10 }, (_, i) => ({
      idMeal: `${i}`,
      strMeal: `Meal ${i}`,
      strMealThumb: `meal${i}.jpg`,
    }));
    fetchMealsByCategory.mockResolvedValueOnce(manyMeals);

    render(<Menu />);

    // Trigger meal loading
    await waitFor(() => screen.getByText('Beef'));
    await act(async () => {
      fireEvent.click(screen.getByText('Beef'));
    });

    // Verify rendering first
    await waitFor(() => {
      const mealElements = screen.queryAllByRole('listitem');
      // Key assertion - should never exceed limit
      expect(mealElements.length).toBeLessThanOrEqual(6);
    });
  });

  //Test 8: Check for empty meal data while loading
  it('handles empty meal data when loading category images', async () => {
    fetchCategories.mockResolvedValueOnce(['Beef', 'Chicken']);

    // Mock empty meal data for Chicken category
    fetchMealsByCategory.mockImplementation(async (category) => {
      return category === 'Chicken'
        ? []
        : [
            {
              strMealThumb: 'beef-image.jpg',
              strMeal: 'Beef Meal',
            },
          ];
    });

    render(<Menu />);

    await waitFor(() => {
      // Beef category should have an image
      const beefImage = screen.getByAltText('Beef');
      expect(beefImage).toHaveAttribute('src', 'beef-image.jpg');

      // Chicken category should have no src attribute (or empty string)
      const chickenImage = screen.getByAltText('Chicken');

      // Check for either null or empty string
      const srcValue = chickenImage.getAttribute('src');
      expect(srcValue === null || srcValue === '').toBeTruthy();
    });
  });
});
