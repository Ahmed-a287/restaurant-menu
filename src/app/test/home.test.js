import { render, screen } from '@testing-library/react';
import Home from '../../Components/Home';
import '@testing-library/jest-dom';

describe('Home Component', () => {
  beforeEach(() => {
    render(<Home />);
  });

  // Test1: Component Structure
  it('has correct CSS classes applied', () => {
    const container = screen.getByTestId('home-container');
    expect(container).toHaveClass('container');
  });

  // Test2: Header content
  it('renders "Our Vision" heading ', () => {
    const heading = screen.getByRole('heading', {
      level: 2, //(h2)
      name: /our vision/i,
    });
    expect(heading).toBeInTheDocument();
  });

  // Test 3 : Paragraph content
  it('displays the vision paragraph with key phrases', () => {
    const paragraph = screen.getByText(/At Flavor Haven/i);
    expect(paragraph).toBeInTheDocument();

    // verify another part of the text
    expect(paragraph).toHaveTextContent('food is more than just a meal');
  });

  //Test 4: Hero Image
  it('renders the hero image with correct attributes', () => {
    const image = screen.getByAltText('Hero Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveStyle('width: 1200px');
    expect(image).toHaveStyle('height: auto');
  });
});
