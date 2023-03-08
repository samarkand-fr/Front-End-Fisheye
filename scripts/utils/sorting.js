// import statements
import { displayMedia, initMedias  } from '../pages/photographer.js';
import { addListeners } from './helpers.js';

// Selectors
const selectLabel = document.querySelector('.select-menu__selected-item');
const selectArrow = document.querySelector('.select-menu__arrow');
const selectItems = document.querySelector('.select-items');
const selectOptions = selectItems.querySelectorAll('li');

let media;

// fetching the media data and making it available to other functions in the module.
initMedias().then((medias) => {
    media = medias;
    // Event listeners set up  for the dropdown menu.
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


// This function is called when the user clicks on the dropdown menu label. 
// It toggles the aria-expanded attribute of the label,
//  toggles the chevron icon, toggles the select-hide class of the dropdown menu, 
// and focuses the first option in the menu.
async function handleSelectLabelClick() {
    selectLabel.setAttribute('aria-expanded', (selectLabel.getAttribute('aria-expanded') === 'false') ? 'true' : 'false');
    toggleChevron();
    toggleSelectHide();
    focusFirstOption();
}
// This function is called when the user clicks on one of the options in the dropdown menu.
//  It gets the ID attribute of the clicked option, 
// and passes it to the handleSelection function.
function handleOptionClick() {
    const selectedType = this.getAttribute('id');
    handleSelection(selectedType);
}

//This function is called when the user presses a key
//while the dropdown menu is open. 
// It checks which key was pressed (ArrowUp, ArrowDown, or Enter),
// and performs the appropriate action (move focus to the previous or next option, 
// or select the currently focused option).
function handleKeyDown(event) {
    const key = event.code;
    // (document.activeElement)= property returns the currently focused element within the document.
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

// ---------helper functions-----------

// Function to toggle chevron icon
function toggleChevron() {
    selectArrow.classList.toggle('fa-chevron-down');
    selectArrow.classList.toggle('fa-chevron-up');
}

// Function to toggle the select-hide class of the dropdown menu
function toggleSelectHide() {
    selectItems.classList.toggle('select-hide');
}

// Function to focus first option in the menu
function focusFirstOption() {
    selectOptions[0].focus();
}
//--------------------------------------

// This function is called when the user selects an option in the dropdown menu. 
// It sets the label text to the selected option, closes the dropdown menu, 
// and sorts the media array based on the selected criteria using the sortingMedia function. 
// It then calls the displayMedia function with the sorted array as its argument.
function handleSelection(selectedType) {
    selectLabel.textContent = selectedType;
    selectLabel.setAttribute('aria-expanded', 'false');
    selectArrow.classList.remove('fa-chevron-up');
    selectArrow.classList.add('fa-chevron-down');
    selectItems.classList.add('select-hide');
    const sortedMedia = sortingMedia(media, selectedType);
    displayMedia(sortedMedia);
}

// This function takes an array of media objects and a sorting criteria as its arguments,
//  and returns a sorted copy of the array based on the sorting criteria
function sortingMedia(media, type) {
    switch (type) {
    case 'popularity':
        return media.sort((a, b) => b.likes - a.likes);
    case 'date':
        return media.sort((a, b) => new Date(b.date) - new Date(a.date));
    case 'title':
        return media.sort((a, b) => a.title.localeCompare(b.title));// method in Js used to compare two strings 
    default:
        return media;
    }
}
