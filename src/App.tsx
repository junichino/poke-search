import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [name, setName] = useState<string>('pikachu');
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getPokemon = async () => {
    setLoading(true);
    setErr(false);
    try {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      let pokemonData = await res.json();
      setData(pokemonData);

    } catch (err) {
      setData([]);
      setErr(true);
    }
    setLoading(false);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    getPokemon();
  }

  console.log(name);

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-indigo-800">
      <div className="bg-white text-center rounded-3xl shadow-lg p-10 max-w-xs">
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='p-3 border-solid border-2 border-indigo-600 rounded-md' placeholder='Search by Name' />
          <button className='bg-indigo-600 px-2 mt-5 text-lg rounded text-gray-100'>Search</button>
        </form>


        {err ? (
          <p className='my-5 text-red-600'>Pokemon not found</p>
        ) : (
          <>
            {loading ? (
              <p className='my-5 text-gray-600'>Loading...</p>
            ) : (
              <>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} className='my-5 w-50 h-50 rounded-xk shadow-lg mx-auto' alt={`${name}-image`} />
                <h1 className='text-2xl font-bold text-indigo-600'>{data.name}</h1>
                <h3 className='text-lg text-gray-600'>{data.types.map((type: any) => type.type.name).join(', ')}</h3>
              </>
            )}
          </>
        )}


      </div>
    </div>
  )
}

export default App
