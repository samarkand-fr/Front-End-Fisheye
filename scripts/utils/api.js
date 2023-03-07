const url = 'data/photographers.json';
//  the await keyword to wait for the fetch method 
// to return a response before parsing the JSON data with the json() method.
// // get data photographer
export async function getPhotographers() {
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();
    return data;
}

// // get data media
export async function getMedias() {
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();
    return data.media;
}
