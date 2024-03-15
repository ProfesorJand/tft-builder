const fs = require('fs');
const { version, urlDdragon } = require('./communitydragon.js');

async function getChampionsUpdates(urlDdragon) {
  try {
    const data = await fetch(urlDdragon)
      .then((resp) => resp.json())
      .then((data) => {
        fs.writeFile(
          'champions.json',
          JSON.stringify(data.sets['11'].champions),
          (err) => {
            if (err) {
              throw new Error('Something went wrong.');
            }
            console.log('JSON written to file. Contents:');
          }
        );
      });
  } catch (error) {
    console.log(error);
  }
}

getChampionsUpdates(urlDdragon);
