import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

async function loadArticle(file) {
    const articleContainer = document.querySelector('#articleContainer');
    if (!file) {
        articleContainer.innerHTML = "<p>No article specified.</p>";
        return;
    }

    try {
        const response = await fetch(`posts/${file}.md`);
        if (!response.ok) {
            throw new Error("Article not found.");
        }

        const markdown = await response.text();

        articleContainer.innerHTML = marked(markdown);
        articleContainer.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(title => {
            title.classList.add('font-bold', 'mt-4', 'mb-2', 'text-white');

            // Customize font size based on heading level
            switch (title.tagName) {
                case 'H1':
                    title.classList.add('text-4xl');
                    break;
                case 'H2':
                    title.classList.add('text-3xl');
                    break;
                case 'H3':
                    title.classList.add('text-2xl');
                    break;
                case 'H4':
                    title.classList.add('text-xl');
                    break;
                case 'H5':
                    title.classList.add('text-lg');
                    break;
                case 'H6':
                    title.classList.add('text-base');
                    break;
            }

            const lineBreak = document.createElement('br');
            title.parentNode.insertBefore(lineBreak, title);
        });
        articleContainer.querySelectorAll('p').forEach(paragraph => {
            const lineBreak = document.createElement('br');
            paragraph.parentNode.insertBefore(lineBreak, paragraph);
            paragraph.classList.add('text-lg');
        });
    } catch (error) {
        articleContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

const params = new URLSearchParams(window.location.search);
const articleFile = params.get('post');

loadArticle(articleFile);
