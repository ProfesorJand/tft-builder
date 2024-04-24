// const fs = require('fs');

// async function fetchMeta() {
//   try {
//     const fetching = await fetch('../meta.json');
//     const data = await fetching.json();
//     return data;
//   } catch (err) {
//     console.log('err', err);
//   }
// }
// const meta = await fetchMeta();
// console.log('meta', meta);

const formCrearComp = document.getElementById('formCrearComp');
formCrearComp.addEventListener('submit', (e) => {
  e.preventDefault();
  const nuevaComp = {};
  nuevaComp['titulo'] = FormTituloComp.value;
  nuevaComp['imgTitular'] = '';
  nuevaComp['composicion'] = '';
  nuevaComp['pestañas'] = {};
  nuevaComp['pestañas']['Aumentos'] = arrayAumentos;
  nuevaComp['pestañas']['Tips'] = '';
  nuevaComp['pestañas']['Consejos'] = '';
  //crear formulario de gameplay
  nuevaComp['pestañas']['Gameplay'] = '';
  //revisar esto por cada compo que haya en pestañas
  nuevaComp['pestañas']['Composiciones_${Variable}'] = '';
  const Tier = selectTier.value;

  //meta[Tier].push(nuevaComp);

  //changeMetaJson(nuevaComp);
  // writeFile(
  //   './Meta_Comp/meta.json',
  //   JSON.stringify(nuevaComp, null, ' '),
  //   (err) => {
  //     if (err) {
  //       throw new Error('Something went wrong. in agregar Nueva Comp');
  //     }
  //     console.log('JSON written to file. Contents:');
  //   }
  // );

  //final
  arrayAumentos = [];
});

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
