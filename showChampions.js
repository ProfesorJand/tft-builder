async function showChampions(){
    const championsContainer = document.getElementById("championsContainer");
    console.log(championsContainer);
    console.log("hola")
    const version = "14.3"
    const urlDdragon= `https://raw.communitydragon.org/${version}/game/`;
    const url="https://backend-profesorjand.onrender.com/tft/champions";
    try{
        const champions = await fetch(url).then(resp=>resp.json()).then(data=>data).catch(err=>console.log(err));
    }catch(err){console.log(err)};
    console.log(champions)
    champions.forEach(element => {
        const imagenElem = document.createElement("img");
        const src = urlDdragon + element.tileIcon.replace(".dds",".png").toLowerCase();
        imagenElem.src=src;
        imagenElem.alt="champion "+ element.
        championsContainer.appendChild(imagenElem);
    });
    //console.alert(championsContainer)
}

showChampions();