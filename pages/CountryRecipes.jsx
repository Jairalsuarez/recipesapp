import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CountryRecipes() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('Mexican');
  const [meals, setMeals] = useState([]);

  // Cargar lista de países
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then(res => res.json())
      .then(data => setAreas(data.meals));
  }, []);

  // Cargar comidas del país seleccionado
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`)
      .then(res => res.json())
      .then(data => setMeals(data.meals));
  }, [selectedArea]);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {areas.map(area => (
          <button 
            key={area.strArea}
            onClick={() => setSelectedArea(area.strArea)}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${selectedArea === area.strArea ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            {area.strArea}
          </button>
        ))}
      </div>
      {/* El Alumno 4 puede reutilizar el diseño de cuadrícula del Alumno 2 aquí para mostrar los "meals" */}
    </div>
  );
}