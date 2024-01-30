//Import the models
const { User, Post, Comment } = require(`../models`);

//Require sequelize through the connection file
const sequelize = require(`../config/connection`);

const userData = [
    {
        username: `david`,
        password: `password`,
    },
    {
        username: `andres`,
        password: `password`
    }
];

//Encrypt seeded user passwords
const bcrypt = require("bcryptjs");

for (let userObj of userData) {
    userObj.password = bcrypt.hashSync(userObj.password, 6)
}

const postData = [
    {
        title: `Title #1`,
        content: `This is the first ever written post`
    },
    {
        title: `Title #2`,
        content: `This is the second ever written post`
    }
];

const commentData = [
    {
        content: `Not the cleverest post`,
        author: `david`
    },
    {
        content: `Really?`,
        author: `andres`
    }
]

//Seeds function
const seedMe = async () => {
    await sequelize.sync({ force: false });
    const dbUsers = await User.bulkCreate(userData);
    const dbPosts = await Post.bulkCreate(postData);
    const dbComment = await Comment.bulkCreate(commentData);
    // add post and comments to the accounts
    await dbUsers[0].addPosts([1]);
    await dbUsers[1].addPosts([2]);
    await dbUsers[0].addComments([1]);
    await dbUsers[1].addComments([2]);
    await dbPosts[0].addComments([2]);
    await dbPosts[1].addComments([1]);
    console.log(`Seeding completed :)`);
    process.exit(0)

};

//call the function
seedMe();
