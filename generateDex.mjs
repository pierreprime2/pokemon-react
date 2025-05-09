import { writeFile } from 'fs/promises';
import { fetchJSON, getMoveDetails } from './pokeapi.js' 

const OUTPUT_PATH = 'src/data/dex.json';
const LIMIT = 151;

const getEvolutionData = async (speciesUrl, name) => {
  const species = await fetchJSON(speciesUrl);
  const englishName = species.names.find(n => n.language.name === 'en')?.name || name;
  const evolutionUrl = species.evolution_chain.url;
  const chain = (await fetchJSON(evolutionUrl)).chain;

  let relation = 'none', count = 0;

  const traverse = (node, depth = 0) => {
    if (node.species.name === name) {
      if (node.evolves_to?.length) {
        relation = 'to';
        count = node.evolves_to.length;
      }
      return true;
    }
    for (const child of node.evolves_to || []) {
      if (traverse(child)) {
        relation = 'from';
        count = 1;
        return true;
      }
    }
    return false;
  };

  traverse(chain);
  return { englishName, relation, count };
};

const buildDex = async () => {
  const dex = [];

  for (let i = 1; i <= LIMIT; i++) {
    console.log(`Fetching Pokémon #${i}...`);
    const data = await fetchJSON(`/pokemon/${i}`)
    const name = data.name;
    const types = data.types.map(t => t.type.name);
    
    const gen1MovesName = data.moves
      .filter(m => m.version_group_details.some(vgd => vgd.version_group.name === 'red-blue'))
      .map(m => m.move.name);
    
    const gen1_moves = [];
    for(const moveName of gen1MovesName) {
        const { type, machine } = await getMoveDetails(moveName)
        gen1_moves.push({ name: moveName, type, machine })
    }

    const { englishName, relation, count } = await getEvolutionData(data.species.url, name);

    dex.push({
      name,
      english_name: englishName,
      type1: types[0],
      type2: types[1] || null,
      gen1_moves,
      evolution_relation: relation,
      evolution_count: count
    });
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(dex, null, 2));
  console.log(`✅ Wrote ${dex.length} Pokémon to ${OUTPUT_PATH}`);
};

buildDex().catch(console.error);
