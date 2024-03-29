import champions from './champions.json' assert { type: 'json' };
import { version, urlDdragon } from './communitydragon.js';

async function showChampions() {
  const championsContainer = document.getElementById('championsContainer');
  // console.log(championsContainer);
  // console.log('hola');

  const url = 'https://backend-profesorjand.onrender.com/tft/champions';
  try {
    // const champions = await fetch(url)
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     data
    champions.forEach((element) => {
      const { name, tileIcon, traits, apiName, cost, ability, squareIcon } =
        element;
      if (cost >= 1 && cost <= 5) {
        const imagenElem = document.createElement('img');
        const src =
          urlDdragon +
          (
            squareIcon
              .toLowerCase()
              .replace('splashes/', 'splashes/patching/')
              .replace('_mobile.', '_teamplanner_splash.')
              .replace('_square.', '_splash_tile_1_small.tft_set11.')
              .replace('.tft_set11', '') || tileIcon
          )
            .replace('.dds', '.png')
            .replace('tex', 'png');
        imagenElem.src = src;
        imagenElem.alt = 'champion ' + name;
        imagenElem.className = 'img-champions';
        imagenElem.id = apiName;
        imagenElem.dataset.name = name;
        imagenElem.dataset.traits = traits;
        imagenElem.dataset.cost = cost;
        imagenElem.dataset.ability = ability;
        imagenElem.dataset.fromBoard = true;
        imagenElem.draggable = true;

        imagenElem.addEventListener('dragstart', (ev) => {
          console.log(ev.target.id);
          ev.dataTransfer.setData('text', ev.target.id);
        });
        championsContainer.appendChild(imagenElem);
      }
    });
    console.log(data);
  } catch (err) {
    // )

    console.log(err);
  }

  //console.alert(championsContainer)
}

showChampions();
