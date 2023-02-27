import { displayMedia} from '../pages/photographer.js';
 
export const menuSelect = document.querySelector('.menuSelect');
const sorted = document.querySelector('#sorted');

    sorted.addEventListener('click', () => {
    console.log('sort');
 
});


export function selectMedia(media) {
    const selectedType = menuSelect.querySelector('input:checked').value;
    const sortedMedia = sortMedia(media, selectedType);
       displayMedia(sortedMedia);
    }

//   function to  sort the media(an array of objects)
// callback  function  determine the order in which the elements are sorted
export function sortMedia(media, type) {
    switch (type) {
    case 'pop':
    return media.sort((a, b) => b.likes - a.likes);
    case 'date':
    return media.sort((a, b) => new Date(b.date) - new Date(a.date));
    case 'titre':
    return media.sort((a, b) => a.title.localeCompare(b.title));//a method  to compare 2 strings(title)
    default:
    return media;
    }
    }





    