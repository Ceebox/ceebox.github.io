// @ts-nocheck

class HLJSManager {

    constructor(language) {
        this.language = language;
        this.addedScripts = [];
        this.setUpPage();
    }

    configureHighlight(languageName) {

        this.language = languageName;
        hljs.languages = this.language;
        hljs.configure({ languages: [this.language] });

        // Push the new language to the search bar URL
        let url = new URL(window.location.href);
        url.searchParams.set("language", this.language);

        history.pushState({}, '', url.href);

        if (!this.addedScripts.includes(this.language)) {
            this.addedScripts.push(this.language);
            const script = document.createElement("script");

            script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/" + this.language + ".min.js"

            let self = this;
            script.addEventListener("onload", function () {
                self.highlight();
            });

            document.head.appendChild(script);
        }
    }

    setUpPage() {
        this.configureHighlight({ language: this.language }); //Ada is the first language
        this.setUpEvents();

        let self = this;
        document.getElementsByClassName("languages")[0].addEventListener('change', function () {
            self.configureHighlight(this.value);
            self.highlight();
        });
    }

    setUpEvents() {
        const input = document.getElementsByClassName("code-input")[0];

        let self = this;
        const textChanged = () => {
            self.highlight();
        };

        input.addEventListener("input", textChanged);

        const copyButton = document.getElementsByClassName("copy")[0];
        copyButton.addEventListener('click', function () {
            self.copy();
        });
    }

    copy() {
        const clipboardItem = new ClipboardItem({
            'text/plain': new Blob([document.getElementsByClassName("code-output")[0].innerHTML.replaceAll("&nbsp;", "")],
                { type: 'text/plain' })
        });

        navigator.clipboard.write([clipboardItem]).then(_ => console.log("clipboard.write() Ok"), error => alert(error));
    }

    highlight() {
        try {
            const output = document.getElementsByClassName("code-output")[0];
            output.className = "code-output language-" + this.language;

            // Pre-process
            output.removeAttribute("data-highlighted");
            output.textContent = this.createText();

            // Process
            hljs.highlightElement(output, { language: this.language });

            // Post-process and remove hljs- class names
            output.innerHTML = output.innerHTML.replaceAll("hljs-", "");
        } catch (error) {
            // HighlightJS is very error happy ¯\_(ツ)_/¯
        }
    }

    createText() {
        // https://medium.com/@albertogasparin/getting-plain-text-from-user-input-on-a-contenteditable-element-b711aba2cb36
        let element = document.getElementsByClassName("code-input")[0];
        let firstTag = element?.firstChild?.nodeName;
        let keyTag = new RegExp(
            firstTag === '#text' ? '<br' : '</' + firstTag,
            'i'
        );
        let tmp = document.createElement('p');
        tmp.innerHTML = element.innerHTML
            .replace(/<[^>]+>/g, (m, i) => (keyTag.test(m) ? '{ß®}' : ''))
            .replace(/{ß®}$/, '');
        return tmp.innerText.replace(/{ß®}/g, '\n');
    }
}

window.addEventListener("load", function () {
    let language = new URLSearchParams(window.location.search).get("language") ?? "ada";

    let valid = false;
    for (let i = 0; i < document.getElementsByClassName("languages")[0].length; ++i) {
        if (document.getElementsByClassName("languages")[0].options[i].value.toLowerCase() == language.toLowerCase()) {
            valid = true;
            break;
        }
    }

    if (valid === false) {
        // Just set it to the default
        language = "ada";
    }

    document.getElementsByClassName("languages")[0].value = language.toLowerCase()

    new HLJSManager(language).configureHighlight(language);
});