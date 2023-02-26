//  import {photographerFactory ,mediaFactory } from "../factories/mediaFactory.js";
//  import { getCardHeader } from "../factories/photographerHeader.js";
//  import { getPhotographers,getMedias} from "../utils/api.js";
//   import { openLightbox } from '../utils/lightbox.js';
// import { numberLikes } from '../utils/likes.js';
//  import { menuSelect, selectMedia } from '../utils/sorting.js';

// //  function that displays a visitcard of the photographer
// export async function displayData(photographers) {
//     const photographersSection = document.querySelector('.photograph-header');

//        photographers.forEach((photographer) => {
//         photographerFactory(photographer);
//         const photographerModel = getCardHeader (photographer);
//         photographersSection.appendChild(photographerModel);

//     });
// }
// async function init() {
//     const { photographers } = await getPhotographers();
//     const idRequest = window.location.href.split('?')[1];
//     const photographer = await photographers.filter(photographer => photographer.id == idRequest);
//     displayData(photographer);
// }
// init();

// // function that display media of a chosen photographer 
// export async function displayMedia(medias) {
   
//     const photographersSection = document.querySelector('.galleryPhotos');
//     photographersSection.innerHTML='';
    
//     let totalLikes = 0;
    
//     medias.forEach((media) => {
//         const photographerModel = mediaFactory(media);
//         const userCardDOM = photographerModel.createMediaCard ();
//         photographersSection.appendChild(userCardDOM);
        
//         totalLikes += media.likes;
//         const  total_likes = document.querySelector('#total_likes');
//         total_likes.innerHTML = totalLikes;

        
//         const { id } = media;
//         openLightbox(`${id}`, medias);
//     });
//     numberLikes();
// }


// async function initMedias() {
//     const  medias  = await getMedias();
// //    grab the id from the request url ex. http://127.0.0.1:5500/Front-End-Fisheye/photographer.html?82
//     const idRequest = window.location.href.split('?')[1];
//     const media =  await medias.filter(media => media.photographerId == idRequest);

//     displayMedia(media);
//     menuSelect.onchange = function () {
//         selectMedia(media);
//     };
// }
// initMedias();




import { getPhotographers, getMedias } from '../utils/api.js';
import { mediaFactory,photographerFactory } from '../factories/mediaFactory.js';
import   {getCardHeader}  from '../factories/photographerHeader.js';

import { openLightbox } from '../utils/lightbox.js';
import { numberLikes } from '../utils/likes.js';
 import { menuSelect, selectMedia } from '../utils/sorting.js';

/**
 * Function display data photographers
 * @param {*} photographers 
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector('.photograph-header');

    // photographers.forEach((photographer) => {
    //   photographerFactory(photographer);
    //     const userCardDomHeader = getCardHeader (photographer);
        
    //     photographersSection.insertAdjacentHTML('beforeEnd', userCardDomHeader);

    // });
    photographers.forEach((photographer) => {
        photographerFactory(photographer);
        const photographerModel = getCardHeader(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });

}

/**
 * Data photographers
 */
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

/**
 * Datas medias
*/
export async function initMedias() {
    const  medias  = await getMedias();
   
    const idRequest = window.location.href.split('?')[1];
    const media =  await medias.filter(media => media.photographerId == idRequest);
    displayMedia(media);

// addeventlisener to function menuselect to  track  all changes
    menuSelect.addEventListener('change', function () {
        selectMedia(media);
        console.log(menuSelect);
      });
  
}
initMedias();






