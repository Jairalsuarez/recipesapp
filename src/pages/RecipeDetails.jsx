import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data.meals ? data.meals[0] : null));
  }, [id]);

  if (!recipe) return <div className="text-center text-2xl mt-10 animate-pulse text-amber-600">Cargando receta...</div>;

  // Extractor dinámico de ingredientes de la API
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`] && recipe[`strIngredient${i}`].trim() !== '') {
      ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-[400px] object-cover" />
      <div className="p-8 md:p-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.strMeal}</h1>
        
        <div className="flex flex-wrap gap-4 mb-8 text-sm uppercase tracking-widest text-amber-700 font-semibold">
          <span className="bg-amber-100 px-4 py-2 rounded-full">📍 {recipe.strArea}</span>
          <span className="bg-amber-100 px-4 py-2 rounded-full">🍽️ {recipe.strCategory}</span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1 bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Ingredientes</h3>
            <ul className="space-y-3">
              {ingredients.map((ing, index) => (
                <li key={index} className="text-gray-700 flex items-start gap-2 leading-tight">
                  <span className="text-amber-500 mt-1">•</span> {ing}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Instrucciones</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {recipe.strInstructions}
            </p>
            {recipe.strYoutube && (
              <div className="mt-8">
                <a 
                  href={recipe.strYoutube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors shadow-md"
                >
                  ▶️ Ver Video en YouTube
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}