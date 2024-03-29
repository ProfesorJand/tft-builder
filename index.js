import champions from './champions.json' assert { type: 'json' };
import traits from './traits.json' assert { type: 'json' };
import { version, urlDdragon } from './communitydragon.js';

let TRAITS = {};

function addFunctionToPoligons() {
  const poligonDiv = document.getElementsByClassName('poligon');
  Array.prototype.forEach.call(poligonDiv, (elem) => {
    elem.addEventListener('drag', dragEvent);
    elem.addEventListener('dragstart', dragstartEvent);
    elem.addEventListener('dragend', dragendEvent);
    elem.addEventListener('dragover', ondragoverEvent);
    elem.addEventListener('drop', dropEvent);
    elem.addEventListener('dragleave', dragleaveEvent);
    // elem.setAttribute('draggable', false);
  });
}

addFunctionToPoligons();

export function traitsObj(traitName) {
  return traits.find((o) => o.name === traitName);
}

export function championsObj(apiName) {
  return champions.find((o) => o.apiName === apiName);
}

/* ----Draggable Element ---- */
function dragEvent(ev) {
  //On the Draggable Element:
  //An element is being dragged
  ev.preventDefault();
  ev.target.style.opacity = '0.4';
}

function dragstartEvent(ev) {
  //On the Draggable Element:
  //The user starts to drag an element
  ev.dataTransfer.setData('text', ev.target.id);
}

function dragendEvent(ev) {
  //On the Draggable Element:
  //The user has finished dragging an element
  ev.preventDefault();
  ev.target.style.opacity = '1';
  ev.target.style.backgroundColor = 'var(--color-hex-default)';
}

/* ----Drop Target: ---- */
function dragleaveEvent(ev) {
  ev.preventDefault();
  //ev.target.style.backgroundColor = 'var(--color-hex-default)';
}

function ondragoverEvent(ev) {
  ev.preventDefault();
  //ev.target.style.backgroundColor = 'black';
}

function dropEvent(ev) {
  //evento cuando se suelta el click
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text');
  const championNode = document.getElementById(data);
  const targetNode = ev.target;
  if (!targetNode.classList.contains('poligon')) {
    console.log('no es un poligon');
  } else {
    console.log('Si es un poligon');
  }

  const DivAnterior = document.getElementById(championNode.id.split('-')[0]);

  /* Check if is comming from the Champion Board y si es cierto crea una copia y pega. */
  if (championNode.dataset.fromBoard === 'true') {
    var nodeCopy = championNode.cloneNode(true);
    nodeCopy.id = targetNode.id + '-' + data; /* We cannot use the same ID */
    nodeCopy.dataset.fromBoard = false;
    nodeCopy.addEventListener('dragstart', (ev) => {
      ev.dataTransfer.setData('text', ev.target.id);
    });

    targetNode.appendChild(nodeCopy);
  } else {
    /* si viene de la mismo builder lo traslada al nuevo div */
    //console.log("championNode.id.split('-')[0]", championNode.id.split('-')[0]);

    championNode.id = data.replace(DivAnterior.id, targetNode.id);
    targetNode.appendChild(document.getElementById(championNode.id));
    DivAnterior.style.backgroundColor = `var(--color-hex-default)`;
    DivAnterior.textContent = '';
    DivAnterior.nextElementSibling.remove();
  }
  targetNode.style.background = `var(--color-cost-${championNode.dataset.cost})`;

  showChampName({
    champName: championNode.dataset.name,
    targetNode: targetNode,
  });

  showTraits({
    champApiName: championNode.dataset.apiName,
    targetNode: targetNode,
    traits: championNode.dataset.traits,
  });

  counterTrait();

  //falta hacer swap de campeones

  // if (targetNode.textContent && DivAnterior.textContent) {
  //   const swap = DivAnterior.textContent;
  //   const swap2 = targetNode.textContent;
  //   targetNode.textContent = swap;
  //   DivAnterior.textContent = swap2;
  // }
}

/* Other functions */

const trait_1 = 'https://ap.tft.tools/img/general/trait_1.png';
const trait_2 = 'https://ap.tft.tools/img/general/trait_2.png';
const trait_3 = 'https://ap.tft.tools/img/general/trait_3.png';
const trait_4 = 'https://ap.tft.tools/img/general/trait_4.png';

function showTraits({ champApiName, traits, targetNode }) {
  console.log(traits);
  const traitsDiv = document.createElement('div');
  traits.split(',').forEach((element) => {
    const divBorderChampTrait = document.createElement('div');
    divBorderChampTrait.className = 'divBorderChampTrait';
    const traitChampImg = document.createElement('img');
    const borderTrait = document.createElement('img');
    traitChampImg.className = 'img-Trait';
    borderTrait.className = 'img-BorderTrait';
    const objTraits = traitsObj(element);
    traitChampImg.src =
      urlDdragon +
      objTraits.icon
        .toLocaleLowerCase()
        .replace('.dds', '.png')
        .replace('.tex', '.png');
    borderTrait.src = trait_1;

    //console.log("Traits OBJ",traitsObj(element));
    divBorderChampTrait.appendChild(borderTrait);
    divBorderChampTrait.appendChild(traitChampImg);
    traitsDiv.appendChild(divBorderChampTrait);
    TRAITS[element] = { ...objTraits, counter: (TRAITS[element] || 0) + 1 };
  });
  traitsDiv.className = 'div-Trait';
  targetNode.parentNode.appendChild(traitsDiv);

  return;
}

function counterTrait() {
  console.log(TRAITS);
}

function showChampName({ champName, targetNode }) {
  const p = document.createElement('p');
  p.className = 'champions-name';
  p.innerHTML = champName;
  targetNode.appendChild(p);
}
