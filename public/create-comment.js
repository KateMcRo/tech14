const commentEl = document.getElementById("comment")
const replyBtnEl = document.getElementById("reply")
const cancelBtnEl = document.getElementById("cancel")

async function handleCreateComment() {
    const postId = parseInt(window.location.pathname.split("/")[2])
    const comment = commentEl.value

    const response = await fetch('/api/comments/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment, postId })
    });
    const data = await response.json()
    if (response.ok) {
        location.reload()
    } else {
        console.error("Failed to post:", response.status)
    }
}

replyBtnEl.addEventListener("click", handleCreateComment)