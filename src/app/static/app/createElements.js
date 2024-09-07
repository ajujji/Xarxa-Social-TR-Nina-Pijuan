function createPostElement(post) {

    let postElement = document.createElement("div");
    postElement.className = "card";

    let postBody = document.createElement("div");
    postBody.id = `PostBody${post.id}`;
    postBody.className = "card-body";

    let postTitle = document.createElement("h6");
    postTitle.className = "card-title"
    postTitle.style.marginBlockEnd = "0px";

    let postAnchor = document.createElement("a");
    postAnchor.innerHTML = `@${post.user}`;
    postAnchor.href = `/profile/${post.user}`;
    postAnchor.style.color = "black";

    postTitle.append(postAnchor);

    let postTimestamp = document.createElement("small");
    postTimestamp.className = "card-text text-muted";
    postTimestamp.innerHTML = `${post.timestamp}`;

    let postText = document.createElement("p");
    postText.id = `PostText${post.id}`;
    postText.className = "card-text";
    postText.style.marginBlockStart = "8px";
    postText.innerHTML = post.text;

    postBody.append(postTitle, postTimestamp, postText);

    if (userIsAuthenticated) {
        let postLikeButton = createLikeButton(post);
        postBody.append(postLikeButton);
    }

    isCreatorGET(post.id)
    .then(isCreator => {
        if(isCreator.iscreator) {
            let postEditButton = createEditButton(post);
            postBody.append(postEditButton);
        } 
    });

    postElement.append(postBody);

    return postElement;

}

function createLikeButton(post) {

    let likeButton = document.createElement("button");
    likeButton.style.marginRight = "10px";
    likeButton.id = `PostLikeButton${post.id}`;

    isLikedGET(post.id).then(isliked => {
        if(isliked.liked) {

            likeButton.className = "btn btn-sm btn-success";

            countLikesGET(post.id).then(count => {
                likeButton.innerHTML = `Liked ${count.likes_count}`;
            });

            likeButton.onclick = () => {unlike(post.id, `#${likeButton.id}`)};

        } else {

            likeButton.className = "btn btn-sm btn-primary";

            countLikesGET(post.id).then(count => {
                likeButton.innerHTML = `Like ${count.likes_count}`;
            });

            likeButton.onclick = () => {like(post.id, `#${likeButton.id}`)};

        }
    });

    return likeButton;
}

function createPagination(pageCurrent, paginationContainerId, postsContainerId, username = "", following = false) {

    let paginationContainer = document.querySelector(paginationContainerId);
    paginationContainer.innerHTML = "";

    countPostsGET(username, following)
    .then(count => {

        let pageCount = Math.ceil(count.posts_count/postsIncrement);

        paginationList = document.createElement("ul");
        paginationList.className = "pagination justify-content-center";
        paginationList.id = "PaginationList";

        for(let page = 1; page < pageCount + 1; page++) {

            let pageItem = document.createElement("li");
            pageItem.className = "page-item";

            let pageItemButton = document.createElement("button");
            pageItemButton.className = page == pageCurrent? "btn btn-primary": "btn btn-light";
            pageItemButton.id = `PageButton${page}`;
            pageItemButton.innerHTML = `${page}`;

            pageItemButton.addEventListener("click", () => {
                pageCurrent = page;
                loadPosts(page, postsContainerId, username, following);
                createPagination(pageCurrent, paginationContainerId, postsContainerId, username, following);
            });

            pageItem.append(pageItemButton);

            paginationList.append(pageItem);

        }

        if (pageCount > 1 && pageCurrent < pageCount) {

            let pageNextButton = document.createElement("button");
            pageNextButton.className = "btn btn-light";
            pageNextButton.id = "PageButtonNext";
            pageNextButton.innerHTML = "Next";

            pageNextButton.addEventListener("click", () => {
                pageCurrent++; 
                loadPosts(pageCurrent, postsContainerId, username, following);
                createPagination(pageCurrent, paginationContainerId, postsContainerId, username, following);
            });

            paginationList.append(pageNextButton);
        }

        if (pageCurrent > 1) {

            let pagePrevButton = document.createElement("button");
            pagePrevButton.className = "btn btn-light";
            pagePrevButton.id = "PagePrevNext";
            pagePrevButton.innerHTML = "Previous";

            pagePrevButton.addEventListener("click", () => {
                pageCurrent--;
                loadPosts(pageCurrent, postsContainerId, username, following);
                createPagination(pageCurrent, paginationContainerId, postsContainerId, username, following);
            });

            paginationList.prepend(pagePrevButton);
        }

        paginationContainer.append(paginationList);

    });

}