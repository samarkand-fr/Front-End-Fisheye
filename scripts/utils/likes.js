export function numberLikes() {
    const likes = document.querySelectorAll('.like');
    const total_likes = document.querySelector('#total_likes');

    function handleLikeClick(event) {
        const numberLike = event.currentTarget.parentElement.children[1];
  
        if (numberLike.classList.contains('liked')) {
            numberLike.textContent--;
            numberLike.classList.remove('liked');
            total_likes.textContent--;
        } else {
            numberLike.textContent++;
            numberLike.classList.add('liked');
            total_likes.textContent++;
        }
    }
  
    likes.forEach((like) => {
        like.addEventListener('click', handleLikeClick);
    });
}