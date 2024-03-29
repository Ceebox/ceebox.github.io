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

window.addEventListener("load", function () {
    document.querySelector('.wordCount').textContent = "Article Word Count (Excluding Headings & Code): " + totalWords(document.querySelectorAll('p'));
    document.querySelector('.readTime').textContent = "Reading Time: ~" + Math.floor(totalWords(document.querySelectorAll('div')) / (300 / 60) / 60) + " minutes";
});
