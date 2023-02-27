
//  function to create element tag and accepts an array of  attributes object   
export function createtagElement(tag, attributes = []) {
      const img = document.createElement(tag);
      attributes.forEach(attribute => {
        img.setAttribute(attribute.name, attribute.value);
      });
      return img;
    }


// function to create element 
  export function createHeadingElement(element,content) {
    const tag = document.createElement(element);
          tag.textContent = content;
    return tag;
  }

  

 
