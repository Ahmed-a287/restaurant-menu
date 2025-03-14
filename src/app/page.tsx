'use client'; // Able to use useEffect
import { useEffect, useState } from 'react';
import Menu from '../components/menu';

// Define types for the menu item
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    // Fetch menu items from the external API
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/random.php'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch menu');
        }
        const data: MenuItem[] = await response.json(); // Type the response
        setMenuItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error'); // Ensure the error is typed properly
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Menu menuItems={menuItems} />
    </div>
  );
}
