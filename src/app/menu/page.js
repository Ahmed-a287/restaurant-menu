'use client';
import { useEffect, useState } from 'react';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/random.php'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch menu');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Just for debugging
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <Menu />
      <Footer />
    </div>
  );
}
