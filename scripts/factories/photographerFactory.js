//  Function  that creates  cards of photographers "home page"
export function getCard(photographer) {
    const { name, id, portrait, city, country, tagline, price } = photographer;
    const picture = `assets/photographers/${portrait}`;
  
    function createImageElement() {
      const img = document.createElement('img');
      img.src = picture;
      img.alt = `picture ${name}`;
      img.title = ` picture de photographer`;
      return img;
    }
  
    function createHeadingElement() {
      const h2 = document.createElement('h2');
      h2.textContent = name;
      return h2;
    }
  
    function createInfoElement() {
      const div = document.createElement('div');
      div.className = 'info';
      div.tabIndex = 0;
  
      const h3 = document.createElement('h3');
      h3.textContent = `${city}, ${country}`;
      div.appendChild(h3);
  
      const p = document.createElement('p');
      p.textContent = tagline;
      div.appendChild(p);
  
      const span = document.createElement('span');
      span.textContent = `${price}€/jour`;
      div.appendChild(span);
  
      return div;
    }
  
    function getUserCardDOM() {
      const article = document.createElement('article');
  
      const a = document.createElement('a');
      a.href = `photographer.html?${id}`;
      article.appendChild(a);
  
      a.appendChild(createImageElement());
      a.appendChild(createHeadingElement());
      article.appendChild(createInfoElement());
  
      return article;
    }
  
    return { name, picture, getUserCardDOM };
  }
  