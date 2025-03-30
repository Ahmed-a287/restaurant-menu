import { useState, useEffect } from 'react';
import {
  fetchCategories,
  fetchMealsByCategory,
  fetchMealDetails,
} from '../utlis/api'; // API functions for fetching menu data
import styles from '../styles/menu.module.scss';

const Menu = () => {
  // State for storing fetched categories and their images
  const [categories, setCategories] = useState([]);

  // State for tracking user selections and UI state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [meals, setMeals] = useState([]);
  const [mealDetails, setMealDetails] = useState(null);
  const [showMeals, setShowMeals] = useState(false);

  // Maximum meals to display per category
  const mealsToShow = 6;
  const excludedCategories = [
    // Categories to filter out
    'Miscellaneous',
    'Goat',
    'Pork',
    'Starter',
    'Vegan',
  ];

  // Fetch and process categories when component mounts
  useEffect(() => {
    const loadCategories = async () => {
      // Fetch raw category list from API
      const fetchedCategories = await fetchCategories();

      // Filter out unwanted categories
      const filteredCategories = fetchedCategories.filter(
        (category) => !excludedCategories.includes(category)
      );

      // Enhance categories with representative images
      const categoriesWithImages = await Promise.all(
        filteredCategories.map(async (category) => {
          // Get sample meal for each category to use its image
          const mealData = await fetchMealsByCategory(category);
          const firstMeal = mealData[0] || null;
          return {
            category,
            image: firstMeal ? firstMeal.strMealThumb : '',
          };
        })
      );

      setCategories(categoriesWithImages);
    };

    loadCategories();
  }, []); // Empty dependency array = runs once on mount

  // Handle category selection - fetches meals for the category
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category); // Track selected category
    setMeals([]); // Clear previous meals
    setMealDetails(null); // Clear any open meal details
    setShowMeals(true); // Show the meals overlay

    // Fetch and limit meals for this category
    const fetchedMeals = await fetchMealsByCategory(category);
    setMeals(fetchedMeals.slice(0, mealsToShow));
  };

  // Handle meal selection - fetches detailed Meal info
  const handleMealClick = async (mealId) => {
    const fetchedMealDetails = await fetchMealDetails(mealId);
    setMealDetails(fetchedMealDetails);
  };

  // Close the meals overlay and reset related state
  const closeMealOverlay = () => {
    setShowMeals(false);
    setSelectedCategory(null);
    setMealDetails(null);
  };

  // Menu component render
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MENU</h1>

      {/* Categories list */}
      <ul className={styles.categoryList}>
        {categories.map((category, index) => (
          <div
            className={styles.mealContainer}
            key={`${category.category}-${index}`}
          >
            <li
              className={styles.categoryItem}
              onClick={() => handleCategoryClick(category.category)}
            >
              {/* Category image and name */}
              <img
                src={category.image}
                alt={category.category}
                className={styles.categoryImage}
              />
              <span>{category.category}</span>
            </li>
          </div>
        ))}
      </ul>

      {/* Meals overlay - appears when a category is selected */}
      {showMeals && (
        <div className={styles.overlay}>
          {/* Close button for the overlay */}
          <button className={styles.closeButton} onClick={closeMealOverlay}>
            ❌
          </button>

          {/* Conditional rendering: Meal details OR meals list */}
          {mealDetails ? (
            // Detailed meal view
            <div className={styles.mealDetails}>
              {/* Back button to return to meals list */}
              <button
                className={styles.backToMeals}
                onClick={() => setMealDetails(null)}
                data-testid="back-to-meals-button"
              >
                ↩
              </button>

              {/* Meal details content */}
              <h2 className={styles.mealTitle}>{mealDetails.strMeal}</h2>
              <img
                src={mealDetails.strMealThumb}
                alt={mealDetails.strMeal}
                className={styles.mealDetailImage}
              />
              <h4>Ingredients:</h4>
              <ul className={styles.ingredientsList}>
                {/* Render first 6 ingredients */}
                {[...Array(20)].map((_, i) => {
                  const ingredient = mealDetails[`strIngredient${i + 1}`];
                  const measure = mealDetails[`strMeasure${i + 1}`];

                  // Clean up ingredient/measurement strings
                  const cleanIngredient = ingredient
                    ?.replace(/^[0-9]*\.?\s*/g, '')
                    .trim();
                  const cleanMeasure = measure
                    ?.replace(/^[0-9]*\.?\s*/g, '')
                    .trim();

                  // Only render if ingredient exists and display less than 6
                  if (i < 6 && ingredient) {
                    return (
                      <li key={`${i}-${cleanIngredient}`}>
                        {cleanMeasure} {cleanIngredient}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          ) : (
            // Meals list view
            <div className={styles.mealsSection}>
              <h2 className={styles.sectionTitle}>{selectedCategory} Meals</h2>
              <ul className={styles.mealsList}>
                {meals.map((meal, index) => (
                  <li
                    key={`${meal.idMeal}-${index}`}
                    className={styles.mealItem}
                    onClick={() => handleMealClick(meal.idMeal)}
                  >
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className={styles.mealImage}
                    />
                    <span>{meal.strMeal}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
