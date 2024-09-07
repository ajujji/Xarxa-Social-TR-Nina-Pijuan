const postsIncrement = 10;
let pageCurrent;
let userIsAuthenticated;

document.addEventListener("DOMContentLoaded", function() {

    const requestedUsername = JSON.parse(document.getElementById("username").textContent);
    userIsAuthenticated = JSON.parse(document.getElementById("user_is_authenticated").textContent);

    pageCurrent = 1;

    createPagination(pageCurrent, "#ProfilePaginationContainer", "#ProfilePostsContainer", requestedUsername);

    loadPosts(pageCurrent, "#ProfilePostsContainer", requestedUsername);

    loadCounts(requestedUsername, "#ProfileFollowersContainer");

    if (document.querySelector("#ProfileFollowButton")) showFollow(requestedUsername, "#ProfileFollowButton", "#ProfileFollowersContainer");

});

function loadCounts(requestedUsername, countContainerId) {

    countPostsGET(requestedUsername).then(count => {
        document.querySelector(countContainerId).innerHTML = `Posts (${count.posts_count})`;
    })
    .then(() => {
        countFollowingGET(requestedUsername).then(count => {
            document.querySelector(countContainerId).innerHTML += ` | Following (${count.following_count})`;
        })
        .then(() => {
            countFollowersGET(requestedUsername).then(count => {
                document.querySelector(countContainerId).innerHTML += ` | Followers (${count.followers_count})`;
            });
        });
    });

}