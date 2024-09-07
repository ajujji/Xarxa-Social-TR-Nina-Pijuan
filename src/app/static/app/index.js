const postsIncrement = 10;
let pageCurrent;
let userIsAuthenticated;

document.addEventListener("DOMContentLoaded", function() {

    userIsAuthenticated = JSON.parse(document.getElementById("user_is_authenticated").textContent);

    pageCurrent = 1;

    createPagination(pageCurrent, "#AllPostsPaginationContainer", "#AllPostsContainer");

    loadPosts(pageCurrent, "#AllPostsContainer");

    if (document.querySelector('#NewPostForm')) {
        document.querySelector('#NewPostForm').onsubmit = () => {

            let postText = document.querySelector('#NewPostText');
            let text = postText.value;

            if (text) {
                newPOST(text) 
                .then(post => {

                    postText.value = "";
                    loadPosts(pageCurrent, "#AllPostsContainer");
                });
            } else {
                loadPosts(pageCurrent, "#AllPostsContainer");
            }

            return false;
        };
    }

});