import champions from './champions.json' assert { type: 'json' };
import traits from "./traits.json" assert {type: "json"};

export function traitsObj(traitName){
    return traits.find(o => o.name === traitName);
}

export function championsObj(apiName){
    return champions.find(o => o.apiName === apiName);
}

