var tooltip = document.querySelectorAll('.AumentosSet10');
var tooltipLeyendaAumento = document.querySelectorAll('.LeyendaAumentosSet9_5');
export async function datosSet11() {
  try {
    const url = 'https://guiadeparche.com/tftdata/Set11/datosSet11Latino.json';
    const datos = await fetch(url);
    const response = await datos.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log('Error en Fetching de AumentosSet11');
  }
}

async function crearTooltipAumentos() {
  const aumentos = await datosSet11().then((x) => x.objetos);

  tooltip.forEach((elem) => {
    const idAumento = elem.dataset.aumento;
    const datosAumento = aumentos.find((e) => {
      return e.apiName === idAumento;
    });
    console.log(datosAumento);

    const container = document.createElement('div');
    const titulo = document.createElement('h2');
    const imagen = document.createElement('img');
    imagen.src =
      datosAumento?.icon ||
      'https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/augments/hexcore/pandoras-bench-i.png';
    imagen.alt = 'Imagen de Aumento ' + (datosAumento?.nombre || 'ninguno');
    titulo.innerHTML = datosAumento?.name || 'ninguno';
    const descripcion = document.createElement('p');
    console.log(datosAumento?.desc);
    descripcion.innerHTML = datosAumento?.desc || 'sin descripcion';
    container.appendChild(titulo);
    container.appendChild(descripcion);
    elem.appendChild(imagen);
    elem.appendChild(container);
    titulo.className = 'tiptextTitulo';
    container.className = 'tiptext';
  });

  tooltipLeyendaAumento.forEach((elem) => {
    const idAumento = elem.dataset.aumento;
    const datosAumento = aumentos.filter((dato) =>
      JSON.parse(idAumento).find((e) => dato.apiName === e)
    );
    const bigContainer = document.createElement('div');
    datosAumento.forEach((datoAumento) => {
      const container = document.createElement('div');
      const titulo = document.createElement('h2');
      const imagen = document.createElement('img');
      const descripcion = document.createElement('p');
      imagen.src =
        datoAumento?.icon ||
        'https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/augments/hexcore/pandoras-bench-i.png';
      imagen.alt = 'Imagen de Aumento ' + (datoAumento?.nombre || 'ninguno');
      titulo.innerHTML = datoAumento?.nombre || 'ninguno';
      descripcion.innerHTML = datoAumento?.descripcion || 'sin descripcion';
      container.appendChild(imagen);
      container.appendChild(titulo);
      container.appendChild(descripcion);
      container.className = 'AumentoTooltip';
      titulo.className = 'tiptextTitulo';
      bigContainer.appendChild(container);
    });

    bigContainer.className = 'tiptext LeyendasAumentosAgrupados';
    elem.appendChild(bigContainer);
  });
}
crearTooltipAumentos();
