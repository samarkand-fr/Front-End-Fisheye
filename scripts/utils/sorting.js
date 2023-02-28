import { displayMedia} from '../pages/photographer.js';
 
export const menuSelect = document.querySelector('.menuSelect');

const selectLabel = document.querySelector('.select_expandLabel');
      selectLabel.addEventListener('click', () => {
      selectLabel.classList.toggle('expanded');
  });

// select a type of media inorder to sort it by calling function sortingMedia
export function selectMedia(media) {
    const selectedType = menuSelect.querySelector('input:checked').value;
    const sortedMedia = sortingMedia(media, selectedType);
       displayMedia(sortedMedia);
    }

//   function to  sort the media(an array of objects)
// callback  function  determine the order in which the elements are sorted
export function sortingMedia(media, type) {
    console.log(type);
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





    