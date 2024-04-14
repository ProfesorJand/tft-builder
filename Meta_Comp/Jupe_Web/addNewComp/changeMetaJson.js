const fs = require('fs');

export function changeMetaJson(nuevaComp) {
  fs.writeFile(
    './Meta_Comp/meta.json',
    JSON.stringify(nuevaComp, null, ' '),
    (err) => {
      if (err) {
        throw new Error('Something went wrong. in agregar Nueva Comp');
      }
      console.log('JSON written to file. Contents:');
    }
  );
}

module.exports = { changeMetaJson };
