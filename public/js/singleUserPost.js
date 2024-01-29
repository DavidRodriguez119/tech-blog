let postData;
const postTitleInput = document.getElementById(`post-title-input`);
const postContentInput = document.getElementById(`post-content-input`);

const renderPost = () => {
    // get post id
    const wantedData = localStorage.getItem(`wantedUserPostId`);
    const wantedId = JSON.parse(wantedData);
    // get post data
    fetch(`http://localhost:3000/api/post/find/${wantedId}`)
        .then(response => response.json())
        .then(data => {
            postData = data;
            console.log(postData);
            postTitleInput.value = postData.title;
            postContentInput.value = postData.content;
        })
        .catch(error => {
            console.error('Error trying to fetch posts data', error);           
    });
}

renderPost();