import {lightboxCard} from "../factories/lightboxfactory.js";

// getPosition()  Retrieves the position of the current image and return an integer 
export const getPosition = (medias) => {
    const currentId = document.querySelector('.slides > :first-child').id;
    
    let mediaSelected = 0;
        for (let i = 0; i < medias.length; i++) {
            if (`${currentId}` === `${medias[i].id}`) {
                mediaSelected = i;
                break;
            }
        }
        return mediaSelected ;
  };
  

  //   update to next media
export const navNext = (medias) => {
    let count = getPosition(medias);
    if (count < medias.length - 1) {
      count++;
    } else {
      // If we've reached the end of the medias list, do nothing
      return;
    }
    updateLightbox(lightboxCard(medias[count]));
  };
  
  //   update to previous media
export const navPrev = (medias) => {
    let count = getPosition(medias);
    if (count > 0) {
      count--;
    } else {
      // If we've reached the beginning of the medias list, do nothing
      return;
    }
    updateLightbox(lightboxCard(medias[count]));
  };
  
//   Update the lightbox DOM
const updateLightbox = (card) => {
    const lightbox = document.querySelector('.slides');
    lightbox.innerHTML = card;
  };

    
//getNavLightbox()  retrieves the next and previous buttons from the lightbox navigation 
 export const getNavLightbox = () => {
    const nextButton = document.getElementsByClassName('lightbox_next')[0];
    const prevButton = document.getElementsByClassName('lightbox_prev')[0];

    return { nextButton, prevButton };
};
