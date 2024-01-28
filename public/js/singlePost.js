const postTitle = document.querySelector(`.post-title`);
const postInfo = document.querySelector(`.post-info`);
const postContent = document.querySelector(`.post-content`);

const renderPost = () => {
    // get post id
    const wantedData = localStorage.getItem(`wantedPostId`);
    const wantedId = JSON.parse(wantedData);
    console.log(wantedId);
}

renderPost();