// This can be a typescript file as well

// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
import { readJSON, writeJSON, removeFile } from 'https://deno.land/x/flat@0.0.14/mod.ts' 


const filename = Deno.args[0] // Same name as downloaded_filename `const filename = 'btc-price.json';`
const json = await readJSON(filename)
console.log(json)

// Step 2: Filter specific data we want to keep and write to a new JSON file
const spyRates = Object.values(json.spy); // convert property values into an array
function processData(data) {
  const processedData = Object.entries(data).map(([date, entry]) => ({
    time: date,
    open: parseFloat(entry["1. open"]),
    high: parseFloat(entry["2. high"]),
    low: parseFloat(entry["3. low"]),
    close: parseFloat(entry["4. close"]),
  }));

  processedData.sort((a, b) => new Date(a.time) - new Date(b.time));

  return processedData.map((item) => ({
    time: new Date(item.time).toISOString().split("T")[0],
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
  }));
}
let processedSpyRates = processData(spyRates);

// Step 3. Write a new JSON file with our filtered data
const newFilename = `spy-postprocessed.json` // name of a new file to be saved
await writeJSON(newFilename, processedSpyRates) // create a new JSON file with just the Bitcoin price
console.log("Wrote a post process file")




/*

const sqlRates = JSON.parse(await Deno.readTextFile("./sql-hist.json"));
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
