// import meta from './meta.json' with { type: 'json' };
// import datosSet11Latino from './datosSet11Latino.json' with { type: 'json' };

// function closeComp({padre}){
//   const btn = document.createElement("btn");
//   btn.className = "btnClose";
//   btn.innerHTML = "X";
//   padre.appendChild(btn);
//   btn.addEventListener("click", ()=>{
//     padre.style.display="none";
//     const imgSelected = document.querySelector(".imgSelected");
//     imgSelected.classList.remove("imgSelected");
//   });
// }

// function infoComp({ element, padreComposicion }) {
//   const infoComp = document.createElement('div');
//   infoComp.className = 'infoComp';
//   infoComp.id = `composicion-${element.titulo.replaceAll(' ', '_')}`;
//   infoComp.style.display = 'none';
//   padreComposicion.appendChild(infoComp);
//   closeComp({padre: infoComp})
//   titulo({ titulo: element.titulo, padre: infoComp });
//   sinergias({ sinergias: element.sinergias, padre: infoComp });
//   composicion({ element, padre: infoComp });
// }

// function imgTitular({ element, padreImg }) {
//   const imgTitle = document.createElement('img');
//   imgTitle.src = element?.imgTitular;
//   imgTitle.alt = element?.titulo;
//   imgTitle.className = 'imgChampionTierList';
//   padreImg.appendChild(imgTitle);
//   imgTitle.addEventListener('click', () => {
//     const allImgTitles = document.getElementsByClassName('imgChampionTierList');
//     if(imgTitle.classList.contains('imgSelected')){

//     }else{
//       for (let allImgTitle of allImgTitles) {
//         allImgTitle.classList.remove('imgSelected');
//         imgTitle.classList.add('imgSelected');
//       }
//       const allCompInfo = document.getElementsByClassName('infoComp');
//       const compInfo = document.getElementById(
//         `composicion-${element.titulo.replaceAll(' ', '_')}`
//       );
//       if (compInfo.style.display === 'flex') {
//         return (compInfo.style.display = 'none');
//       } else {
//         for (let i = 0; i < allCompInfo.length; i++) {
//           allCompInfo[i].style.display = 'none';
//         }
//         compInfo.style.display = 'flex';
//         const divConteinerPestanas = compInfo.getElementsByClassName('containerPestanas');
//         const pestaña = divConteinerPestanas[0].getElementsByClassName('pestanas');
//         for (let j = 0; j < pestaña.length; j++) {
//           pestaña[j].classList.remove('active');
//           if (j === 0) {
//             pestaña[j].classList.add('active');
//           }
//         }
//         const pestañaId = document.getElementById(
//           `pestana-${element.titulo.replaceAll(' ', '_')}`
//         );
//         if(pestañaId.hasChildNodes() ){
//           const pestañaAumento = pestañaId.getElementsByClassName(
//             'pestanaConteinerContenido'
//           );
//           for(var i = 0; i < pestañaAumento.length; i++){
//             console.log(pestañaAumento[i], i)
//             if(i === 0){
//               pestañaAumento[i].style.display = 'flex';
//             }else{
//               pestañaAumento[i].style.display = 'none';
//             }
//           }
//         }
//       }
//     }
//   });
// }

// function composicion({ element, padre }) {
//   const div = document.createElement('div');
//   div.className = 'composicionDiv';
//   const img = document.createElement('img');
//   img.className = 'composicionImg';
//   img.src = element.composicion;
//   div.appendChild(img);
//   padre.appendChild(div);
//   pestañas({
//     pestañas: element.pestañas,
//     id: element.titulo.replaceAll(' ', '_'),
//     padre: padre,
//   });
// }

// function titulo({ titulo, padre }) {
//   const h3 = document.createElement('h3');
//   h3.className = 'titulo';
//   h3.innerHTML = titulo;
//   padre.appendChild(h3);
// }

// function sinergias({ sinergias, padre }) {
//   const p = document.createElement('p');
//   p.className = 'sinergiasText';
//   p.innerHTML = sinergias;

//   padre.appendChild(p);
// }

// function pestañas({ pestañas, id, padre }) {
//   const div = document.createElement('div');
//   div.id = `pestana-${id}`;
//   div.className = 'pestanaConteiner';
//   const ul = document.createElement('div');
//   ul.className = 'containerPestanas';
//   for (const [key, value] of Object.entries(pestañas)) {
//     const li = document.createElement('div');
//     li.className = 'pestanas';
//     const pestañaConteinerContenido = document.createElement('div');
//     pestañaConteinerContenido.className = 'pestanaConteinerContenido';
//     pestañaConteinerContenido.style.display = 'none';
//     if(key.includes("Composiciones")){
//       const [,...nombrePestaña] = key.split("_");
//       li.innerHTML = nombrePestaña.join(" ");
//       const imgCompPestaña = document.createElement("img");
//       imgCompPestaña.src = value;
//       imgCompPestaña.alt = nombrePestaña;
//       imgCompPestaña.className = "imgCompPestana";
//       pestañaConteinerContenido.appendChild(imgCompPestaña);
//     }else{
//       li.innerHTML = key;
//     }
//     ul.appendChild(li);
//     if (key.toLowerCase() === 'aumentos') {
//       aumentos({
//         arrayAumentos: pestañas.Aumentos,
//         padre: pestañaConteinerContenido,
//       });
//     }
//     if (key.toLowerCase() === 'consejos' || key.toLowerCase() === 'tips') {
//       if(Array.isArray(value)){
//         let text = "";
//         value.forEach((v)=>{
//           text += v + "<br/>"
//         })
//         pestañaConteinerContenido.innerHTML = text;
//       }else{
//         pestañaConteinerContenido.innerHTML = value;
//       }
//     }
//     if (key.toLowerCase() === 'gameplay') {
//       function getId(url) {
//         const regExp =
//           /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//         const match = url.match(regExp);

//         return match && match[2].length === 11 ? match[2] : null;
//       }

//       const videoId = getId(value);
//       const iframeMarkup =
//         '<iframe width="560" height="315" src="//www.youtube.com/embed/' +
//         videoId +
//         '" frameborder="0" allowfullscreen></iframe>';
//       const divIframe = document.createElement('div');
//       divIframe.className = 'divIframe';
//       divIframe.innerHTML = iframeMarkup;
//       pestañaConteinerContenido.appendChild(divIframe);
//     }
//     if(key.toLocaleLowerCase() === "composiciones"){
//       const liComposiciones = document.createElement("li");
//       for (const [compName, imgComp] of Object.entries(value)){
//         const imgCompPestaña = document.createElement("img");
//         imgCompPestaña.className = "imgCompPestana";
//         imgCompPestaña.src = imgComp;
//         imgCompPestaña.alt = compName;
//         liComposiciones.innerHTML = compName;
//         pestañaConteinerContenido.appendChild(imgCompPestaña);
//         liComposiciones.addEventListener("click",(e)=>clickPestaña(e, pestañaConteinerContenido));
//         ul.appendChild(liComposiciones);
//       }
//     }
//     div.appendChild(pestañaConteinerContenido);
//     li.addEventListener('click', (e)=>clickPestaña(e, pestañaConteinerContenido));

//   }
//   padre.appendChild(ul);
//   padre.appendChild(div);
// }

// function clickPestaña (e, pestañaConteinerContenido){
//   const allLi = document.getElementsByClassName(`pestanas active`);
//   const allContenidoPestaña = document.getElementsByClassName(
//     'pestanaConteinerContenido'
//   );
//   for (let i = 0; i < allLi.length; i++) {
//     allLi[i].classList.remove('active');
//   }
//   for (let j = 0; j < allContenidoPestaña.length; j++) {
//     allContenidoPestaña[j].style.display = 'none';
//   }
//   e.target.classList.add('active');
//   pestañaConteinerContenido.style.display = 'flex';
// }

// function aumentos({ arrayAumentos, padre }) {
//   const aumentos = datosSet11Latino.objetos;
//   arrayAumentos.forEach((aum) => {
//     const aumentoImg = document.createElement('img');
//     aumentoImg.className = 'aumentoImg';
//     const datosAumento = aumentos.find((e) => {
//       return aum === e.apiName;
//     });
//     aumentoImg.src =
//       datosAumento?.icon ||
//       'https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/augments/hexcore/pandoras-bench-i.png';
//     aumentoImg.alt = 'Imagen de Aumento ' + (datosAumento?.nombre || 'ninguno');
//     const containerTooltip = document.createElement('div');
//     const tooltip = document.createElement('div');
//     tooltip.className = 'tooltip';
//     containerTooltip.className = 'containerTooltip';
//     const titulo = document.createElement('h2');
//     titulo.innerHTML = datosAumento?.name || 'ninguno';
//     const descripcion = document.createElement('p');
//     descripcion.innerHTML = datosAumento?.desc || 'sin descripcion';
//     containerTooltip.appendChild(titulo);
//     containerTooltip.appendChild(descripcion);
//     tooltip.appendChild(aumentoImg);
//     tooltip.appendChild(containerTooltip);
//     padre.appendChild(tooltip);
//   });
// }

// const containerTierList = document.getElementById('containerTierList');

// for (const [key, value] of Object.entries(meta)) {
//   const containerTierType = document.createElement('div');
//   containerTierType.className = `container-Tier`;
//   const divTier = document.createElement('div');
//   divTier.className = `Tier`;
//   const imgTier = document.createElement("img");
//   imgTier.src = `https://guiadeparche.com/tftdata/Set11/metaComps/tier/Tier-${key}.jpg`;
//   imgTier.alt = `TFT Tier-${key}`;
//   imgTier.classList.add("imgTier");
//   divTier.appendChild(imgTier);
//   //divTier.innerHTML = `${key.toUpperCase()}`;
//   const containerChampionsTierType = document.createElement('div');
//   containerChampionsTierType.id = `containerChampionsTier${key.toUpperCase()}`;
//   containerChampionsTierType.className = 'container-ChampionsTierList';

//   containerTierType.appendChild(divTier);
//   containerTierType.appendChild(containerChampionsTierType);
//   containerTierList.appendChild(containerTierType);

//   meta[key]?.forEach((element) => {
//     imgTitular({
//       element,
//       padreImg: containerChampionsTierType,
//     });
//     infoComp({ element, padreComposicion: containerTierList });
//   });
// }

// const infoCompPrincipal = document.getElementsByClassName("infoComp");
// infoCompPrincipal[0].style.display = "flex";
// const containerPestanasPrincipal = document.getElementsByClassName("containerPestanas");
// containerPestanasPrincipal[0].getElementsByClassName("pestanas")[0].classList.add("active");
// const pestanaConteinerPrincipal = document.getElementsByClassName("pestanaConteiner");
// pestanaConteinerPrincipal[0].getElementsByClassName("pestanaConteinerContenido")[0].style.display = "flex";

/*/ funciona pero esta en ASYNC /*/

//import meta from './meta.json' with { type: 'json' };
//import datosSet11Latino from './datosSet11Latino.json' with { type: 'json' };
async function fetchMeta() {
  try {
    const fetching = await fetch('./meta.json');
    const data = await fetching.json();
    return data;
  } catch (err) {
    console.log('err', err);
  }
}
const meta = await fetchMeta();

async function fetchDatosSet11Latino() {
  try {
    const fetching = await fetch('./datosSet11Latino.json');
    const data = await fetching.json();
    return data;
  } catch (err) {
    console.log('err', err);
  }
}
const datosSet11Latino = await fetchDatosSet11Latino();

function closeComp({ padre }) {
  const btn = document.createElement('btn');
  btn.className = 'btnClose';
  btn.innerHTML = 'X';
  padre.appendChild(btn);
  btn.addEventListener('click', () => {
    padre.style.display = 'none';
    const imgSelected = document.querySelector('.imgSelected');
    imgSelected.classList.remove('imgSelected');
  });
}

function infoComp({ element, padreComposicion }) {
  const infoComp = document.createElement('div');
  infoComp.className = 'infoComp';
  infoComp.id = `composicion-${element.titulo.replaceAll(' ', '_')}`;
  infoComp.style.display = 'none';
  padreComposicion.appendChild(infoComp);
  closeComp({ padre: infoComp });
  titulo({ titulo: element.titulo, padre: infoComp });
  sinergias({ sinergias: element.sinergias, padre: infoComp });
  composicion({ element, padre: infoComp });
}

function imgTitular({ element, padreImg }) {
  const imgTitle = document.createElement('img');
  imgTitle.src = element?.imgTitular;
  imgTitle.alt = element?.titulo;
  imgTitle.className = 'imgChampionTierList';
  padreImg.appendChild(imgTitle);
  imgTitle.addEventListener('click', () => {
    const allImgTitles = document.getElementsByClassName('imgChampionTierList');
    if (imgTitle.classList.contains('imgSelected')) {
    } else {
      for (let allImgTitle of allImgTitles) {
        allImgTitle.classList.remove('imgSelected');
        imgTitle.classList.add('imgSelected');
      }
      const allCompInfo = document.getElementsByClassName('infoComp');
      const compInfo = document.getElementById(
        `composicion-${element.titulo.replaceAll(' ', '_')}`
      );
      if (compInfo.style.display === 'flex') {
        return (compInfo.style.display = 'none');
      } else {
        for (let i = 0; i < allCompInfo.length; i++) {
          allCompInfo[i].style.display = 'none';
        }
        compInfo.style.display = 'flex';
        const divConteinerPestanas =
          compInfo.getElementsByClassName('containerPestanas');
        const pestaña =
          divConteinerPestanas[0].getElementsByClassName('pestanas');
        for (let j = 0; j < pestaña.length; j++) {
          pestaña[j].classList.remove('active');
          if (j === 0) {
            pestaña[j].classList.add('active');
          }
        }
        const pestañaId = document.getElementById(
          `pestana-${element.titulo.replaceAll(' ', '_')}`
        );
        if (pestañaId.hasChildNodes()) {
          const pestañaAumento = pestañaId.getElementsByClassName(
            'pestanaConteinerContenido'
          );
          for (var i = 0; i < pestañaAumento.length; i++) {
            if (i === 0) {
              pestañaAumento[i].style.display = 'flex';
            } else {
              pestañaAumento[i].style.display = 'none';
            }
          }
        }
      }
    }
  });
}

function composicion({ element, padre }) {
  const div = document.createElement('div');
  div.className = 'composicionDiv';
  const img = document.createElement('img');
  img.className = 'composicionImg';
  img.src = element.composicion;
  div.appendChild(img);
  padre.appendChild(div);
  pestañas({
    pestañas: element.pestañas,
    id: element.titulo.replaceAll(' ', '_'),
    padre: padre,
  });
}

function titulo({ titulo, padre }) {
  const h3 = document.createElement('h3');
  h3.className = 'titulo';
  h3.innerHTML = titulo;
  padre.appendChild(h3);
}

function sinergias({ sinergias, padre }) {
  const p = document.createElement('p');
  p.className = 'sinergiasText';
  const span = document.createElement('span');
  span.className = 'sinergiasSpan';
  span.innerHTML = sinergias;
  p.appendChild(span);
  padre.appendChild(p);
}

function pestañas({ pestañas, id, padre }) {
  const div = document.createElement('div');
  div.id = `pestana-${id}`;
  div.className = 'pestanaConteiner';
  const ul = document.createElement('div');
  ul.className = 'containerPestanas';
  for (const [key, value] of Object.entries(pestañas)) {
    const li = document.createElement('div');
    li.className = 'pestanas';
    const pestañaConteinerContenido = document.createElement('div');
    pestañaConteinerContenido.className = 'pestanaConteinerContenido';
    pestañaConteinerContenido.style.display = 'none';
    if (key.includes('Composiciones')) {
      const [, ...nombrePestaña] = key.split('_');
      li.innerHTML = nombrePestaña.join(' ');
      const imgCompPestaña = document.createElement('img');
      imgCompPestaña.src = value;
      imgCompPestaña.alt = nombrePestaña;
      imgCompPestaña.className = 'imgCompPestana';
      pestañaConteinerContenido.appendChild(imgCompPestaña);
    } else {
      li.innerHTML = key;
    }
    ul.appendChild(li);
    if (key.toLowerCase() === 'aumentos') {
      aumentos({
        arrayAumentos: pestañas.Aumentos,
        padre: pestañaConteinerContenido,
      });
    }
    if (key.toLowerCase() === 'consejos' || key.toLowerCase() === 'tips') {
      if (Array.isArray(value)) {
        let text = '';
        value.forEach((v) => {
          text += v + '<br/>';
        });
        pestañaConteinerContenido.innerHTML = text;
      } else {
        pestañaConteinerContenido.innerHTML = value;
      }
    }
    if (key.toLowerCase() === 'gameplay') {
      function getId(url) {
        const regExp =
          /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return match && match[2].length === 11 ? match[2] : null;
      }

      const videoId = getId(value);
      const iframeMarkup =
        '<iframe width="560" height="315" src="//www.youtube.com/embed/' +
        videoId +
        '" frameborder="0" allowfullscreen></iframe>';
      const divIframe = document.createElement('div');
      divIframe.className = 'divIframe';
      divIframe.innerHTML = iframeMarkup;
      pestañaConteinerContenido.appendChild(divIframe);
    }
    if (key.toLocaleLowerCase() === 'composiciones') {
      const liComposiciones = document.createElement('li');
      for (const [compName, imgComp] of Object.entries(value)) {
        const imgCompPestaña = document.createElement('img');
        imgCompPestaña.className = 'imgCompPestana';
        imgCompPestaña.src = imgComp;
        imgCompPestaña.alt = compName;
        liComposiciones.innerHTML = compName;
        pestañaConteinerContenido.appendChild(imgCompPestaña);
        liComposiciones.addEventListener('click', (e) =>
          clickPestaña(e, pestañaConteinerContenido)
        );
        ul.appendChild(liComposiciones);
      }
    }
    div.appendChild(pestañaConteinerContenido);
    li.addEventListener('click', (e) =>
      clickPestaña(e, pestañaConteinerContenido)
    );
  }
  padre.appendChild(ul);
  padre.appendChild(div);
}

function clickPestaña(e, pestañaConteinerContenido) {
  const allLi = document.getElementsByClassName(`pestanas active`);
  const allContenidoPestaña = document.getElementsByClassName(
    'pestanaConteinerContenido'
  );
  for (let i = 0; i < allLi.length; i++) {
    allLi[i].classList.remove('active');
  }
  for (let j = 0; j < allContenidoPestaña.length; j++) {
    allContenidoPestaña[j].style.display = 'none';
  }
  e.target.classList.add('active');
  pestañaConteinerContenido.style.display = 'flex';
}

function aumentos({ arrayAumentos, padre }) {
  const aumentos = datosSet11Latino.objetos;
  arrayAumentos.forEach((aum) => {
    const aumentoImg = document.createElement('img');
    aumentoImg.className = 'aumentoImg';
    const datosAumento = aumentos.find((e) => {
      return aum === e.apiName;
    });
    aumentoImg.src =
      datosAumento?.icon ||
      'https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/augments/hexcore/pandoras-bench-i.png';
    aumentoImg.alt = 'Imagen de Aumento ' + (datosAumento?.nombre || 'ninguno');
    const containerTooltip = document.createElement('div');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    containerTooltip.className = 'containerTooltip';
    const titulo = document.createElement('h2');
    titulo.innerHTML = datosAumento?.name || 'ninguno';
    const descripcion = document.createElement('p');
    descripcion.innerHTML = datosAumento?.desc || 'sin descripcion';
    containerTooltip.appendChild(titulo);
    containerTooltip.appendChild(descripcion);
    tooltip.appendChild(aumentoImg);
    tooltip.appendChild(containerTooltip);
    padre.appendChild(tooltip);
  });
}

const containerTierList = document.getElementById('containerTierList');
for (const key in meta) {
  const containerTierType = document.createElement('div');
  containerTierType.className = `container-Tier`;
  const divTier = document.createElement('div');
  divTier.className = `Tier`;
  const imgTier = document.createElement('img');
  imgTier.src = `https://guiadeparche.com/tftdata/Set11/metaComps/tier/Tier-${key}.jpg`;
  imgTier.alt = `TFT Tier-${key}`;
  imgTier.classList.add('imgTier');
  divTier.appendChild(imgTier);
  //divTier.innerHTML = `${key.toUpperCase()}`;
  const containerChampionsTierType = document.createElement('div');
  containerChampionsTierType.id = `containerChampionsTier${key.toUpperCase()}`;
  containerChampionsTierType.className = 'container-ChampionsTierList';

  containerTierType.appendChild(divTier);
  containerTierType.appendChild(containerChampionsTierType);
  containerTierList.appendChild(containerTierType);

  meta[key]?.forEach((element) => {
    imgTitular({
      element,
      padreImg: containerChampionsTierType,
    });
    infoComp({ element, padreComposicion: containerTierList });
  });
}

const infoCompPrincipal = document.getElementsByClassName('infoComp');
infoCompPrincipal[0].style.display = 'flex';
const containerPestanasPrincipal =
  document.getElementsByClassName('containerPestanas');
containerPestanasPrincipal[0]
  .getElementsByClassName('pestanas')[0]
  .classList.add('active');
const pestanaConteinerPrincipal =
  document.getElementsByClassName('pestanaConteiner');
pestanaConteinerPrincipal[0].getElementsByClassName(
  'pestanaConteinerContenido'
)[0].style.display = 'flex';

document
  .getElementById('containerChampionsTierS')
  .getElementsByClassName('imgChampionTierList')[0]
  .classList.add('imgSelected');
