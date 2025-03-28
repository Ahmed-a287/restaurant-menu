import { useState, useEffect } from 'react';
import {
  fetchCategories,
  fetchMealsByCategory,
  fetchMealDetails,
} from '../utlis/api'; // import from the new API file
import styles from '../styles/menu.module.scss';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [meals, setMeals] = useState([]);
  const [mealDetails, setMealDetails] = useState(null);
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
    // Fetch categories from the API
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      const filteredCategories = fetchedCategories.filter(
        (category) => !excludedCategories.includes(category)
      );

      const categoriesWithImages = await Promise.all(
        filteredCategories.map(async (category) => {
          const mealData = await fetchMealsByCategory(category);
          const firstMeal = mealData[0] || null;
          return { category, image: firstMeal ? firstMeal.strMealThumb : '' };
        })
      );

      setCategories(categoriesWithImages);
    };

    loadCategories();
  }, []);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setMeals([]);
    setMealDetails(null);
    setShowMeals(true);

    const fetchedMeals = await fetchMealsByCategory(category);
    setMeals(fetchedMeals.slice(0, mealsToShow));
  };

  const handleMealClick = async (mealId) => {
    const fetchedMealDetails = await fetchMealDetails(mealId);
    setMealDetails(fetchedMealDetails);
  };

  const closeMealOverlay = () => {
    setShowMeals(false);
    setSelectedCategory(null);
    setMealDetails(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MENU</h1>
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

      {/* Overlay */}
      {showMeals && (
        <div className={styles.overlay}>
          <button className={styles.closeButton} onClick={closeMealOverlay}>
            ❌
          </button>

          {/* Show meal details if a meal is selected */}
          {mealDetails ? (
            <div className={styles.mealDetails}>
              <button
                className={styles.backToMeals}
                onClick={() => setMealDetails(null)}
              >
                ❌
              </button>
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

                  const cleanIngredient = ingredient
                    ?.replace(/^[0-9]*\.?\s*/g, '')
                    .trim();
                  const cleanMeasure = measure
                    ?.replace(/^[0-9]*\.?\s*/g, '')
                    .trim();

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
