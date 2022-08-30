async function render() {
    const post = "../assets/posts/newsletter_2022-05.md";
    let file = await fetch(post);
    let text = await file.text();
    document.getElementById("content").innerHTML = marked.parse(text);
}

async function renderBlogPost() {
    await render();
}

window.addEventListener('load', renderBlogPost);