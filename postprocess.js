import { readJSON, writeJSON } from 'https://deno.land/x/flat/mod.ts';

const filename = Deno.args[0];
const json = await readJSON(filename);

let data = [];
let timeSeries = Object.values(json["Time Series (Daily)"]);
timeSeries = timeSeries[0];
for (let date in timeSeries) {
  let entry = timeSeries[date];
  data.push({
    time: date,
    open: entry["1. open"],
    high: entry["2. high"],
    low: entry["3. low"],
    close: entry["4. close"]
  });
}
data.sort((a, b) => new Date(a.time) - new Date(b.time));
data = data.map((item) => ({
  time: new Date(item.time).toISOString().split('T')[0],
  open: item.open,
  high: item.high,
  low: item.low,
  close: item.close,
}));

const newFile = `spy-postprocessed.json`;
await writeJSON(newFile, data);
console.log("Wrote post-process files");
