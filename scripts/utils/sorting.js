// import statements
import { displayMedia } from '../pages/photographer.js';
import { medias} from '../pages/photographer.js'; 

const selectLabel = document.querySelector('.select-menu__selected-item');
const selectArrow = document.querySelector('.select-menu__arrow');
const selectItems = document.querySelector('.select-items');
const selectOptions = selectItems.querySelectorAll('li');

selectLabel.addEventListener('click', () => {
  selectLabel.setAttribute('aria-expanded', (selectLabel.getAttribute('aria-expanded') === 'false') ? 'true' : 'false');
  selectArrow.classList.toggle('fa-chevron-down');
  selectArrow.classList.toggle('fa-chevron-up');
  selectItems.classList.toggle('select-hide');
});

selectLabel.addEventListener('keydown', (event) => {
  const key = event.code;
  const currentIndex = Array.from(selectOptions).indexOf(document.activeElement);
  const lastIndex = selectOptions.length - 1;
  let nextIndex;

  switch (key) {
    case 'ArrowDown':
      event.preventDefault();
      nextIndex = (currentIndex < lastIndex) ? currentIndex + 1 : 0;
      break;
    case 'ArrowUp':
      event.preventDefault();
      nextIndex = (currentIndex > 0) ? currentIndex - 1 : lastIndex;
      break;
    default:
      return;
  }

  selectOptions[nextIndex].focus();
});


selectOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const selectedText = option.textContent;
    selectLabel.textContent = selectedText;
    selectLabel.setAttribute('aria-expanded', 'false');
    selectArrow.classList.remove('fa-chevron-up');
    selectArrow.classList.add('fa-chevron-down');
    selectItems.classList.add('select-hide');
    const selectedType = option.getAttribute('id');
    const sortedMedia = sortingMedia(medias, selectedType);
    displayMedia(sortedMedia);
  });
});

export function selectMedia(media) {
  const sortedMedia = sortingMedia(media, selectItems);
  displayMedia(sortedMedia);
}

export function sortingMedia(media, type) {
  switch (type) {
    case 'popularity':
      return media.sort((a, b) => b.likes - a.likes);
    case 'date':
      return media.sort((a, b) => new Date(b.date) - new Date(a.date));
    case 'title':
      return media.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return media;
  }
}
