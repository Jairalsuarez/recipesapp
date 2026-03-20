import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?query=${search}`);
      setSearch(''); 
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-amber-600 flex items-center gap-2">
          <div className="flex items-center justify-center mb-4">
            <span className="text-6xl font-extralight text-slate-800 tracking-wide flex items-baseline">
              
              <span className="text-orange-600 font-black text-5xl tracking-tighter">gust</span>
              <span className="text-green-600 font-bold text-5xl">UM</span>
              <span className="h-2 w-2 rounded-full bg-green-600 ml-1"></span>
            </span>
          </div>
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-amber-600 font-medium transition-colors text-xl">Inicio</Link>
          <Link to="/countries" className="hover:text-amber-600 font-medium transition-colors text-xl">Países</Link>
        </div>

        <form onSubmit={handleSearch} className="flex w-full md:w-auto shadow-sm rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Buscar receta (ej. Chicken)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-5 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:bg-white border border-transparent  transition-all"
          />
          <button 
            type="submit"
            className="bg-amber-600 text-white px-6 py-2 hover:bg-amber-700 transition-colors font-medium cursor-pointer"
          >
            Buscar
          </button>
        </form>
      </div>
    </nav>
  );
}