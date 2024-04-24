const fs = require('fs');
const version = 'pbe';

const url = `https://raw.communitydragon.org/${version}/cdragon/tft/es_ar.json`;
async function getTraitsUpdates(url) {
  try {
    const data = await fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        const traits = data.sets['11'].traits;
        const newTraits = traits.map((e) => {
          return { ...e, desc: variablesSinergias(e) };
        });

        fs.writeFile('traits.json', JSON.stringify(newTraits), (err) => {
          if (err) {
            console.log('error'.err);
            return;
          }
          console.log('JSON written to file. Contents:');
        });
      });
  } catch (error) {
    console.log(error);
  }
}

getTraitsUpdates(url);

function variablesSinergias(data) {
  var desc = data.desc;
  const effects = data.effects;

  var expresionRegular = /@([^@]+)@/g;
  var resultado = desc?.replace(expresionRegular, function (coincidencia, key) {
    console.log('coincidencia', coincidencia);
    console.log('key', key);
    const hash = convertidorHash(key.toLowerCase());
    console.log(effects);
    // key contendrá la palabra encerrada sin los @
    // Verificamos si la key existe en el objeto y devolvemos el valor correspondiente
    const variables = effects.map((effect) => {
      return effect.variables.hasOwnProperty(key)
        ? effect.variables[key]
        : effect.variables.hasOwnProperty('{' + hash + '}')
        ? effect.variables['{' + hash + '}']
        : effect.variables.hasOwnProperty(
            key.charAt(0).toUpperCase() + key.slice(1)
          )
        ? effect.variables[key]
        : effect.variables[key.replace('*100', '')]
        ? Math.ceil(effect.variables[key.replace('*100', '')] * 100)
        : effect[key.charAt(0).toLowerCase() + key.slice(1)]
        ? effect[key.charAt(0).toLowerCase() + key.slice(1)]
        : coincidencia;
    });
    console.log(variables);
    // return effects.hasOwnProperty(key)
    //   ? effects[key]
    //   : effects.hasOwnProperty('{' + hash + '}')
    //   ? effects['{' + hash + '}']
    //   : effects.hasOwnProperty(key.charAt(0).toUpperCase() + key.slice(1))
    //   ? effects[key]
    //   : coincidencia;
    const [, ...demasVariables] = variables;
    return demasVariables.join('/');
  });

  return resultado;
}

function convertidorHash(text) {
  var hash = BigInt(0x811c9dc5);

  for (let i = 0; i < text.length; i++) {
    hash ^= BigInt(text.charCodeAt(i));
    hash *= BigInt(0x1000193);
    hash &= BigInt(0xffffffff);
  }
  while (hash.toString(16).length < 8) {
    hash = '0' + hash.toString(16);
  }
  return hash.toString(16);
}
