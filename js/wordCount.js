// @ts-nocheck
function totalWords(elements) {
    var total = 0;

    for (var i = 0; i < elements.length; i++) {
        var localCount = 0;
        const words = elements[i].textContent.trim().split(' ')
        for (var j = 0; j < words.length; j++) {
            if (words[j] !== "" && words[j] !== "\n" && words[j] !== ".") {
                localCount += 1;
            }
        }

        total += localCount;
    }
    return total;
}

function trySetTextContent(selector, text) {
    const element = document.querySelector(selector);
    if (element !== null) {
        element.textContent = text;
    }
}

window.addEventListener("load", function () {
    trySetTextContent(".wordCount", "Article Word Count: " + totalWords(document.querySelectorAll('p')));
    trySetTextContent(".wordCountExcluding", "Article Word Count: " + totalWords(document.querySelectorAll('p')));
    trySetTextContent(".readTime", "Reading Time: ~" + Math.round(totalWords(document.querySelectorAll('div')) / (250 / 60) / 60) + " minutes");
});
