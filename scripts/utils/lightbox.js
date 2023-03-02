// Import statements
import { navNext, navPrev, getNavLightbox } from './lightboxHelpers.js';
import { addListeners } from "../utils/createElements.js"
import {createLightboxSlides} from "../factories/lightboxfactory.js";
// DOM elements
const lightboxClose = document.querySelector('.lightbox_close');
const lightboxContainer = document.querySelector('.lightbox_container');
const lightbox = document.getElementById('contact_lightbox');


// Event listeners
document.addEventListener('keydown', (e) => {
    if ((lightbox.style.display = 'none' && e.key === 'Escape')) {
        closeLightbox();
    }
});

// Lightbox navigation
function navigateLightbox(medias) {
    lightbox.style.display = 'block'; 
    const buttons = getNavLightbox();     
    if (buttons.nextButton && buttons.prevButton) {
        buttons.nextButton.addEventListener('click', () => { navNext(medias);});
        buttons.prevButton.addEventListener('click', () => { navPrev(medias);});
    }

    document.addEventListener('keydown', (e) =>{
        let nav;
        switch(e.key) {
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

// Open the lightbox
export function openLightbox(id, medias) {
    const component = document.getElementById(id);
    
    if (component) {
        addListeners(component, {
            // Add an anonymous arrow function as a parameter for addEventListener 
            'click': () => {
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
                // insert data in lightbox
                const photographerModel = createLightboxSlides(medias[mediaSelected]);
                const userCardLightbox = photographerModel.getCardLightboxSlides();
                lightboxContainer.insertAdjacentHTML('afterbegin', userCardLightbox);
                lightboxContainer.addEventListener('click', () => navigateLightbox(medias));
                navigateLightbox(medias);
                lightboxClose.addEventListener('click', closeLightbox);
            },
            'keydown': (e) => {
                if (e.key === 'Enter') {
                    component.click();
                }
            }
        });
    }
};

// Close the lightbox
function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxContainer.innerHTML = '';
    
}

