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
  console.log('champNode', document.getElementById(data));
  const championNode = document.getElementById(data);
  const targetNode = ev.target;
  const DivAnterior = document.getElementById(championNode.id.split('-')[0]);
  console.log('targetNode', targetNode);

  /* Within a Mouse event you can even check the status of some Keyboard-Buttons
       such as CTRL, ALT, SHIFT. */
  if (championNode.dataset.fromBoard === 'true') {
    var nodeCopy = championNode.cloneNode(true);
    nodeCopy.id = targetNode.id + '-' + data; /* We cannot use the same ID */
    nodeCopy.dataset.fromBoard = false;
    nodeCopy.addEventListener('dragstart', (ev) => {
      console.log('drag(event)', ev.target.id);
      ev.dataTransfer.setData('text', ev.target.id);
    });

    targetNode.appendChild(nodeCopy);

    // targetNode.appendChild(
    //   showChampName({ champName: championNode.dataset.name, targetNode: targetNode})
    // );
  } else {
    //console.log("championNode.id.split('-')[0]", championNode.id.split('-')[0]);

    championNode.id = data.replace(DivAnterior.id, targetNode.id);
    console.log('idDivAnterior', DivAnterior.id);
    console.log('targetNode.id', targetNode.id);
    targetNode.appendChild(document.getElementById(championNode.id));
    DivAnterior.style.backgroundColor = `var(--color-hex-default)`;
  }

  targetNode.style.background = `var(--color-cost-${championNode.dataset.cost})`;

  showChampName({
    champName: championNode.dataset.name,
    targetNode: targetNode,
  });

  //falta hacer swap de campeones

  // if (targetNode.textContent && DivAnterior.textContent) {
  //   const swap = DivAnterior.textContent;
  //   const swap2 = targetNode.textContent;
  //   targetNode.textContent = swap;
  //   DivAnterior.textContent = swap2;
  // }
}

/* Other functions */

function showSinergy({ ev, championNode }) {
  const sinergy = document.createElement('div');
  championNode.dataset.sinergy.forEach((element) => {
    const divSinergyChamp = document.createElement('div');
    const sinergyChamp = document.createElement('img');
    console.log(element.sinergy);
  });
  ev.target.appendChild(sinergy);
  return;
}

function showChampName({ champName, targetNode }) {
  const p = document.createElement('p');
  p.className = 'champions-name';
  p.innerHTML = champName;
  targetNode.appendChild(p);
}
