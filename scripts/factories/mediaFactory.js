//    header of the photographer's card    
export function getCardHeader(photographer) {
    const { name, portrait, city, country, tagline } = photographer;
    const picture = `assets/photographers/${portrait}`;
  
    const article = document.createElement('article');
    const div = article.appendChild(document.createElement('div'));
    div.className = 'info';
    div.tabIndex = 2;
    
    div.appendChild(document.createElement('h1')).textContent = name;
    div.appendChild(document.createElement('h2')).textContent = `${city}, ${country}`;
    div.appendChild(document.createElement('p')).textContent = tagline;
  
    const img = article.appendChild(document.createElement('img'));
    img.src = picture;
    img.alt = name;
  
    return article;
  }
  


// function that treats the media of each photographer 
export function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes} = data;
  
    const picture = `assets/medias/${photographerId}/${image}`;
    const videos = `assets/medias/${photographerId}/${video}`;
  
    // DOM elements
    const article = document.createElement('article');
    const div = document.createElement('div');
    div.tabIndex = 0;
    div.id = `media-${id}`;
    const titleLikes = document.createElement('div');
    titleLikes.className = 'title-likes';
    const h2 = document.createElement('h2');
    h2.textContent = title;
    h2.tabIndex = 0;
    const spanLikes = document.createElement('span');
    spanLikes.title = 'number of like picture';
    spanLikes.textContent = likes;
    const like = document.createElement('span');
    like.className = 'like';
    like.setAttribute('aria-label', `${likes}like`);
    const strong = document.createElement('strong');
    strong.className = 'fas fa-heart heart-fas';
    strong.setAttribute('aria-label', `${likes}like`);
    strong.setAttribute('aria-hidden', true);
    strong.tabIndex = 0;
  
    // build DOM tree based on media type
    if (video) {
      const videoEl = document.createElement('video');
      const source = document.createElement('source');
      source.src = videos;
      source.type = 'video/mp4';
      source.title = `video de ${title}`;
      source.tabIndex = 0;
      videoEl.appendChild(source);
      const playIcon = document.createElement('strong');
      playIcon.className = 'far fa-play-circle';
      div.appendChild(playIcon);
      div.appendChild(videoEl);
    } else {
      const img = document.createElement('img');
      img.src = picture;
      img.alt = `Photo de ${title}`;
      img.title = `picture de ${title}`;
      img.id = id;
      img.tabIndex = 0;
      div.appendChild(img);
    }
  
    // assemble the DOM tree
    like.appendChild(strong);
    titleLikes.appendChild(h2);
    titleLikes.appendChild(spanLikes);
    titleLikes.appendChild(like);
    article.appendChild(div);
    article.appendChild(titleLikes);
  
    const getUserCardDOM = () => article;
  
    return { getUserCardDOM, picture, videos };
  }
  

// extra details of page photographer
export function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;
    console.log(data);
  
    const priceDay = document.querySelector('.price-day');
    priceDay.textContent = `${price} €/jour`;
  
    const contact = document.querySelector('.contact');
    contact.textContent = `Contactez-moi ${name}`;
  
    const formModal = document.querySelector('.modal');
    formModal.setAttribute('aria-label', `Contactez-moi, ${name}`);
  
    return { name, id, portrait, city, country, tagline, price };
  }
  
    




    