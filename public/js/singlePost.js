const postTitle = document.querySelector(`.post-title`);
const postInfo = document.querySelector(`.post-info`);
const postContent = document.querySelector(`.post-content`);
const addCommentButton = document.getElementById(`add-comment-button`);
const addCommentForm = document.getElementById(`add-comment-form`);
const submitComment = document.getElementById(`submit-comment`);
let postData;

const renderPost = () => {
    // get post id
    const wantedData = localStorage.getItem(`wantedPostId`);
    const wantedId = JSON.parse(wantedData);
    
    // get post data
    fetch(`http://localhost:3000/api/post/find/${wantedId}`)
        .then(response => response.json())
        .then(data => {
            postData = data;
            console.log(postData);
            const date = postData.createdAt.slice(0,10)
            // render post
            postTitle.textContent = `${postData.title}`
            postInfo.textContent = `Posted by ${postData.User.username} on ${date}`;
            postContent.textContent = postData.content
            renderComments(postData);
        })
        .catch(error => {
            console.error('Error trying to fetch posts data', error);           
    });
}

const renderComments = (comments) => {
    for(let comment of comments.Comments){
        const commentText = document.createElement(`p`);
        commentText.textContent = comment.content;
        document.querySelector(`.comment-container`).appendChild(commentText);
    };
};

addCommentButton.addEventListener(`click`, () => {
    addCommentForm.style.display = `block`;
});

submitComment.addEventListener(`click`, (event) => {
    event.preventDefault();
    
})


renderPost();

