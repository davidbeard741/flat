const { readJson, writeJson, remove } = Deno;

const filename = Deno.args[0];
let json = await readJson(filename);
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

await writeJson(newspyFilename, processedSpyRates);
await writeJson(newqqqFilename, processedQqqRates);
await writeJson(newsolFilename, processedSolRates);

console.log("Wrote post process files");

await remove("./spy-hist.json");
await remove("./qqq-hist.json");
await remove("./sol-hist.json");
console.log("Removed OG files");
