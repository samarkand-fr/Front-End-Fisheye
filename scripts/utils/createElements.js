
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

  // The "element" parameter is the DOM element to which the event listeners will be added.
  //  The "events" parameter is an object that contains 
  // the events to be added and their corresponding functions.

// The function then iterates through the "events" object using a for...in loop 
// and adds each event and its corresponding function to the "element" using the addEventListener method.
  export function addListeners(element, events) {
    for (let event in events) {
      element.addEventListener(event, events[event]);
    }
  }
 
