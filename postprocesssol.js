import { readJSON, writeJSON } from 'https://deno.land/x/flat/mod.ts';

const filename = Deno.args[0];
const data = await readJSON(filename);

const reformattedData = data.map(entry => ({
  time: Math.floor(entry[0][0] / 1000),  // Convert milliseconds to seconds
  open: entry[0][1],
  high: entry[0][2],
  low: entry[0][3],
  close: entry[0][4]
}));
reformattedData.sort((a, b) => a.time - b.time);

const newFile = 'sol-postprocessed.json';
await writeJSON(newFile, reformattedData);
console.log('Wrote post-processed file: ' + newFile);
