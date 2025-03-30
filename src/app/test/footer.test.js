import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../Components/Footer';

describe('Footer Component', () => {
  // Test 1: Renders without crashing
  it('renders without errors', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  // Test 2: Displays the correct copyright text with current year
  it('displays the correct copyright text', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      `© ${currentYear} Restaurant. All rights reserved.`
    );
    expect(copyrightText).toBeInTheDocument();
  });

  // Test 3: Has the correct CSS class
  it('has the correct CSS class', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveClass('footer');
  });
});
