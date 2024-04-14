import aumentos from './AumentosSet11Latino.json'  with { type: 'json' };
import meta from "../meta.json" with {type:"json"};
import {changeMetaJson} from "./changeMetaJson.js"

const selectTier = document.getElementById("selectTier");
selectTier.addEventListener("change", (e)=>{
  const value = e.target.value;
  const Tier = document.getElementById("Tier");
  Tier.innerHTML = value;
})

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
  const option = document.createElement("option");
  option.value = aumento.apiName;
  option.text = aumento.name;
  selectAumento.appendChild(option)
});

let arrayAumentos = [];
const btnAumentos = document.getElementById("btnAumentos");
btnAumentos.addEventListener("click",()=>{
  const selectAumento = document.getElementById("selectAumento");
  const DivPestañasAumento = document.getElementById("DivPestañasAumento");
  const btn = document.createElement("input");
  btn.value = selectAumento.value;
  arrayAumentos.push(selectAumento.value);
  DivPestañasAumento.appendChild(btn);
  console.log("btnAumentos",arrayAumentos);
  selectAumento.value= "";
  btn.addEventListener("click",(e)=>{
    const index = arrayAumentos.indexOf(btn.value);
    if(index > -1 ){
      arrayAumentos.splice(index,1);
      btn.remove();
      console.log("aumentos",arrayAumentos);
    }
  })
})

const formCrearComp = document.getElementById("formCrearComp");
formCrearComp.addEventListener("submit",(e)=>{
  e.preventDefault();
  const nuevaComp = {};
  nuevaComp["titulo"] = FormTituloComp.value;
  nuevaComp["imgTitular"] = "";
  nuevaComp["composicion"] = "";
  nuevaComp["pestañas"] = {};
  nuevaComp["pestañas"]["Aumentos"] = arrayAumentos;
  nuevaComp["pestañas"]["Tips"] = "";
  nuevaComp["pestañas"]["Consejos"] = "";
  //crear formulario de gameplay
  nuevaComp["pestañas"]["Gameplay"] = "";
  //revisar esto por cada compo que haya en pestañas
  nuevaComp["pestañas"]["Composiciones_${Variable}"] = "";
  const Tier = selectTier.value;
  meta[Tier].push(nuevaComp)
  changeMetaJson(nuevaComp);

  //final
  arrayAumentos = [];
})