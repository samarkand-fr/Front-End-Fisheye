// import statements
import { displayMedia, initMedias  } from '../pages/photographer.js';
import { addListeners } from './helpers.js';

// Selectors
const selectLabel = document.querySelector('.select-menu__selected-item');
const selectArrow = document.querySelector('.select-menu__arrow');
const selectItems = document.querySelector('.select-items');
const selectOptions = selectItems.querySelectorAll('li');

let media;

// Initialize medias and then sort them according to the selected type
initMedias().then((medias) => {
    media = medias;
    console.log(media);
      // Event listeners
      addListeners(selectLabel, {
        'click': handleSelectLabelClick
    });
    // the code loops over the selectOptions array using forEach, 
    // and adds a click event listener to each option element using addListeners:
    selectOptions.forEach((option) => {
        addListeners(option, {
            'click': handleOptionClick
        });
    });
    // the code adds a keydown event listener to selectItems
    addListeners(selectItems, {
        'keydown': handleKeyDown
    });
});


// Function to handle select label click
async function handleSelectLabelClick() {
    selectLabel.setAttribute('aria-expanded', (selectLabel.getAttribute('aria-expanded') === 'false') ? 'true' : 'false');
    toggleChevron();
    toggleSelectHide();
    focusFirstOption();
}
// Function to handle option click
function handleOptionClick() {
    const selectedType = this.getAttribute('id');
    handleSelection(selectedType);
}

// Function to handle arrow and enter key events
function handleKeyDown(event) {
    const key = event.code;
    const currentIndex = Array.from(selectOptions).indexOf(document.activeElement);
    const lastIndex = selectOptions.length - 1;
    let nextIndex;
    let selectedType ;

    switch (key) {
    case 'ArrowDown':
        event.preventDefault();
        nextIndex = (currentIndex < lastIndex) ? currentIndex + 1 : 0;
        // moves focus to the next item in the list.
        selectOptions[nextIndex].focus();
        break;
    case 'ArrowUp':
        event.preventDefault();
        nextIndex = (currentIndex > 0) ? currentIndex - 1 : lastIndex;
        // moves focus to the previous item in the list
        selectOptions[nextIndex].focus();
        break;
    case 'Enter':
        event.preventDefault();
        selectedType = selectOptions[currentIndex].getAttribute('id');
        handleSelection(selectedType);
        break;
    default:
        return;
    }
}

// Function to toggle chevron icon
function toggleChevron() {
    selectArrow.classList.toggle('fa-chevron-down');
    selectArrow.classList.toggle('fa-chevron-up');
}

// Function to toggle select-hide class
function toggleSelectHide() {
    selectItems.classList.toggle('select-hide');
}

// Function to focus first option
function focusFirstOption() {
    selectOptions[0].focus();
}

// Function to handle selection
function handleSelection(selectedType) {
    selectLabel.textContent = selectedType;
    selectLabel.setAttribute('aria-expanded', 'false');
    selectArrow.classList.remove('fa-chevron-up');
    selectArrow.classList.add('fa-chevron-down');
    selectItems.classList.add('select-hide');
    const sortedMedia = sortingMedia(media, selectedType);
    displayMedia(sortedMedia);
}

// Function to sort medias according to its type
function sortingMedia(media, type) {
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
