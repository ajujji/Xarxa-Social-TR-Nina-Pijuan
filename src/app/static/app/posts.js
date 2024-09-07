function loadPosts(page, postsContainerId, username = "", following = false) {

    let post_start_i = postsIncrement*(page-1);
    let post_end_i = postsIncrement*(page);

    postsGET(post_start_i, post_end_i, username = username, following = following)
    .then(posts => {

        let postsContainer = document.querySelector(postsContainerId);

        postsContainer.innerHTML = "";

        posts.forEach(post => {

            postElement = createPostElement(post);

            postsContainer.append(postElement);

        });

    });

}