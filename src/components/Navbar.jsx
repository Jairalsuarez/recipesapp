import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?query=${search}`);
      setSearch(''); // Limpia el input después de buscar
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-amber-600 flex items-center gap-2">
          🍽️ EleganceMeals
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-amber-600 font-medium transition-colors">Inicio</Link>
          <Link to="/countries" className="hover:text-amber-600 font-medium transition-colors">Países</Link>
        </div>

        <form onSubmit={handleSearch} className="flex w-full md:w-auto shadow-sm rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Buscar receta (ej. Chicken)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-5 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:bg-white border border-transparent focus:border-amber-300 transition-all"
          />
          <button 
            type="submit"
            className="bg-amber-600 text-white px-6 py-2 hover:bg-amber-700 transition-colors font-medium"
          >
            Buscar
          </button>
        </form>
      </div>
    </nav>
  );
}