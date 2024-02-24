async function showChampions(){
    const championsContainer = document.getElementById("championsContainer");
    console.log(championsContainer);
    console.log("hola")
    const version = "14.3";
    const urlDdragon= `https://raw.communitydragon.org/${version}/game/`;
    const url="https://backend-profesorjand.onrender.com/tft/champions";
    try{
        const champions = await fetch(url).then(resp=>resp.json()).then(data=>{
            data.forEach(element => {
                const imagenElem = document.createElement("img");
                const src = urlDdragon + element.tileIcon.replace(".dds",".png").replace("tex","png").toLowerCase();
                imagenElem.src=src;
                imagenElem.alt="champion "+ element.name;
                imagenElem.className = "img-champions";
                imagenElem.id = "champion-"+ element.name.replace(" ","-");
                imagenElem.draggable=true 
                imagenElem.addEventListener("dragstart",(ev)=>{
                    console.log(ev.target.id)
                    ev.dataTransfer.setData("text", ev.target.id);
                });
                championsContainer.appendChild(imagenElem);
            });
        console.log(champions);
        }).catch(err=>console.log(err));
    }catch(err){console.log(err)};
    
    //console.alert(championsContainer)
}