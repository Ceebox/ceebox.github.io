function createNavbar() {
    const nav = document.createElement("nav");
    nav.className = "navigation";

    nav.appendChild(createListElement("Home", "/index.html"));
    nav.appendChild(createListElement("Blog", "/blog.html"));
    nav.appendChild(createListElement("Games", "/games.html"));
    nav.appendChild(createListElement("Web Tools", "/tools.html"));
    nav.appendChild(createListElement("About", "/about.html"));

    document.body.insertAdjacentElement("afterbegin", nav);
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