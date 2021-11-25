const newPost = document.querySelector("#newpost");

// Listens for new post button

newPost.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "/newpost"
})


