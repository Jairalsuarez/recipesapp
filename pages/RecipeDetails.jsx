import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data.meals[0]));
  }, [id]);

  if (!recipe) return <div className="text-center text-2xl mt-10">Cargando delicias...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-96 object-cover" />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.strMeal}</h1>
        <div className="flex gap-4 mb-8 text-sm uppercase tracking-widest text-gray-500">
          <span>📍 {recipe.strArea}</span>
          <span>🍽️ {recipe.strCategory}</span>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Ingredientes</h3>
            {/* Aquí el Alumno 3 debe hacer un loop de recipe.strIngredient1, 2, 3... */}
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Instrucciones</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{recipe.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}