// Import statements
import { navNext, navPrev, getNavLightbox } from './lightboxHelpers.js';
import { addListeners } from '../utils/helpers.js';
import { createLightboxSlides } from '../factories/lightboxfactory.js';

// DOM elements
const lightboxClose = document.querySelector('.lightbox_close');
const lightboxContainer = document.querySelector('.lightbox_container');
const lightbox = document.getElementById('contact_lightbox');

// Event listeners
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // If the user presses the Tab key, toggle focus between the next and previous buttons in the lightbox
            // Pressing Shift + Tab focus on the close button.
            const buttons = getNavLightbox();
            if (document.activeElement === buttons.nextButton) {
                buttons.prevButton.focus();
            } else if (document.activeElement === buttons.prevButton) {
                if (e.shiftKey) {
                    lightboxClose.focus();
                } else {
                    buttons.nextButton.focus();
                }
            } else {
                buttons.nextButton.focus();
            }
        }
    }
});



lightboxClose.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        // If the user presses the Tab key while focus is on the close button, focus on the next button instead
        const buttons = getNavLightbox();
        buttons.nextButton.focus();
    }
});

// The navigateLightbox function is called to set the initial state of the lightbox
function navigateLightbox(medias) {
    lightbox.style.display = 'block'; 
    const buttons = getNavLightbox();     
    if (buttons.nextButton && buttons.prevButton) {
        buttons.nextButton.addEventListener('click', () => { navNext(medias);});
        buttons.prevButton.addEventListener('click', () => { navPrev(medias);});
    }
    // When a key is pressed, the switch statement inside the callback function
    // determines whether the left or right arrow key was pressed, 
    // and sets the nav variable to either navPrev or navNext
    document.addEventListener('keydown', (e) => {
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
                // filterMedia variable is set to an array containing only the media items 
                // that have a photographerId matching the idRequest. 
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
                lightboxClose.addEventListener('click', () => {
                    closeLightbox();
                    // When the lightbox is closed, return focus to the element that opened it
                    component.focus();
                });
            },
            'keydown': (e) => {
                if (e.key === 'Enter') {
                    component.click();
                }
            }
        });
    }
}

// Close the lightbox
function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxContainer.innerHTML = '';
    
}