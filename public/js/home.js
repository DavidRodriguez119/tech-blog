let postContainer = document.getElementById(`post-container`);
let allPosts;

// get all the post in the db
fetch(`api/post`)
.then(response => response.json())
.then(data => {
    allPosts = data;
    console.log(allPosts);
    renderPosts()
})
.catch(error => {
    console.error('Error trying to fetch boardgame data', error);
});

const renderPosts = () => {
    for(let post of allPosts){
        
    }
}