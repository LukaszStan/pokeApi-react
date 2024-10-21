// /app/pokemon/[id]/page.js

import { use } from 'react';

async function getPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default function PokemonPage({ params }) {
    const pokemon = use(getPokemon(params.id));

    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>Stats</h2>
            <ul>
                {pokemon.stats.map((stat) => (
                    <li key={stat.stat.name}>
                        {stat.stat.name}: {stat.base_stat}
                    </li>
                ))}
            </ul>
        </div>
    );
}
