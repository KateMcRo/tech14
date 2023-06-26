const titleEl = document.getElementById("title")
const contentEl = document.getElementById("content")
const btnEl = document.getElementById("createBtn")

async function handleCreatePost() {
    const title = titleEl.value
    const content = contentEl.value
    const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
    });
    const data = await response.json()
      if (response.ok) {
        window.location = "/dashboard";
      } else {
        console.error("Failed to post:", response.status);
      }
}

btnEl.addEventListener("click", handleCreatePost)