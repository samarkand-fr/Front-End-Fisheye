
//  function to create element tag and accepts an array of  attributes object   
export function createtagElement(tag, attributes = []) {
      const element = document.createElement(tag);
      attributes.forEach(attribute => {
        element.setAttribute(attribute.name, attribute.value);
      });
      return element;
    }


// function to create element 
// The element parameter specifies the type of element to create
  export function createHeadingElement(element,content) {
    const tag = document.createElement(element);
          tag.textContent = content;
    return tag;
  }

  // addListeners() is a helper function 
  // takes an element and an object of event listeners as arguments,
  //  and loops over the object
  //  to add each listener to the element using addEventListener.
  // ** avoid code duplication if multiple event listeners need to be added to the same element.

  export function addListeners(element, events) {
    for (let event in events) {
      element.addEventListener(event, events[event]);
    }
  }
 
