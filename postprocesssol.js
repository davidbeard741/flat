/*
https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=100&interval=daily&include_ohlc=true
*/


import { readJSON, writeJSON } from 'https://deno.land/x/flat/mod.ts';

const filename = Deno.args[0];
const json = await readJSON(filename);

const timeSeries = json["prices"];

const parsedData = timeSeries.map(dataPoint => {
  const [timestamp, open, high, low, close] = dataPoint;
  const date = new Date(timestamp);
  const formattedDate = date.toISOString().split('T')[0];

  return {
    time: formattedDate,
    open,
    high,
    low,
    close
  };
});

const jsonData = JSON.stringify(parsedData);
const newFile = 'sol-postprocessed.json';
await writeJSON(newFile, data);
console.log('Wrote post-processed file: ' + newFile);
