const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/list.php?c=list`);
    const data = await response.json();
    return data.meals.map((cat) => cat.strCategory);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchMealsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error(`Error fetching meals for category ${category}:`, error);
    return [];
  }
};

export const fetchMealDetails = async (mealId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`);
    const data = await response.json();
    return data.meals[0] || null;
  } catch (error) {
    console.error(`Error fetching details for meal ${mealId}:`, error);
    return null;
  }
};
