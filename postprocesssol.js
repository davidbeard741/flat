/*
https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=100&interval=daily&include_ohlc=true
*/

import { readJSON, writeJSON } from 'https://deno.land/x/flat/mod.ts';

const filename = Deno.args[0];
const data = await readJSON(filename);

const reformattedData = data.map(entry => ({
  time: entry[0],
  open: entry[1],
  high: entry[2],
  low: entry[3],
  close: entry[4]
}));

reformattedData.sort((a, b) => b.time - a.time);

const newFile = 'sol-postprocessed.json';
await writeJSON(newFile, reformattedData);
console.log('Wrote post-processed file: ' + newFile);