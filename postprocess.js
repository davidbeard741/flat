import { readJSON, writeJSON, removeFile } from 'https://deno.land/x/flat@0.0.14/mod.ts' 

const filename = Deno.args[0];
const json = await readJSON(filename);
                     
let data = [];
let timeSeries = Object.values(json["Time Series (Daily)"]);
timeSeries = timeSeries["Time Series (Daily)"];
for (let date in timeSeries) {
  let entry = timeSeries[date];
  data.push({
    time: date,
    open: parseFloat(entry["1. open"]),
    high: parseFloat(entry["2. high"]),
    low: parseFloat(entry["3. low"]),
    close: parseFloat(entry["4. close"])
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

let processedSpyRates = data;
const newFile = `spy-postprocessed.json`;
await writeJSON(newFile, processedSpyRates);
console.log("Wrote post-process files");
