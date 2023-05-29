import { readJSON, writeJSON } from 'https://deno.land/x/flat/mod.ts';

const filename = Deno.args[0];
const data = await readJSON(filename);
data.sort((a, b) => a.entry[0] - b.entry[0]);

const reformattedData = data.map(entry => ({
  time: Math.floor(entry[0] / 1000),  // Convert milliseconds to seconds
  open: entry[1],
  high: entry[2],
  low: entry[3],
  close: entry[4]
}));
// reformattedData.sort((a, b) => a.time - b.time);

const newFile = 'sol-postprocessed.json';
await writeJSON(newFile, reformattedData);
console.log('Wrote post-processed file: ' + newFile);
