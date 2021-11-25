const newPostForm = document.querySelector("#newpost-form");

// Hides new post button

newPost.classList.toggle("hide");

// Gathers form info and sends it to blog controller

newPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const postObj = {
        title: document.querySelector("#post-title").value,
        body: document.querySelector("#post-body").value,
    }
    fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify(postObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href = "/dashboard"
        } else {
            alert("missing fields")
        }
    })
})