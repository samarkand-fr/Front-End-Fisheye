// Import statements
import { createtagElement } from '../utils/helpers.js';

// constants
const CONTROLS = 'controls';
const TITLE = 'title';

export const lightboxCard = (media) => {
    const { video, image, title, id, photographerId } = media;
    const sourcePath = `assets/medias/${photographerId}/`;

    // displaying a video player on a webpage with an associated title. 
    // If the user's browser does not support HTML5 video,
    // the text "Votre navigateur ne supporte pas la lecture de vidéos." will be displayed.
    if (video) {
        const videoSource = `${sourcePath}${video}`;
        const videoElement = createtagElement('video', [
            { name: CONTROLS, value: CONTROLS},
            { name: 'id', value: id },
            { name: 'tabindex', value: '0' },
            { name: TITLE, value: `Vidéo de ${title}` }
        ]);
        const sourceElement = createtagElement('source', [
            { name: 'src', value: videoSource },
            { name: 'type', value: 'video/mp4' }
        ]);
        videoElement.appendChild(sourceElement);
        videoElement.innerHTML += 'Votre navigateur ne supporte pas la lecture de vidéos.';
        return `
      ${videoElement.outerHTML}
      <h3 tabindex="0">${title}</h3>
    `;
    } else {
        const imageSource = `${sourcePath}${image}`;
        const imgElement = createtagElement('img', [
            { name: 'src', value: imageSource },
            { name: 'alt', value: `Photo de ${title}` },
            { name: TITLE, value: `Photo de ${title}` },
            { name: 'id', value: id },
            { name: 'tabindex', value: '0' }
        ]);
        return `
      ${imgElement.outerHTML}
      <h3 tabindex="0">${title}</h3>
    `;
    }
};

// creating the slides for lightbox
export const createLightboxSlides = (data) => {

    const getCardLightboxSlides = () => {
        const mediaElement = lightboxCard(data);
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('slides');
        slideDiv.innerHTML = mediaElement;

        const titleElement = slideDiv.querySelector('h3');
        titleElement.tabIndex = 0;

        return slideDiv.outerHTML;

    };
    return {getCardLightboxSlides};
};