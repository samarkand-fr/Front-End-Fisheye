// Import statements
import { getPhotographers, getMedias } from '../utils/api.js';
import { mediaFactory,photographerFactory } from '../factories/mediaFactory.js';
import   {getCardHeader}  from '../factories/photographerHeader.js';
import { openLightbox } from '../utils/lightbox.js';
import { numberLikes } from '../utils/likes.js';
import { } from "../utils/sorting.js";
import {} from "../utils/contactForm.js";

// displaying photographer's media
async function displayData(photographers) {
    const photographersSection = document.querySelector('.photograph-header');

    photographers.forEach((photographer) => {
        photographerFactory(photographer);
        const photographerModel = getCardHeader(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// photographer's data
async function init() {
    const { photographers } = await getPhotographers();
    
    const idRequest = window.location.href.split('?')[1];
    const photographer = await photographers.filter(photographer => photographer.id == idRequest);
    
    displayData(photographer);
}
init();

// function that displays media of a photographer 
export async function displayMedia(medias) {
    const photographersSection = document.querySelector('.galleryPhotos');
    photographersSection.innerHTML='';
    
    let totalLikes = 0;
    
    medias.forEach((media) => {
        // inserts the HTML code generated by userCardDOM into the photographersSection element. 
        // The insertAdjacentHTML method is used to insert the HTML code at a specific position
        //  in the element's hierarchy, in this case, right before the end of the element (beforeEnd).
        const photographerModel = mediaFactory(media);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.insertAdjacentHTML('beforeEnd', userCardDOM);

        totalLikes += media.likes;
        const  total_likes = document.querySelector('#total_likes');
        total_likes.innerHTML = totalLikes;
        // call the function openLightbox(parameters id=string and medias=array)
        const { id } = media;
        openLightbox(`${id}`, medias);
        
    });
    // call function numberLikes to update the likes of every photographer
    numberLikes();
}

let medias; // Declare the medias variable outside of the function inorder to export it to the sorting file

export async function initMedias() {
  medias = await getMedias();

  const idRequest = window.location.href.split('?')[1];
  const media = await medias.filter(media => media.photographerId == idRequest);
  displayMedia(media);

}

initMedias();

// Export the media array
export { medias };
