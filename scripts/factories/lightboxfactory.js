export const lightboxCard = (media) => {
    const { video, image, title, id, photographerId } = media;
    const sourcePath = `assets/medias/${photographerId}/`;

    // displaying a video player on a webpage with an associated title. 
    // If the user's browser does not support HTML5 video,
    // the text "Votre navigateur ne supporte pas la lecture de vidéos." will be displayed.
    if (video) {
      const videoSource = `${sourcePath}${video}`;
      return `
        <video controls id="${id}">
          <source src="${videoSource}" type="video/mp4" title="Vidéo de ${title}">
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        <h3 tabindex="0">${title}</h3>
      `;
    } else {
      const imageSource = `${sourcePath}${image}`;
      return `
        <img src="${imageSource}" alt="Photo de ${title}" title="Photo de ${title}" id="${id}" tabindex="0">
        <h3 tabindex="0">${title}</h3>
      `;
    }
  };
