// /app/pokemon-list/page.js
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

async function fetchPokemonList() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    if (!res.ok) {
        throw new Error('Failed to fetch Pokemon list');
    }
    const data = await res.json();
    return data.results;
}

async function filterPokemonByType(type) {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    if (!res.ok) {
        throw new Error('Failed to fetch Pokemons by type');
    }
    const data = await res.json();
    return data.pokemon.map((p) => p.pokemon);
}

export default function PokemonListPage() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const sort = searchParams.get('sort');
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                let pokemons = await fetchPokemonList();

                if (type) {
                    const filteredPokemons = await filterPokemonByType(type);
                    pokemons = pokemons.filter((pokemon) =>
                        filteredPokemons.some((fp) => fp.name === pokemon.name)
                    );
                }

                if (sort === 'name') {
                    pokemons.sort((a, b) => a.name.localeCompare(b.name));
                } else if (sort === 'id') {
                    pokemons.sort((a, b) => {
                        const idA = parseInt(a.url.split('/').slice(-2, -1)[0]);
                        const idB = parseInt(b.url.split('/').slice(-2, -1)[0]);
                        return idA - idB;
                    });
                }

                setFilteredPokemonList(pokemons);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [type, sort]);

    return (
        <div>
            <h1>Lista Pokemonów</h1>
            <ul>
                {filteredPokemonList.map((pokemon) => (
                    <li key={pokemon.name}>{pokemon.name}</li>
                ))}
            </ul>
        </div>
    );
}
