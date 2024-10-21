// /app/pokemon/[id]/abilities/[abilityId/page.js

async function getAbility(abilityId) {
    const res = await fetch(`https://pokeapi.co/api/v2/ability/${abilityId}`);
    if (!res.ok) {
        throw new Error('Failed to fetch ability data');
    }
    return res.json();
}

export default async function AbilityPage({ params }) {
    const ability = await getAbility(params.abilityId);

    return (
        <div>
            <h1>{ability.name}</h1>
            <p>{ability.effect_entries[0].effect}</p>

            <h2>Pokemony, które mają tę umiejętność:</h2>
            <ul>
                {ability.pokemon.map((poke) => (
                    <li key={poke.pokemon.name}>{poke.pokemon.name}</li>
                ))}
            </ul>
        </div>
    );
}