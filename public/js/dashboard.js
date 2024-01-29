let postContainer = document.querySelector(`.post-container`);
let allUserPosts;
let posts;
let clickedId;

// get all the logged user's post 
fetch(`api/post/logged/posts`)
    .then(response => response.json())
    .then(data => {
        allUserPosts = data;
        console.log(allUserPosts);
        renderPosts()
    })
    .catch(error => {
        console.error('Error trying to fetch posts data', error);
});

const renderPosts = () => {
    for(let post of allUserPosts){   
        //Get the post date
        const date = post.createdAt.slice(0,10)
        console.log(date);
        // Create & append the outer div with class "post"
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.setAttribute(`id`, `${post.id}`)
        postContainer.appendChild(postDiv)
        // Create & append the inner div with class "post-header"
        const postHeaderDiv = document.createElement('div');
        postHeaderDiv.classList.add('post-header');
        postDiv.appendChild(postHeaderDiv);
        // Create & append the h3 element with class "post-title" and set its text content
        const postTitle = document.createElement('h3');
        postTitle.classList.add('post-title');
        postTitle.textContent = `${post.title}`;
        postHeaderDiv.appendChild(postTitle);
        // Create & append the p element for the "Posted by" text
        const postInfo = document.createElement('p');
        postInfo.classList.add('post-info');
        postInfo.textContent = `Posted by ${post.User.username} on ${date}`;
        postHeaderDiv.appendChild(postInfo);
        // Create & append the p element with class "post-content" and set its text content
        const postContent = document.createElement('p');
        postContent.classList.add('post-content');
        postContent.textContent = `${post.content}`;
        postDiv.appendChild(postContent)
    }
    posts = document.querySelectorAll(`.post`);

    posts.forEach(post => {
        post.addEventListener(`click`, event => {
            if(event.target.parentNode.className === `post-header`){
                clickedId = event.target.parentNode.parentNode.id
                displayPost(clickedId)
            } else {
                clickedId = event.target.parentNode.id
                displayPost(clickedId)
            };      
        })
    });
};

const displayPost = (id) => {
    if(id == ``){
        return
    } else{
        console.log(id);
        // localStorage.setItem(`wantedPostId`, id);
        // location.replace(`/singlePost/${id}`);
    };
};