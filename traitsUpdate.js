const fs = require('fs');
const version = 'pbe';

const url = `https://raw.communitydragon.org/${version}/cdragon/tft/es_ar.json`;
async function getTraitsUpdates(url) {
  try {
    const data = await fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        fs.writeFile(
          'traits.json',
          JSON.stringify(data.sets['11'].traits),
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

getTraitsUpdates(url);
