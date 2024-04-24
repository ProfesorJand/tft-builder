// import aumentos from './AumentosSet11Latino.json'  with { type: 'json' };
// import meta from "../meta.json" with {type:"json"};

var meta = [];
var aumentos = [];

const xmlMeta = new XMLHttpRequest();
xmlMeta.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    meta = JSON.parse(this.responseText);
  }
};
xmlMeta.open('get', '../meta.json', false);
xmlMeta.send();

const xmlAumentos = new XMLHttpRequest();
xmlAumentos.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    aumentos = JSON.parse(this.responseText);
  }
};
xmlAumentos.open('get', './AumentosSet11Latino.json', false);
xmlAumentos.send();

const selectTier = document.getElementById('selectTier');
selectTier.addEventListener('change', (e) => {
  const value = e.target.value;
  const Tier = document.getElementById('Tier');
  Tier.innerHTML = value;
});

const FormImgTitular = document.getElementById('FormImgTitular');
FormImgTitular.addEventListener('change', (e) => {
  const value = e.target.value;
  const ImgTitular = document.getElementById('ImgTitular');
  ImgTitular.src = value;
});

const FormTituloComp = document.getElementById('FormTituloComp');
FormTituloComp.addEventListener('change', (e) => {
  const value = e.target.value;
  const TituloComp = document.getElementById('TituloComp');
  TituloComp.innerHTML = value;
});

const FormSinergias = document.getElementById('FormSinergias');
FormSinergias.addEventListener('change', (e) => {
  const value = e.target.value;
  const Sinergias = document.getElementById('Sinergias');
  Sinergias.innerHTML = value;
});

const FormImgComp = document.getElementById('FormImgComp');
FormImgComp.addEventListener('change', (e) => {
  const value = e.target.value;
  const ImgComp = document.getElementById('ImgComp');
  ImgComp.src = value;
});

const btnAgregarPestañas = document.getElementById('btnPestañas');
btnAgregarPestañas.addEventListener('click', () => {
  const selectOption = document.getElementById('selectOption');
  const ulPestañas = document.getElementById('ulPestañas');
  const FormPestañaInfo = document.getElementById('FormPestañaInfo');
  if (selectOption.value === 'Consejos' || selectOption.value === 'Tips') {
    const liTitulo = document.createElement('li');
    liTitulo.innerHTML = selectOption.value;
    const liInfo = document.createElement('li');
    liInfo.innerHTML = FormPestañaInfo.value;
    ulPestañas.appendChild(liTitulo);
    ulPestañas.appendChild(liInfo);
  }
});

const selectAumento = document.getElementById('selectAumentos');
aumentos.forEach((aumento) => {
  const option = document.createElement('option');
  option.value = aumento.apiName;
  option.text = aumento.name;
  selectAumento.appendChild(option);
});

let arrayAumentos = [];
function addAumentos(array) {
  const DivPestañasAumento = document.getElementById('DivPestañasAumento');
  console.log(array);
  if (typeof array !== 'undefined' && array.length > 0) {
    DivPestañasAumento.innerHTML = '';
    arrayAumentos = array;
    array.forEach((aum, i) => {
      const btn = document.createElement('input');
      btn.value = aum;
      DivPestañasAumento.appendChild(btn);
      btn.addEventListener('click', (e) => {
        const index = arrayAumentos.indexOf(btn.value);
        if (index > -1) {
          arrayAumentos.splice(index, 1);
          btn.remove();
          console.log('aumentos', arrayAumentos);
        }
      });
    });
  } else {
    const btn = document.createElement('input');
    const selectAumento = document.getElementById('selectAumento');
    btn.value = selectAumento.value;
    arrayAumentos.push(selectAumento.value);
    console.log('btnAumentos', arrayAumentos);
    DivPestañasAumento.appendChild(btn);
    selectAumento.value = '';
    btn.addEventListener('click', (e) => {
      const index = arrayAumentos.indexOf(btn.value);
      if (index > -1) {
        arrayAumentos.splice(index, 1);
        btn.remove();
        console.log('aumentos', arrayAumentos);
      }
    });
  }
}
const btnAumentos = document.getElementById('btnAumentos');
btnAumentos.addEventListener('click', () => {
  addAumentos();
});

const formCrearComp = document.getElementById('formCrearComp');
formCrearComp.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = 'https://backend-profesorjand.onrender.com/tft/meta';
  //const url = "http://localhost:3001/tft/meta";
  const newComp = {};
  newComp['titulo'] = FormTituloComp.value;
  newComp['imgTitular'] = FormImgTitular.value;
  newComp['composicion'] = FormImgComp.value;
  newComp['sinergias'] = FormSinergias.value;
  newComp['pestañas'] = {};
  newComp['pestañas']['Aumentos'] = arrayAumentos;

  //newComp['pestañas']['Tips'] = '';
  //newComp['pestañas']['Consejos'] = '';
  //crear formulario de gameplay
  //newComp['pestañas']['Gameplay'] = '';
  //revisar esto por cada compo que haya en pestañas
  //newComp['pestañas']['Composiciones_${Variable}'] = '';
  console.log(newComp);
  const Tier = selectTier.value;
  fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newComp, Tier }),
  }).then((e) => console.log(e));
  arrayAumentos = [];
});

const crearNuevaCompBtn = document.getElementById('crearNuevaCompBtn');
crearNuevaCompBtn.addEventListener('click', (e) => {
  selectComp.disabled = true;
  crearNuevaCompBtn.classList.add('btnSelected');
  modificarCompBtn.classList.remove('btnSelected');
});
const modificarCompBtn = document.getElementById('modificarCompBtn');
modificarCompBtn.addEventListener('click', (e) => {
  selectComp.disabled = false;
  modificarCompBtn.classList.add('btnSelected');
  crearNuevaCompBtn.classList.remove('btnSelected');
});

const selectComp = document.getElementById('selectComp');
const selectComps = document.getElementById('selectComps');
console.log(meta);
for (const value in meta) {
  console.log(meta[value]);
  meta[value].forEach((comp) => {
    const option = document.createElement('option');
    option.value = comp.titulo;
    option.text = value;
    selectComps.appendChild(option);
  });
}

const formConsejos = document.getElementById('formConsejos');
const formTips = document.getElementById('formTips');

selectComp.addEventListener('change', (e) => {
  const titulo = e.target.value;
  const tier = selectComps.querySelector(`option[value="${titulo}"]`).text;
  const [comp] = meta[tier].filter((comp) => {
    return comp.titulo === titulo;
  });
  console.log(comp);
  var event = new Event('change', { bubbles: true, cancelable: false });
  selectTier.value = tier;
  selectTier.dispatchEvent(event);
  FormTituloComp.value = comp.titulo;
  FormTituloComp.dispatchEvent(event); // event will buble up to window
  FormImgTitular.value = comp.imgTitular;
  FormImgTitular.dispatchEvent(event);
  FormImgComp.value = comp.composicion;
  FormImgComp.dispatchEvent(event);
  FormSinergias.value = comp.sinergias;
  FormSinergias.dispatchEvent(event);
  console.log(comp.pestañas);
  if (comp.pestañas['Aumentos']) {
    addAumentos(comp.pestañas['Aumentos']);
  }
  if (comp.pestañas.Consejos) {
    let text = '';
    comp.pestañas.Consejos.forEach((v) => {
      text += v + '<br/>';
    });
    formConsejos.value = text;
    formConsejos.dispatchEvent('change');
  }
  if (comp.pestañas.Tips) {
    let text = '';
    comp.pestañas.Tips.forEach((v) => {
      text += v + '<br/>';
    });
    formTips.value = text;
    formTips.dispatchEvent('change');
  }
});
