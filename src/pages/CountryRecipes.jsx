import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CountryRecipes() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('Mexican');
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then(res => res.json())
      .then(data => setAreas(data.meals || []));
  }, []);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`)
      .then(res => res.json())
      .then(data => setMeals(data.meals || []));
  }, [selectedArea]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Explorar por Países</h2>
      
      <div className="flex flex-wrap gap-3 mb-12 justify-center max-w-5xl mx-auto">
        {areas.map(area => (
          <button 
            key={area.strArea}
            onClick={() => setSelectedArea(area.strArea)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedArea === area.strArea 
              ? 'bg-amber-600 text-white shadow-md transform scale-105' 
              : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-600 border border-gray-200'
            }`}
          >
            {area.strArea}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {meals.map(meal => (
          <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 truncate mb-1">{meal.strMeal}</h3>
              <span className="text-sm text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-md">{selectedArea}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}