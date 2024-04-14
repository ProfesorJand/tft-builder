const fs = require('fs');
export const version = 'latest';
export const idioma = 'es_ar';
export const urlDdragon = `https://raw.communitydragon.org/${version}/cdragon/tft/${idioma}.json`;

async function getAumentosUpdates(urlDdragon) {
  try {
    const data = await fetch(urlDdragon)
      .then((resp) => resp.json())
      .then((data) => {
        const aumentos = data.items;
        const newArrayAumentos = aumentos.map((aumento) => {
          const obj = {
            apiName: aumento.apiName,
            name: aumento.name,
            icon: aumento.icon,
          };
          return obj;
        });
        fs.writeFile(
          './Meta_Comp/Jupe_Web/addNewComp/AumentosSet11Latino.json',
          JSON.stringify(newArrayAumentos, null, ' '),
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

getAumentosUpdates(urlDdragon);
