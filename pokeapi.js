import fetch from 'node-fetch'

const BASE_URL = process.env.POKEAPI_BASE || 'https://pokeapi.co/api/v2'
const moveCache = {}

export const fetchJSON = async (url) => {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}/${url.replace(/^\//, '')}`;
  const res = await fetch(fullUrl);
  if (!res.ok) throw new Error(`❌ Failed to fetch ${fullUrl}`);
  return res.json();
};

export const getMoveDetails = async (name) => {
  if (moveCache[name]) return moveCache[name];

  const data = await fetchJSON(`/move/${name}`);
  const type = data.type.name;

  let machine = null;
  const machineEntry = data.machines.find(m => m.version_group.name === 'red-blue');
  if (machineEntry) {
    const machineData = await fetchJSON(machineEntry.machine.url);
    machine = machineData.item.name; // e.g., "tm01"
  }

  const result = { type, machine };
  moveCache[name] = result;
  return result;
};