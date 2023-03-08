export function numberLikes() {
    const likes = document.querySelectorAll('.like');
    const total_likes = document.querySelector('#total_likes');

    function handleLikeClick(event) {
        // retrieves the second child element of the parent element of the clicked element,
        //  which is assumed to be the element that displays the number of likes 
        const numberLike = event.currentTarget.parentElement.children[1];
        // the user has already liked the post and now wants to undo their like.
        if (numberLike.classList.contains('liked')) {
            numberLike.textContent--;
            numberLike.classList.remove('liked');
            total_likes.textContent--;
        } else {
            // adds the 'liked' class to the button to indicate that it has been liked,
            //  and updates the total like count
            numberLike.textContent++;
            numberLike.classList.add('liked');
            total_likes.textContent++;
        }
    }
  
    likes.forEach((like) => {
        like.addEventListener('click', handleLikeClick);
    });
}