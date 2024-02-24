async function showChampions(){
    const url="https://backend-profesorjand.onrender.com/tft/champions"
    const champions = await fetch(url).then(resp=>resp.json()).then(data=>data);
    //const championsContainer = window.document.getElementById("championsContainer");
    console.log(champions)
    //console.alert(championsContainer)
}

showChampions();