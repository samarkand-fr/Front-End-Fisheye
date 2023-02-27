import { mediaFactory } from '../factories/mediaFactory.js';
import { navNext, navPrev,getNavLightbox} from './lightboxHelpers.js';

const lightboxClose = document.querySelector('.lightbox_close');
const lightboxContainer = document.querySelector('.lightbox_container');
const lightbox = document.getElementById('contact_lightbox');



//   Add lightbox listeners when navigating in lightbox(click,keydown)
function navigateLightbox(medias) {
//  open lightbox
     lightbox.style.display = 'block'; 
     const buttons = getNavLightbox();     
    if (buttons.nextButton && buttons.prevButton) {
       
        buttons.nextButton.addEventListener('click', () => { navNext(medias);});
        buttons.prevButton.addEventListener('click', () => { navPrev(medias);});
    }

    document.addEventListener('keydown', (e) =>{
        let nav;
        
        switch(e.key)
        {
        case 'ArrowLeft' :
            nav =  (medias) => { navPrev(medias);};
            break; 
        case 'ArrowRight': 
            nav = (medias) => { navNext(medias);};
            break;
        }
        if (nav) {
            nav(medias);
        }
        
    });
}


//  * Open the lightbox
//  * First open the modal then insert the media
export function openLightbox(id, medias) {
    const component = document.getElementById(id);
    
    const displayLightBox = () => {        
        const idRequest = window.location.href.split('?')[1];
        const id = component.id;
        
        const filterMedia = medias.filter(media => `${media.photographerId}` === idRequest);
    
        let mediaSelected = 0;
        for (let i = 0; i < filterMedia.length; i++) {
            if (id === `${filterMedia[i].id}`) {
                mediaSelected = i;
                break;
            }
        }
        
        const photographerModel = mediaFactory(medias[mediaSelected]);
        const userCardLightbox = photographerModel.getUserCardLightbox();
        lightboxContainer.insertAdjacentHTML('afterbegin', userCardLightbox);
        lightboxContainer.addEventListener('click',navigateLightbox);
        
         navigateLightbox(medias);
         lightboxClose.addEventListener('click', closeLightbox);
    }; 

    // add the listeners 
    if (component) {
        component.addEventListener('click', displayLightBox);
        component.addEventListener('keydown', ((e) =>{ 
             if (e.key === 'Enter') {
            displayLightBox();
        };}));
    }


};

//   KeyboardEvent closeMlightbox
document.addEventListener('keydown', (e) => {
    if ((lightbox.style.display = 'none' && e.key === 'Escape')) {
        closeLightbox();
    }
});
  
function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxContainer.innerHTML = '';
}

