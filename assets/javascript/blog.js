async function render() {
    const post = "../assets/posts/newsletter_2022-05.md";
    let file = await fetch(post);
    let text = await file.text();
    document.getElementById("content").innerHTML = marked.parse(text);
}

async function renderBlogPost() {
    await render();
    // Modal
    const modalEl = document.getElementById("donationModal");
    const modelOpenerEls = document.getElementsByClassName("donationButton");
    const modelCloserEl = document.getElementsByClassName("close")[0];
    setupModal(modalEl, modelOpenerEls, modelCloserEl);
}

window.addEventListener('load', renderBlogPost);