const signupForm = document.querySelector("#signup-form");

// Hides new post button

newPost.classList.toggle("hide");

// Gathers form info and sends it to user controller

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userObj = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value,
        email: document.querySelector("#email").value,
    }
    fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            const userObj = {
                email: document.querySelector("#email").value,
                password: document.querySelector("#password").value,
            }
            fetch("/api/users/login", {
                method: "POST",
                body: JSON.stringify(userObj),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (res.ok) {
                    location.href = "/dashboard"
                }
            })
        } else {
            alert("something went wrong")
        }
    })
})