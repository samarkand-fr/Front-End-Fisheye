 import {getCard} from "../factories/photographerFactory.js";
 import { getPhotographers } from "../utils/api.js";
 

//  data photographers
async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');
    photographers.forEach((photographer) => {
        const photographerModel = getCard(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
        
}

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}
init();

