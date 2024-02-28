//import {traitsObj, championsObj} from "./hola.js";

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
  console.log('drag(event)', ev.target.id);
  ev.dataTransfer.setData('text', ev.target.id);
}

function dragendEvent(ev) {
  //On the Draggable Element:
  //The user has finished dragging an element
  ev.preventDefault();
  console.log('dragendEvent', ev.target);
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
  const DivAnterior = document.getElementById(championNode.id.split('-')[0]);
  console.log('champNode', document.getElementById(data));
  console.log('targetNode', targetNode);

  /* Check if is comming from the Champion Board y si es cierto crea una copia y pega. */
  if (championNode.dataset.fromBoard === 'true') {
    var nodeCopy = championNode.cloneNode(true);
    nodeCopy.id = targetNode.id + '-' + data; /* We cannot use the same ID */
    nodeCopy.dataset.fromBoard = false;
    nodeCopy.addEventListener('dragstart', (ev) => {
      console.log('drag(event)', ev.target.id);
      ev.dataTransfer.setData('text', ev.target.id);
    });

    targetNode.appendChild(nodeCopy);
  }
  /* si viene de la mismo builder lo traslada al nuevo div */ 
  else {
    //console.log("championNode.id.split('-')[0]", championNode.id.split('-')[0]);

    championNode.id = data.replace(DivAnterior.id, targetNode.id);
    console.log('idDivAnterior', DivAnterior.id);
    console.log('targetNode.id', targetNode.id);
    targetNode.appendChild(document.getElementById(championNode.id));
    DivAnterior.style.backgroundColor = `var(--color-hex-default)`;
    DivAnterior.textContent = "";
  }
  targetNode.style.background = `var(--color-cost-${championNode.dataset.cost})`;


  showChampName({
    champName: championNode.dataset.name,
    targetNode: targetNode,
  });

  showTraits({champApiName:championNode.dataset.apiName , targetNode:targetNode, traits:championNode.dataset.traits})

  //falta hacer swap de campeones

  // if (targetNode.textContent && DivAnterior.textContent) {
  //   const swap = DivAnterior.textContent;
  //   const swap2 = targetNode.textContent;
  //   targetNode.textContent = swap;
  //   DivAnterior.textContent = swap2;
  // }
}

/* Other functions */

function showTraits({ champApiName, traits, targetNode }) {
  console.log(traits)
  const traitsDiv = document.createElement('div');
  traits.split(",").forEach((element) => {
    const divTraitChamp = document.createElement('div');
    const traitChamp = document.createElement('img');
    traitChamp.className = "img-Trait";
    divTraitChamp.className = "div-Trait";
    //console.log("Traits OBJ",traitsObj(element));
    divTraitChamp.appendChild(traitChamp);
    traitsDiv.appendChild(divTraitChamp)
    console.log(element);
  });
  targetNode.appendChild(traitsDiv);

  return;
}

function showChampName({ champName, targetNode }) {
  const p = document.createElement('p');
  p.className = 'champions-name';
  p.innerHTML = champName;
  targetNode.appendChild(p);
}
