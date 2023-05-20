import { readJSON, writeJSON, removeFile } from 'https://deno.land/x/flat@0.0.14/mod.ts' 

const filename = Deno.args[0];
const json = await readJSON(filename);

const spyRates = Object.values(json["Time Series (Daily)"]);

// const qqqRates = Object.values(json["Time Series (Daily)"]);
                               
// const solRates = Object.values(json["Time Series (Daily)"]);

function processData(data) {
  const processedData = Object.entries(data).map(([date, entry]) => {
    const dateString = date.trim(); // Remove any leading/trailing whitespaces

    const dateObj = new Date(dateString);

    // Check if the dateObj is valid
    if (isNaN(dateObj.getTime())) {
      throw new Error(`Invalid date value: ${dateString}`);
    }

    return {
      time: dateObj.toISOString().split('T')[0],
      open: parseFloat(entry["1. open"]),
      high: parseFloat(entry["2. high"]),
      low: parseFloat(entry["3. low"]),
      close: parseFloat(entry["4. close"]),
    };
  });

  processedData.sort((a, b) => new Date(a.time) - new Date(b.time));

  return processedData;
}


let processedSpyRates = processData(spyRates);

// let processedQqqRates = processData(qqqRates);
// let processedSolRates = processData(solRates);

const newFileone = `spy-postprocessed.json`;
// const newFiletwo = `qqq-postprocessed.json`;
// const newFilethree = `sol-postprocessed.json`;

await writeJSON(newFileone, processedSpyRates);
// await writeJSON(newFiletwo, processedQqqRates);
// await writeJSON(newFilethree, processedSolRates);

console.log("Wrote post-process files");
