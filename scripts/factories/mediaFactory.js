/**
 * Factory function (function data medias)
 */
export function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  
  const picture = `assets/medias/${photographerId}/${image} `; 
  const videos = `assets/medias/${photographerId}/${video} `; 

 
// Function photographer card 

  const getUserCardDOM = () => {
    const article = document.createElement('article');
  
    const mediaContainer = document.createElement('div');
    mediaContainer.setAttribute('tabindex', '0');
    mediaContainer.setAttribute('id', `${id}`);
    article.appendChild(mediaContainer);
  
    if (video) {
      const playIcon = document.createElement('strong');
      playIcon.classList.add('far', 'fa-play-circle');
      mediaContainer.appendChild(playIcon);
  
      const videoElem = document.createElement('video');
      const sourceElem = document.createElement('source');
      sourceElem.setAttribute('src', videos);
      sourceElem.setAttribute('type', 'video/mp4');
      sourceElem.setAttribute('title', `video de ${title}`);
      sourceElem.setAttribute('tabindex', '0');
      videoElem.appendChild(sourceElem);
      mediaContainer.appendChild(videoElem);
    } else {
      const imgElem = document.createElement('img');
      imgElem.setAttribute('src', picture);
      imgElem.setAttribute('alt', `Photo de ${title}`);
      imgElem.setAttribute('title', `picture de ${title}`);
      imgElem.setAttribute('id', id);
      mediaContainer.appendChild(imgElem);
    }
  
    const titleLikesContainer = document.createElement('div');
    titleLikesContainer.classList.add('title-likes');
    article.appendChild(titleLikesContainer);
  
    const titleElem = document.createElement('h2');
    titleElem.setAttribute('tabindex', '0');
    titleElem.textContent = title;
    titleLikesContainer.appendChild(titleElem);
  
    const likesElem = document.createElement('span');
    likesElem.setAttribute('title', 'number of like picture');
    likesElem.textContent = likes;
    titleLikesContainer.appendChild(likesElem);
  
    const likeContainer = document.createElement('span');
    likeContainer.classList.add('like');
    titleLikesContainer.appendChild(likeContainer);
  
    const heartIcon = document.createElement('strong');
    heartIcon.classList.add('fas', 'fa-heart', 'heart-fas');
    heartIcon.setAttribute('tabindex', '0');
    heartIcon.setAttribute('aria-label', `${likes}like`);
    heartIcon.setAttribute('aria-hidden', 'true');
    likeContainer.appendChild(heartIcon);
    // the outerHTML property of the article element to get its HTML string representation, 
    // and return that instead of the article element itself.
    return article.outerHTML;
  };
  
  const getUserCardLightbox = () => {
    const slideDiv = document.createElement("div");
    slideDiv.classList.add("slides");
  
    if (video) {
      const videoEl = document.createElement("video");
      videoEl.setAttribute('controls','controls');
      const sourceEl = document.createElement("source");
      sourceEl.src = videos;
      sourceEl.type = "video/mp4";
      sourceEl.title = `video de ${title}`;
      videoEl.appendChild(sourceEl);
      slideDiv.appendChild(videoEl);
    } else {
      const imgEl = document.createElement("img");
      imgEl.src = picture;
      imgEl.alt = `Photo de ${title}`;
      imgEl.tabIndex = 0;
      imgEl.title = `picture de ${title}`;
      imgEl.id = id;
      slideDiv.appendChild(imgEl);
    }
  
    const titleEl = document.createElement("h3");
    titleEl.textContent = title;
    titleEl.tabIndex = 0;
    slideDiv.appendChild(titleEl);
  console.log(slideDiv);
    return slideDiv.outerHTML;
  };
  
       
  return { id, photographerId, title, image, video, likes, date, price, getUserCardDOM, getUserCardLightbox };
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
