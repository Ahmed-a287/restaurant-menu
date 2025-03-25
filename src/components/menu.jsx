import { useState, useEffect } from 'react';
import styles from '../style/Menu.module.scss';

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

  const fetchMealsByCategory = async (category) => {
    setSelectedCategory(category);
    setMeals([]);
    setMealDetails(null);
    setShowMeals(true);

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const data = await response.json();
    setMeals(data.meals.slice(0, mealsToShow));

    // Debugging meals list
    console.log(`Meals fetched for category ${category}:`, data.meals);
  };

  const fetchMealDetails = async (mealId) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    setMealDetails(data.meals[0]);

    // Debugging meal details
    console.log('Meal details fetched:', data.meals[0]);
  };

  const closeMealOverlay = () => {
    setShowMeals(false);
    setSelectedCategory(null);
    setMealDetails(null);
  };

  // Log all `<li>` elements as lists
  useEffect(() => {
    if (categories.length > 0) {
      const categoryList = categories.map((category) => category.category);
      console.log('Category List:', categoryList);
    }
  }, [categories]);

  useEffect(() => {
    if (meals.length > 0) {
      const mealList = meals.map((meal) => meal.strMeal);
      console.log('Meal List:', mealList);
    } else {
      console.log('No meals available for this category');
    }
  }, [meals]);

  useEffect(() => {
    if (mealDetails) {
      const ingredientsList = [...Array(20)]
        .map((_, i) => {
          const ingredient = mealDetails[`strIngredient${i + 1}`];
          const measure = mealDetails[`strMeasure${i + 1}`];

          if (ingredient && measure) {
            return `${measure.trim()} ${ingredient.trim()}`;
          } else if (ingredient) {
            return ingredient.trim();
          }
          return null;
        })
        .filter((item) => item !== null);

      if (ingredientsList.length > 0) {
        console.log('Ingredients List:', ingredientsList);
      } else {
        console.log('No ingredients available for this meal');
      }
    }
  }, [mealDetails]);

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
              onClick={() => fetchMealsByCategory(category.category)}
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
            /* Show meal list if no meal is selected */
            <div className={styles.mealsSection}>
              <h2 className={styles.sectionTitle}>{selectedCategory} Meals</h2>
              <ul className={styles.mealsList}>
                {meals.map((meal, index) => (
                  <li
                    key={`${meal.idMeal}-${index}`}
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
