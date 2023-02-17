 import {photographerFactory,getCardHeader ,mediaFactory } from "../factories/mediaFactory.js";
 import { getPhotographers,getMedias} from "../utils/api.js";


async function displayData(photographers) {
    const photographersSection = document.querySelector('.photograph-header');

       photographers.forEach((photographer) => {
        console.log(photographer);
        photographerFactory(photographer);
        const photographerModel = getCardHeader (photographer);
        photographersSection.appendChild(photographerModel);

    });
}
async function init() {
    const { photographers } = await getPhotographers();
    
    const idRequest = window.location.href.split('?')[1];
    const photographer = await photographers.filter(photographer => photographer.id == idRequest);
    
    displayData(photographer);
}
init();


async function displayMedia(medias) {
   
    const photographersSection = document.querySelector('.galleryPhotos');
    photographersSection.innerHTML='';
    
    let totalLikes = 0;
    
    medias.forEach((media) => {
    console.log(media);
        const photographerModel = mediaFactory(media);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
        
        totalLikes += media.likes;
        const  total_likes = document.querySelector('#total_likes');
        total_likes.innerHTML = totalLikes;

        
    });
    numberLikes();
}


async function initMedias() {
    const  medias  = await getMedias();
//    grab the id from the request url ex. http://127.0.0.1:5500/Front-End-Fisheye/photographer.html?82
    const idRequest = window.location.href.split('?')[1];
    const media =  await medias.filter(media => media.photographerId == idRequest);
   
console.log(idRequest);
    displayMedia(media);
console.log(media);
    menuSelect.onchange = function () {
        selectMedia(media);
    };
}
initMedias();


function numberLikes() {
    const likes = document.querySelectorAll('.like');
  
    function handleLikeClick(event) {
      const numberLike = event.currentTarget.parentElement.children[1];
  
      if (numberLike.classList.contains('liked')) {
        numberLike.textContent--;
        numberLike.classList.remove('liked');
        total_likes.textContent--;
      } else {
        numberLike.textContent++;
        numberLike.classList.add('liked');
        total_likes.textContent++;
      }
    }
  
    likes.forEach((like) => {
      like.addEventListener('click', handleLikeClick);
    });
  }


function selectMedia(media) {
const selectedType = menuSelect.value;
const sortedMedia = sortMedia(media, selectedType);
displayMedia(sortedMedia);
console.log(displayMedia(sortedMedia));
}



export const menuSelect = document.querySelector('.menuSelect');
const sorted = document.querySelector('#sorted');

sorted.addEventListener('click', () => {
sorted.classList.toggle('actived');
});

 function sortMedia(media, type) {
switch (type) {
case 'pop':
return media.sort((a, b) => b.likes - a.likes);
case 'date':
return media.sort((a, b) => new Date(b.date) - new Date(a.date));
case 'titre':
return media.sort((a, b) => a.title.localeCompare(b.title));
default:
return media;
}
}