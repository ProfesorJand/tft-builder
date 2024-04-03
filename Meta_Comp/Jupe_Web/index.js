import meta from './meta.json' assert { type: 'json' };
import datosSet11Latino from './datosSet11Latino.json' assert { type: 'json' };

function infoComp({ element, padreComposicion }) {
  const infoComp = document.createElement('div');
  infoComp.className = 'infoComp';
  infoComp.id = `composicion-${element.titulo.replaceAll(' ', '_')}`;
  infoComp.style.display = 'none';
  padreComposicion.appendChild(infoComp);
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
      const ul = compInfo.getElementsByTagName('ul');
      const pestaña = ul[0].getElementsByClassName('pestañas');
      for (let j = 0; j < pestaña.length; j++) {
        pestaña[j].classList.remove('active');
        if (j === 0) {
          pestaña[j].classList.add('active');
        }
      }
      const pestañaId = document.getElementById(
        `pestaña-${element.titulo.replaceAll(' ', '_')}`
      );
      const pestañaAumento = pestañaId.getElementsByClassName(
        'pestañaConteinerContenido'
      );
      pestañaAumento[0].style.display = 'flex';
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
  sinergias.forEach((sinergia) => {
    p.innerHTML += `${sinergia.nombre} (${sinergia.cantidadMinima}) `;
  });
  padre.appendChild(p);
}

function pestañas({ pestañas, id, padre }) {
  const div = document.createElement('div');
  div.id = `pestaña-${id}`;
  div.className = 'pestañaCointeiner';
  const ul = document.createElement('ul');
  ul.className = 'containerPestañas';
  for (const [key, value] of Object.entries(pestañas)) {
    const li = document.createElement('li');
    li.className = 'pestañas';
    li.innerHTML = key;
    ul.appendChild(li);
    const pestañaConteinerContenido = document.createElement('div');
    pestañaConteinerContenido.className = 'pestañaConteinerContenido';
    pestañaConteinerContenido.style.display = 'none';
    if (key === 'aumentos') {
      console.log('aumentos', value.join(' '));
      aumentos({
        arrayAumentos: pestañas.aumentos,
        padre: pestañaConteinerContenido,
      });
    }
    if (key === 'consejos' || key === 'tips') {
      pestañaConteinerContenido.innerHTML = value;
    }
    if (key === 'gameplay') {
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
    div.appendChild(pestañaConteinerContenido);
    li.addEventListener('click', (e) => {
      const allLi = document.getElementsByClassName(`pestañas active`);
      const allContenidoPestaña = document.getElementsByClassName(
        'pestañaConteinerContenido'
      );
      for (let i = 0; i < allLi.length; i++) {
        allLi[i].classList.remove('active');
      }
      for (let j = 0; j < allContenidoPestaña.length; j++) {
        allContenidoPestaña[j].style.display = 'none';
      }
      li.classList.add('active');
      pestañaConteinerContenido.style.display = 'flex';
    });
  }
  padre.appendChild(ul);
  padre.appendChild(div);
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

for (const [key, value] of Object.entries(meta)) {
  const containerTierType = document.createElement('div');
  containerTierType.className = `container-Tier`;
  const divTier = document.createElement('div');
  divTier.className = `Tier`;
  divTier.innerHTML = `${key.toUpperCase()}`;
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

// const li = document.getElementsByClassName('pestañas');
// Array.from(li).forEach((elem) => {

// });
