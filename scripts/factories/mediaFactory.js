// Import statements
import {createtagElement} from "../utils/createElements.js";

export function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  
  const picture = `assets/medias/${photographerId}/${image} `; 
  const videos = `assets/medias/${photographerId}/${video} `; 
 
  // Function photographer card 
  const getUserCardDOM = () => {
    const article = document.createElement('article');
  
    const mediaContainer = createtagElement('div',[
         { name: 'id', value: id },
         { name: 'tabindex', value: '0'},
       ]);
       article.appendChild(mediaContainer);
  
        if (video) {
          const playIcon = document.createElement('strong');
                playIcon.classList.add('far', 'fa-play-circle');
                mediaContainer.appendChild(playIcon);
          const videoElement = createtagElement('video', [
            { name: 'title', value: `video de ${title}` },
            { name: 'tabindex', value: '0' },
            { name: 'controls', value: 'controls' },
            { name: 'src', value: videos },
            { name: 'type', value: 'video/mp4' },
          ]);

    mediaContainer.appendChild(videoElement);
        } else {

          const imgElement = createtagElement('img', [
            { name: 'src', value: picture },
            { name: 'alt', value: `Photo de ${title}` },
            { name: 'title', value: `picture de ${title}` },
            { name: 'id', value: id }
          ]);

    mediaContainer.appendChild(imgElement);
    }
  // adding a like container 
    const titleLikesContainer = document.createElement('div');
          titleLikesContainer.classList.add('title-likes');
          article.appendChild(titleLikesContainer);
  
    const titleElement = document.createElement('h2');
          titleElement.setAttribute('tabindex', '0');
          titleElement.textContent = title;
          titleLikesContainer.appendChild(titleElement);
  
    const likesElement = document.createElement('span');
          likesElement.setAttribute('title', 'number of like picture');
          likesElement.textContent = likes;
          titleLikesContainer.appendChild(likesElement);
  
    const likeContainer = document.createElement('span');
          likeContainer.classList.add('like');

    titleLikesContainer.appendChild(likeContainer);
  
    const heartIcon = createtagElement('strong', [
          { name: 'tabindex', value:'0' },
          { name: 'aria-label', value: `${likes}like` },
          { name: 'aria-hidden', value: true },
        ]);
        heartIcon.classList.add('fas', 'fa-heart', 'heart-fas');
    likeContainer.appendChild(heartIcon);
  
    // the outerHTML property of the article element to get its HTML string representation, 
    // and return that instead of the article element itself.
    return article.outerHTML;
  };
 
  return { id, photographerId, title, image, video, likes, date, price, getUserCardDOM};
}


// // extra details of page photographer(footer tag/contact)
export function photographerFactory(data) {
  const { name, id, portrait, city, country, tagline, price } = data;

  const priceDay = document.querySelector('.price-day');
        priceDay.textContent = `${price} €/jour`;

  const contact = document.querySelector('.contact');
        contact.textContent = `Contactez-moi ${name}`;

  const formModal = document.querySelector('.modal');
        formModal.setAttribute('aria-label', `Contactez-moi, ${name}`);

  return { name, id, portrait, city, country, tagline, price };
}
