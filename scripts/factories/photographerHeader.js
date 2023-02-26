
export function getCardHeader(photographer) {
    const { name, portrait, city, country, tagline } = photographer;
    const pictureSrc = `assets/photographers/${portrait}`;

  const getUserCardDOM= ()=>{
    const article = document.createElement('article');
    article.setAttribute('tabindex', '2');
  
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');
  
    const nameHeader = document.createElement('h1');
    nameHeader.textContent = name;
  
    const locationHeader = document.createElement('h2');
    locationHeader.textContent = `${city}, ${country}`;
  
    const taglineParagraph = document.createElement('p');
    taglineParagraph.textContent = tagline;
  
    const pictureImg = document.createElement('img');
    pictureImg.setAttribute('src', pictureSrc);
    pictureImg.setAttribute('alt', name);
  
    infoDiv.appendChild(nameHeader);
    infoDiv.appendChild(locationHeader);
    infoDiv.appendChild(taglineParagraph);
  
    article.appendChild(infoDiv);
    article.appendChild(pictureImg);
  
    return article;
  }

  return {getUserCardDOM};
  }
  