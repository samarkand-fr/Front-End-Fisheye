import {createImageElement,createHeadingElement, createHref,createdElementTag } from "../utils/createElements.js";

//  Function  that creates  cards of photographers "home page"
export function getCard(photographer) {
    const { name, id, portrait, city, country, tagline, price } = photographer;
    const picture = `assets/photographers/${portrait}`;
  
    function getUserCardDOM() {

      const article = document.createElement('article');
      const a = article.appendChild(createHref ('a',`photographer.html?${id}`));
      const div = createdElementTag('div','info',0);
      
      a.appendChild((createImageElement('img', picture,`picture ${name}`,` picture de photographer`)));
      a.appendChild(createHeadingElement('h2',name));
      div.appendChild(createHeadingElement('h3',`${city}, ${country}`));
      div.appendChild(createHeadingElement('p',tagline));
      div.appendChild(createHeadingElement('span',`${price}€/jour`));
      article.appendChild(div);
  
      return article;
    }
  
    return { name, picture, getUserCardDOM };
  }
  