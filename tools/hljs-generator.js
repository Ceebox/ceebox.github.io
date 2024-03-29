// @ts-ignore

class HLJSManager {

    constructor() {
        this.language = "ada";
        this.setUpPage();
    }

    configureHighlight(languageName) {

        this.language = languageName;
        hljs.languages = this.language;
        hljs.configure({ languages: [this.language] });

        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/" + languageName + ".min.js"

        let self = this;
        script.addEventListener("onload", function () {
            self.highlight();
        });

        document.head.appendChild(script);

        // @ts-ignore
        hljs.configure(this.highlightOptions)
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
            // @ts-ignore
            hljs.highlightElement(output, { language: this.language });

            // Post-process
            // @ts-ignore
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
    new HLJSManager().configureHighlight("ada");
});