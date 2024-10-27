// /app/pokemon/[id]/abilities/[abilityId/page.js

async function getPokemon(pokemonId) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!res.ok) {
        throw new Error('Failed to fetch Pokemon data');
    }
    return res.json();
}

async function getAbilityDetails(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch ability data');
    }
    return res.json();
}

export default async function AbilityPage({ params }) {
    const { id: pokemonId, abilityId } = params;

    const pokemon = await getPokemon(pokemonId);

    const abilityInfo = pokemon.abilities[parseInt(abilityId) - 1];
    if (!abilityInfo) {
        return (
            <div>
                <h1>{pokemon.name}</h1>
                <p>Pokemon nie posiada umiejętności o indeksie {abilityId}.</p>
            </div>
        );
    }

    const abilityDetails = await getAbilityDetails(abilityInfo.ability.url);

    const effectEntry = abilityDetails.effect_entries.find((entry) => entry.language.name === 'en');
    const flavorText = abilityDetails.flavor_text_entries.find((entry) => entry.language.name === 'en');

    return (
        <div>
            <h1>Umiejętność: {abilityDetails.name} dla {pokemon.name}</h1>
            {effectEntry && (
                <p>
                    <strong>Efekt:</strong> {effectEntry.effect}
                </p>
            )}
            {flavorText && (
                <p>
                    <strong>Opis:</strong> {flavorText.flavor_text}
                </p>
            )}
        </div>
    );
}