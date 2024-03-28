function createNavbar() {
    const div = document.createElement("div");
    div.className = "navigation";

    div.appendChild(createListElement("Home", "/index.html"));
    div.appendChild(createListElement("Blog", "/blog.html"));
    div.appendChild(createListElement("Games", "/games.html"));
    div.appendChild(createListElement("About", "/about.html"));

    document.body.insertAdjacentElement("afterbegin", div);
}

function createListElement(text, filePath) {
    const element = document.createElement("a");
    element.innerHTML = text;
    element.href = filePath;

    return element;
}

window.addEventListener("load", function () {
    createNavbar();
});