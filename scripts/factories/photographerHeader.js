// Import statements
import {createHeadingElement,createtagElement} from '../utils/helpers.js';

export function getCardHeader(photographer) {
    const { name, portrait, city, country, tagline } = photographer;
    const pictureSrc = `assets/photographers/${portrait}`;

    const getUserCardDOM= ()=>{

        const article = document.createElement('article');
        article.setAttribute('tabindex', '2');
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');
  
        const nameHeader = createHeadingElement('h1',name);
        const locationHeader = createHeadingElement('h2',`${city}, ${country}`);
        const taglineParagraph = createHeadingElement('p',tagline);
  
        const pictureImg  = createtagElement('img', [
            { name: 'src', value: pictureSrc},
            { name: 'alt', value: name },
            { name: 'loading', value: 'lazy' },
        ]);

        infoDiv.appendChild(nameHeader);
        infoDiv.appendChild(locationHeader);
        infoDiv.appendChild(taglineParagraph);
        
        article.appendChild(infoDiv);
        article.appendChild(pictureImg);
  
        return article;
    };
    return {getUserCardDOM};
}