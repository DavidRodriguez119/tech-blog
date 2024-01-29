const loginForm = document.querySelector("#login-form");
const newUserForm = document.querySelector("#new-user-form");

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