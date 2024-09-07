function like(postId, likeButtonId) {

    likePOST(postId).then(isliked => {
        if (isliked.liked) {

            let likeButton = document.querySelector(likeButtonId);

            if (likeButton) {

                likeButton.className = "btn btn-sm btn-success";

                likeButton.onclick = () => unlike(postId, likeButtonId);

                countLikesGET(postId).then(count => {
                    likeButton.innerHTML = `Liked ${count.likes_count}`;
                });
            }
        }
    })

}

function unlike(postId, likeButtonId) {

    unlikePOST(postId).then(isliked => {
        if (!isliked.liked) {

            let likeButton = document.querySelector(likeButtonId);

            if (likeButton) {
                likeButton.className = "btn btn-sm btn-primary";
 
                likeButton.onclick = () => like(postId, likeButtonId);

                countLikesGET(postId).then(count => {
                    likeButton.innerHTML = `Like ${count.likes_count}`;
                });
            }
        }
    });
    
}