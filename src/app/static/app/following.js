const postsIncrement = 10;
let pageCurrent;
let userIsAuthenticated;

document.addEventListener("DOMContentLoaded", function() {

    userIsAuthenticated = JSON.parse(document.getElementById("user_is_authenticated").textContent);

    pageCurrent = 1;

    createPagination(pageCurrent, "#FollowingPaginationContainer", "#FollowingPostsContainer", username = "", following = true);

    loadPosts(pageCurrent, "#FollowingPostsContainer", username = "", following = true);

});