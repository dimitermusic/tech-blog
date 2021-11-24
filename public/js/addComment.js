document.querySelector("#add-review").addEventListener("submit", evt => {
    evt.preventDefault();
    const fetchObj = {
        PostId: document.querySelector("#post-id").value,
        comment: document.querySelector("#comment").value
    }
    console.log(fetchObj);
    fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(fetchObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href = "/"
        } else {
            alert("baba ganoush!")
        }
    })
})