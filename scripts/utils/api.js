export async function getPhotographers() {
    return fetch('data/photographers.json' , {mode: 'cors'})
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((datas) => {
            // console.log(datas);
            return datas;
        }); 

}

// get data media
export async function getMedias() {
    return fetch ('data/photographers.json' , {mode: 'cors'})
        .then((res) => {
            return res.json();
        })
        .then((datas) => {
            return datas.media;
        }); 
}
