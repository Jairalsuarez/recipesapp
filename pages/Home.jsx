import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home({ searchQuery = '' }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // Si no hay búsqueda, mostramos recetas por defecto (ej. pechuga de pollo)
    const url = searchQuery 
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      : `https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`;

    fetch(url)
      .then(res => res.json())
      .then(data => setMeals(data.meals || []));
  }, [searchQuery]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {meals.map(meal => (
        <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">{meal.strMeal}</h3>
            <span className="text-sm text-amber-600 font-medium">{meal.strArea} • {meal.strCategory}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}