const loginForm = document.querySelector("#login-form");
const newUserForm = document.querySelector("#new-user-form");
const changeForm = document.getElementById(`change-form`);

newUserForm.style.display = `none`;

loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const userObj = {
        username: document.querySelector("#username-input").value,
        password: document.querySelector("#password-input").value
    };
    loginUser(userObj)
});

const loginUser = async (userObj) => {
    fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href = "/";
        } else {
            alert(`Invalid Credentials`)
        };
    });
};

// change form when click 
changeForm.addEventListener(`click`, () => {
    if(loginForm.style.display === `none`){
        loginForm.style.display = `block`;
        newUserForm.style.display = `none`    
    } else {
        loginForm.style.display = `none`;
        newUserForm.style.display = `block`    
    }
})