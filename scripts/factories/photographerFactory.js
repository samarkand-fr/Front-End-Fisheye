import {createtagElement,createHeadingElement} from '../utils/helpers.js';

//  Function  that creates  card of photographers "home page"
export function getCard(photographer) {
    const { name, id, portrait, city, country, tagline, price } = photographer;
    const picture = `assets/photographers/${portrait}`;
  
    function getUserCardDOM() {
    
        const article = document.createElement('article');
        // adding link to phographer card
        const link = document.createElement('a');
        link.href = `photographer.html?${id}`;
        article.appendChild(link);
    
        const image = createtagElement('img',[
            { name: 'src', value: picture },
            { name: 'alt', value: `picture ${name}` },
            { name: 'title', value:'picture de photographer' },
            { name: 'id', value: id },
            { name: 'loading', value: 'lazy' },
        ]);
        link.appendChild(image);
    
        const heading = createHeadingElement('h2',name);
        link.appendChild(heading);
    
        const info = document.createElement('div');
        info.classList.add('info');
        info.tabIndex = 0;
        article.appendChild(info);
    
        const location = createHeadingElement('h3',`${city}, ${country}`);
        info.appendChild(location);
    
        const tag = createHeadingElement('p',tagline);
        info.appendChild(tag);
    
        const cost = createHeadingElement('span',`${price}€/jour`);
        info.appendChild(cost);
    
        return article;
    }
  
    return { name, picture, getUserCardDOM };
}
  