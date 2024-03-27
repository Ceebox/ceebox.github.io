function loadVideo(iframe) {
    const channelURL = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=UCBTnza6RHvA1wGMbIYa0LRw`)
    const reqURL = `https://api.rss2json.com/v1/api.json?rss_url=${channelURL}`;
    fetch(reqURL).then(response => response.json()).then(result => {
        const link = result.items[0].link;
        const id = link.substring(link.indexOf("=") + 1);
        iframe.setAttribute("src", `https://youtube.com/embed/${id}?controls=0&autoplay=0`);
    }).catch();
}

window.addEventListener("load", function () {
    loadVideo(document.getElementsByClassName("latestVideoEmbed")[0]);
});