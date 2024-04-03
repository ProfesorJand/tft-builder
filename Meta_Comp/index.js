import meta from './meta.json' assert { type: 'json' };
import datosSet11Latino from './datosSet11Latino.json' assert { type: 'json' };
console.log(meta);
const containerTierList = document.getElementById('container-TierList');
console.log(containerTierList);
for (const [key, value] of Object.entries(meta)) {
  const containerTierType = document.createElement('div');
  containerTierType.id = `container-Tier${key}`;
  const divTier = document.createElement('div');
  divTier.id = `Tier${key}`;
  divTier.innerHTML = `${key.toUpperCase()}`;
  const containerChampionsTierType = document.createElement('div');
  containerChampionsTierType.id = `containerChampionsTier${key.toUpperCase()}`;
  containerChampionsTierType.className = 'container-ChampionsTierList';

  containerTierType.appendChild(divTier);
  containerTierType.appendChild(containerChampionsTierType);
  containerTierList.appendChild(containerTierType);

  meta[key]?.forEach((element) => {
    //Imagen que se muestra en el tier list (campeon)
    const imgTitle = document.createElement('img');
    imgTitle.src = element?.imgTitular;
    imgTitle.alt = element?.titulo;
    imgTitle.className = 'imgChampionTierList';
    //imgTitle.style = `width: 50px; height:50px; margin:10px`;
    containerChampionsTierType.appendChild(imgTitle);

    // crear container de Informacion de la Comp
    const containerCompInfo = document.createElement('div');
    containerCompInfo.id = element.titulo;
    containerCompInfo.className = 'compInfo';

    // Componente izquierda
    const containerCompInfoLeft = document.createElement('div');
    containerCompInfoLeft.className = 'containerCompInfoLeft';
    /* Comp Izq Img */
    containerCompInfoLeft.appendChild(imgTitle.cloneNode(true));
    /* Comp Izq Titulo */
    const containerCompInfoLeftTittle = document.createElement('p');
    containerCompInfoLeftTittle.className = 'containerCompInfoLeftTittle';
    containerCompInfoLeftTittle.innerHTML = element.titulo;
    containerCompInfoLeft.appendChild(containerCompInfoLeftTittle);
    /* Comp Izq Aumentos Tooltip */
    const containerCompInfoLeftSinergy = document.createElement('div');
    containerCompInfoLeftSinergy.className = 'containerCompInfoLeftSinergy';
    const aumentos = datosSet11Latino.objetos;
    element.aumentos.forEach((aum) => {
      const aumentoImg = document.createElement('img');
      aumentoImg.className = 'aumentoImg';
      const datosAumento = aumentos.find((e) => {
        return aum === e.apiName;
      });
      aumentoImg.src =
        datosAumento?.icon ||
        'https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/augments/hexcore/pandoras-bench-i.png';
      aumentoImg.alt =
        'Imagen de Aumento ' + (datosAumento?.nombre || 'ninguno');
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
      console.log(containerTooltip.offsetLeft);
      containerCompInfoLeftSinergy.appendChild(tooltip);
    });
    containerCompInfoLeft.appendChild(containerCompInfoLeftSinergy);

    // Componente Derecha
    const containerCompInfoRight = document.createElement('div');
    containerCompInfoRight.className = 'containerCompInfoRight';

    // Componente Derecha Top
    const containerCompInfoRightTop = document.createElement('div');
    containerCompInfoRightTop.className = 'containerCompInfoRightTop';
    containerCompInfoRight.appendChild(containerCompInfoRightTop);
    // COmponente Derecha Mid
    const containerCompInfoRightMid = document.createElement('div');
    containerCompInfoRightMid.className = 'containerCompInfoRightMid';
    containerCompInfoRight.appendChild(containerCompInfoRightMid);
    // COmponente Derecha Bottom
    const containerCompInfoRightBottom = document.createElement('div');
    containerCompInfoRightBottom.className = 'containerCompInfoRightBottom';
    containerCompInfoRight.appendChild(containerCompInfoRightBottom);
    /* Compo */
    const containerCompInfoRightBottomPosition = document.createElement('div');
    containerCompInfoRightBottomPosition.className =
      'containerCompInfoRightBottomPosition';
    const containerCompInfoRightBottomPositionDiv =
      document.createElement('div');
    containerCompInfoRightBottomPositionDiv.className =
      'containerCompInfoRightBottomPositionDiv';
    const imgComp = document.createElement('img');
    imgComp.src = element.campeonesComp;
    imgComp.alt = 'Meta Comp ' + element.titulo;
    containerCompInfoRightBottomPositionDiv.appendChild(imgComp);
    containerCompInfoRightBottomPosition.appendChild(
      containerCompInfoRightBottomPositionDiv
    );
    containerCompInfoRightBottom.appendChild(
      containerCompInfoRightBottomPosition
    );
    /* Gameplan */
    const containerCompInfoRightBottomGamePlan = document.createElement('div');
    containerCompInfoRightBottomGamePlan.className =
      'containerCompInfoRightBottomGamePlan';
    element?.planDeJuego?.forEach((plan) => {
      console.log('titulo', plan?.titulo);
      console.log('text', plan?.texto);
      const divPlanDeJuego = document.createElement('div');
      divPlanDeJuego.className = 'planDeJuego';
      const tituloPlanDeJuego = document.createElement('p');
      tituloPlanDeJuego.className = 'tituloPlanDeJuego';
      tituloPlanDeJuego.innerHTML = plan.titulo;
      const textoPlanDeJuego = document.createElement('p');
      textoPlanDeJuego.className = 'textoPlanDeJuego';
      textoPlanDeJuego.innerHTML = plan.texto;
      divPlanDeJuego.appendChild(tituloPlanDeJuego);
      divPlanDeJuego.appendChild(textoPlanDeJuego);
      containerCompInfoRightBottomGamePlan.appendChild(divPlanDeJuego);
    });
    containerCompInfoRightBottomPosition.appendChild(
      containerCompInfoRightBottomGamePlan
    );

    containerCompInfo.style.display = 'none';
    containerCompInfo.appendChild(containerCompInfoLeft);
    containerCompInfo.appendChild(containerCompInfoRight);
    containerTierList.appendChild(containerCompInfo);

    // x para cerrar
    const botonX = document.createElement('button');
    botonX.className = 'botonX';
    botonX.innerHTML = 'x';
    containerCompInfo.appendChild(botonX);
    botonX.addEventListener('click', (e) => {
      e.target.parentNode.style.display = 'none';
    });
    //mostrar info al hacer click
    imgTitle.addEventListener('click', () => {
      const containerCompInfoShow = document.getElementById(element.titulo);
      const compInfo = document.getElementsByClassName('compInfo');
      Array.prototype.forEach.call(compInfo, (e) => {
        console.log(e);
        e.style.display = 'none';
      });
      containerCompInfoShow.style.display = 'flex';
    });
  });

  // containerTierList.appendChild()

  console.log(`${key}: ${value}`);
}
