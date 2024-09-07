function createEditButton(post) {

    let editButton = document.createElement("button");
    editButton.className = "btn btn-sm btn-secondary";
    editButton.innerHTML = "Delete";
    editButton.onclick = () => editPost(post, editButton);

    return editButton;

}

function createSaveButton(post, postText, postTextarea, editButton) {

    let saveButton = document.createElement("button");
    saveButton.className = "btn btn-sm btn-primary";
    saveButton.innerHTML = "Save";

    saveButton.onclick = () => {
        newText = postTextarea.value;
        postEditPOST(post.id, newText)
        .then(() => {
            postText.innerHTML = newText;
            saveButton.remove();
            editButton.style.display = "";
        });
    }

    return saveButton;

}

function editPost(post, editButton) {

    let postText = document.querySelector(`#PostText${post.id}`);

    let postTextarea = document.createElement('textarea');

    postTextarea.innerHTML = postText.innerHTML;

    postText.innerHTML = "";

    postText.append(postTextarea);

    editButton.style.display = "none";

    let saveButton = createSaveButton(post, postText, postTextarea, editButton);

    let postBody = document.querySelector(`#PostBody${post.id}`); 
    postBody.append(saveButton);

}