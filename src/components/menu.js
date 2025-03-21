import { useState, useEffect } from 'react';
import styles from '../style/Menu.module.scss';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [meals, setMeals] = useState([]);
  const [mealDetails, setMealDetails] = useState(null);
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [showMeals, setShowMeals] = useState(false);

  const mealsToShow = 6;
  const excludedCategories = [
    'Miscellaneous',
    'Goat',
    'Pork',
    'Starter',
    'Vegan',
  ];

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => {
        const filteredCategories = data.meals
          .map((cat) => cat.strCategory)
          .filter((category) => !excludedCategories.includes(category));

        const categoriesWithImages = Promise.all(
          filteredCategories.map(async (category) => {
            const response = await fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );
            const data = await response.json();
            const firstMeal = data.meals ? data.meals[0] : null;
            return { category, image: firstMeal ? firstMeal.strMealThumb : '' };
          })
        );

        categoriesWithImages.then((result) => setCategories(result));
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // Fetch meals for selected category
  const fetchMealsByCategory = async (category) => {
    setSelectedCategory(category);
    setMeals([]);
    setMealDetails(null); // Reset meal details when opening a category
    setShowMeals(true);

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const data = await response.json();
    setMeals(data.meals.slice(0, mealsToShow));
  };

  // Fetch detailed meal information
  const fetchMealDetails = async (mealId) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    setMealDetails(data.meals[0]); // Store meal details
  };

  // Close overlay
  const closeMealOverlay = () => {
    setShowMeals(false);
    setSelectedCategory(null);
    setMealDetails(null);
  };

  return (
    <div className={styles.container}>
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

      {/* Overlay */}
      {showMeals && (
        <div className={styles.overlay}>
          <button className={styles.closeButton} onClick={closeMealOverlay}>
            ❌
          </button>

          {/* Show meal details if a meal is selected */}
          {mealDetails ? (
            <div className={styles.mealDetails}>
              <h2 className={styles.mealTitle}>{mealDetails.strMeal}</h2>
              <img
                src={mealDetails.strMealThumb}
                alt={mealDetails.strMeal}
                className={styles.mealDetailImage}
              />

              <h4>Ingredients:</h4>
              <ul className={styles.ingredientsList}>
                {[...Array(20)].map((_, i) => {
                  const ingredient = mealDetails[`strIngredient${i + 1}`];
                  const measure = mealDetails[`strMeasure${i + 1}`];
                  return ingredient ? (
                    <li key={i}>
                      {measure} {ingredient}
                    </li>
                  ) : null;
                })}
              </ul>

              <button
                className={styles.showAllButton}
                onClick={() => setMealDetails(null)}
              >
                Back to Meals
              </button>
            </div>
          ) : (
            /* Show meal list if no meal is selected */
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
        </div>
      )}
    </div>
  );
};

export default Menu;
