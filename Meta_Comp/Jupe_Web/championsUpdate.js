const fs = require('fs');
export const version = 'latest';
export const idioma = 'es_ar';
export const urlDdragon = `https://raw.communitydragon.org/${version}/cdragon/tft/${idioma}.json`;

async function getChampionsUpdates(urlDdragon) {
  try {
    const data = await fetch(urlDdragon)
      .then((resp) => resp.json())
      .then((data) => {
        const champions = data.sets['11'].champions;
        const newArrayChampions = champions.map((champ) => {
          const obj = {
            apiName: champ.apiName,
            name: champ.name,
            cost: champ.cost,
            traits: champ.traits,
            squareIcon: champ.squareIcon,
          };
          return obj;
        });
        fs.writeFile(
          './Meta_Comp/Jupe_Web/championsSet11Latino.json',
          JSON.stringify(newArrayChampions, null, ' '),
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
