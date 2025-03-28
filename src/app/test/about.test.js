import { render, screen } from '@testing-library/react';
import AboutPage from '../about/page';

// Mock components
jest.mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />);
jest.mock('../../Components/Navbar', () => () => <nav>Navbar Mock</nav>);
jest.mock('../../Components/Footer', () => () => <footer>Footer Mock</footer>);

describe('AboutPage Component', () => {
  beforeEach(() => {
    render(<AboutPage />);
  });
  //Test 1: Basic Structure Verification
  it('renders essential components', () => {
    expect(screen.getByText('Navbar Mock')).toBeInTheDocument();
    expect(screen.getByText('Footer Mock')).toBeInTheDocument();
  });

  //Test 2: Hero Section Content
  it('displays the hero section content', () => {
    expect(
      screen.getByText(
        /Welcome to our restaurant! We offer a fantastic dining experience/i
      )
    ).toBeInTheDocument();
  });

  //Test 3: History Section
  it('shows the restaurant history section', () => {
    expect(
      screen.getByRole('heading', { name: 'Our history' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Our journey begins with a simple idea/i)
    ).toBeInTheDocument();
  });

  //Test 4: Contact Information
  it('displays contact information correctly', () => {
    expect(
      screen.getByRole('heading', { name: 'Contact us' })
    ).toBeInTheDocument();

    // Phone
    expect(screen.getByText(/07011223/i)).toBeInTheDocument();

    // Email
    expect(screen.getByText(/info@info.com/i)).toBeInTheDocument();

    // Social
    expect(screen.getByText(/@flavor.h/i)).toBeInTheDocument();
  });

  //Test 5: Restaurant "Restaurant Interior"Image
  it('renders the restaurant image', () => {
    const image = screen.getByAltText('Restaurant Interior');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/aboutres.jpg');
  });
});
