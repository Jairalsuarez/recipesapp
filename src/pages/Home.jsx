import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    // Si hay una búsqueda busca ese término, si no, busca "chicken" por defecto
    const url = query 
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      : `https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`;

    fetch(url)
      .then(res => res.json())
      .then(data => setMeals(data.meals || []));
  }, [query]);

  return (
    <div>
      {query && <h2 className="text-2xl font-bold mb-6 text-gray-700">Resultados para: "{query}"</h2>}
      
      {meals.length === 0 ? (
        <p className="text-center text-xl mt-10 text-gray-500">No se encontraron recetas. ¡Intenta con otro ingrediente!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {meals.map(meal => (
            <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 truncate mb-1">{meal.strMeal}</h3>
                <span className="text-sm text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-md">{meal.strArea} • {meal.strCategory}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}