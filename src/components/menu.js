import { useState, useEffect } from 'react';
import styles from '../style/Menu.module.scss'; // Adjust the path if needed

const Menu = () => {
  const [categories, setCategories] = useState([]); // Stores categories with images
  const [selectedCategory, setSelectedCategory] = useState(null); // The chosen category
  const [meals, setMeals] = useState([]); // Meals for the selected category
  const [mealDetails, setMealDetails] = useState(null); // Detailed info for a clicked meal
  const [showAllIngredients, setShowAllIngredients] = useState(false); // Controls ingredients display

  const mealsToShow = 6; // Number of meals to display per category
  const excludedCategories = [
    'Miscellaneous',
    'Goat',
    'Pork',
    'Starter',
    'Vegan',
  ];

  useEffect(() => {
    // Fetch all categories
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => {
        const filteredCategories = data.meals
          .map((cat) => cat.strCategory)
          .filter((category) => !excludedCategories.includes(category));

        // For each category, fetch the first meal for its image
        const categoriesWithImages = Promise.all(
          filteredCategories.map(async (category) => {
            const response = await fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );
            const data = await response.json();
            const firstMeal = data.meals ? data.meals[0] : null;
            return {
              category,
              image: firstMeal ? firstMeal.strMealThumb : '',
            };
          })
        );
        categoriesWithImages.then((result) => setCategories(result));
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // Fetch meals for a selected category
  const fetchMealsByCategory = async (category) => {
    setSelectedCategory(category);
    setMeals([]);
    setMealDetails(null);
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const data = await response.json();
    setMeals(data.meals.slice(0, mealsToShow));
  };

  // Fetch details for a specific meal and reset ingredients view
  const fetchMealDetails = async (mealId) => {
    setShowAllIngredients(false); // Reset "Show All Ingredients" state for each new meal
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    setMealDetails(data.meals[0]);
  };

  // Handler for showing all ingredients
  const handleShowAllIngredients = () => {
    setShowAllIngredients(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Flavor Haven</h1>
      <h3 className={styles.subTitle}>
        A welcoming place where every dish is a treat
      </h3>

      {/* Category List */}
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li
            key={category.category}
            className={styles.categoryItem}
            onClick={() => fetchMealsByCategory(category.category)}
          >
            <img
              src={category.image}
              alt={category.category}
              className={styles.categoryImage}
            />
            <span>{category.category}</span>
          </li>
        ))}
      </ul>

      {/* Meals Section */}
      {selectedCategory && (
        <div className={styles.mealsSection}>
          <h2 className={styles.sectionTitle}>{selectedCategory} Meals</h2>
          <ul className={styles.mealsList}>
            {meals.map((meal) => (
              <li
                key={meal.idMeal}
                className={styles.mealItem}
                onClick={() => fetchMealDetails(meal.idMeal)}
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

      {/* Meal Details Section */}
      {mealDetails && (
        <div className={styles.mealDetails}>
          <h2 className={styles.mealTitle}>{mealDetails.strMeal}</h2>
          <img
            src={mealDetails.strMealThumb}
            alt={mealDetails.strMeal}
            className={styles.mealDetailImage}
          />
          <h3 className={styles.ingredientsTitle}>Ingredients:</h3>
          <ul className={styles.ingredientsList}>
            {Object.keys(mealDetails)
              .filter(
                (key) => key.startsWith('strIngredient') && mealDetails[key]
              )
              .map((ingredientKey, index) => {
                if (index < 5 || showAllIngredients) {
                  return (
                    <li key={ingredientKey} className={styles.ingredientItem}>
                      {mealDetails[ingredientKey].split(' - ')[0]}
                    </li>
                  );
                }
                return null;
              })}
          </ul>
          {!showAllIngredients && (
            <button
              onClick={handleShowAllIngredients}
              className={styles.showAllButton}
            >
              Show All Ingredients
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
