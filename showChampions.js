async function showChampions(){
    const version = "14.3"
    const urlDdragon= `https://raw.communitydragon.org/${version}/game/`;
    const url="https://backend-profesorjand.onrender.com/tft/champions"
    const champions = await fetch(url).then(resp=>resp.json()).then(data=>data);
    const championsContainer = window.document.getElementById("championsContainer");
    console.log(champions)
    const divElem = document.createElement("div")
    const imagenElem = document.createElement("img")
    champions.forEach(element => {
        const src = urlDdragon + element.tileIcon.replace(".dds",".png").toLowerCase();
        imagenElem.src=src;
        divElem.appendChild(imagenElem);
        championsContainer.appendChild(divElem);
    });
    //console.alert(championsContainer)
}

showChampions();