import { readJSON, writeJSON, removeFile } from 'https://deno.land/x/flat@0.0.10/mod.ts'

const filename = Deno.args[0]
let json = await readJSON(filename)
console.log(json)

const spyRates = JSON.parse(await Deno.readTextFile("./spy-hist.json"));
const qqqRates = JSON.parse(await Deno.readTextFile("./qqq-hist.json"));
const solRates = JSON.parse(await Deno.readTextFile("./sol-hist.json"));

// Function to process the data
function processData(data) {
    data = data["Time Series (Daily)"];
    let processedData = [];
    for (let date in data) {
      let entry = data[date];
      processedData.push({
        time: date,
        open: parseFloat(entry["1. open"]),
        high: parseFloat(entry["2. high"]),
        low: parseFloat(entry["3. low"]),
        close: parseFloat(entry["4. close"])
      });
    }
    processedData.sort((a, b) => new Date(a.time) - new Date(b.time));
    return processedData.map((item) => ({
      time: new Date(item.time).toISOString().split('T')[0],
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));
}

// Process the data
spyRates = processData(spyRates);
qqqRates = processData(qqqRates);
solRates = processData(solRates);

const newspyFilename = `spy-hist-postprocessed.json`
const newqqqFilename = `qqq-hist-postprocessed.json`
const newsolFilename = `sol-hist-postprocessed.json`

await writeJSON(newspyFilename, spyRates)
await writeJSON(newqqqFilename, qqqRates)
await writeJSON(newsolFilename, solRates)

console.log("Wrote post process files")

await removeFile('./spy-hist.json')
await removeFile('./qqq-hist.json')
await removeFile('./sol-hist.json')
console.log("Removed OG files")
