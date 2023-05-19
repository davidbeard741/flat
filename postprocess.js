// This can be a typescript file as well

// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
import { readJSON, writeJSON, removeFile } from 'https://deno.land/x/flat@0.0.14/mod.ts' 

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0] // Same name as downloaded_filename `const filename = 'btc-price.json';`
const json = await readJSON(filename)
console.log(json)

// Step 2: Filter specific data we want to keep and write to a new JSON file
const currencyRates = Object.values(json.bpi); // convert property values into an array
const filteredCurrencyRates = currencyRates.map(rate => ({ 
    currency: rate.description,
    bitcoinRate: rate.rate
}));

// Step 3. Write a new JSON file with our filtered data
const newFilename = `btc-price-postprocessed.json` // name of a new file to be saved
await writeJSON(newFilename, filteredCurrencyRates) // create a new JSON file with just the Bitcoin price
console.log("Wrote a post process file")

// Optionally delete the original file
// await removeFile('./btc-price.json') // equivalent to removeFile('btc-price.json')





/*
import { readJSON, writeJSON, removeFile } from 'https://deno.land/x/flat@0.0.14/mod.ts' 

const filename = Deno.args[0];
const json = await readJSON(filename)
console.log(json);

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
      close: parseFloat(entry["4. close"]),
    });
  }
  processedData.sort((a, b) => new Date(a.time) - new Date(b.time));
  return processedData.map((item) => ({
    time: new Date(item.time).toISOString().split("T")[0],
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
  }));
}

// Process the data
let processedSpyRates = processData(spyRates);
let processedQqqRates = processData(qqqRates);
let processedSolRates = processData(solRates);

const newspyFilename = `spy-hist-postprocessed.json`;
const newqqqFilename = `qqq-hist-postprocessed.json`;
const newsolFilename = `sol-hist-postprocessed.json`;

await writeJSON(newspyFilename, processedSpyRates);
await writeJSON(newqqqFilename, processedQqqRates);
await writeJSON(newsolFilename, processedSolRates);

console.log("Wrote post process files");
*/
