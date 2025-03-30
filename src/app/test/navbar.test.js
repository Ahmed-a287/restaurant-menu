import { render, screen, fireEvent, act } from '@testing-library/react';
import Navbar from '../../Components/Navbar';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

// Improved Image mock that handles priority prop
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, ...props }) => <img {...props} />, // Filters out priority
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    useRouter.mockImplementation(() => ({ pathname: '/' }));
    render(<Navbar />);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('Static Elements', () => {
    // Test 1: Checkening for diffrent Navbar items
    it('renders logo, title and subtitle', () => {
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
      expect(screen.getByText('Flavor Haven')).toBeInTheDocument();
      expect(screen.getByText(/welcoming place/i)).toBeInTheDocument();
    });
  });

  describe('Burger menu overly', () => {
    // Test 2: Testing if menu overly oppening after click
    it('opens menu when burger is clicked', () => {
      const burger = screen.getByRole('button', { name: /menu/i });
      fireEvent.click(burger);

      // Use more specific selector for the overlay
      const overlay = screen.getByTestId('menu-overlay');
      expect(overlay).toHaveClass('showOverlay');
    });

    //Test 3: Burger menu overlay
    it('closes menu automatically after 5 seconds', () => {
      const burger = screen.getByRole('button', { name: /menu/i });
      fireEvent.click(burger);

      const overlay = screen.getByTestId('menu-overlay');
      expect(overlay).toHaveClass('showOverlay');

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(overlay).not.toHaveClass('showOverlay');
    });
  });
});
