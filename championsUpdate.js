const fs = require("fs");
const version="14.3";

const url=`https://raw.communitydragon.org/${version}/cdragon/tft/es_ar.json`;
async function getChampionsUpdates(url){
    try {
       const data = await fetch(url).then(resp => resp.json()).then(data=>{
        fs.writeFile("champions.json",  JSON.stringify(data.sets["10"].champions), (err) => {
            if (err) {
                throw new Error('Something went wrong.')
            }
            console.log('JSON written to file. Contents:');
        });
       
        });
       
    } catch (error) {
        console.log(error)
    }

}

getChampionsUpdates(url)