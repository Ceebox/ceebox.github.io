class Borderify {

    constructor() {
        this.result = null;
    }

    addFileChangedEventListener() {
        const fileInput = document.getElementById("file-input");
        const sizeInput = document.getElementById("size-input");
        const colourInput = document.getElementById("colour-input");
        const downloadButton = document.getElementById("download-button");
        const canvas = document.getElementById('main-canvas');

        if (fileInput == null ||
            sizeInput == null ||
            colourInput == null ||
            downloadButton == null ||
            canvas == null
        ) {
            return;
        }

        fileInput.onchange = () => {

            // Move the download button down when the canvas has a height
            canvas.classList.add("canvas-populated");

            this.fileChanged()
        }

        sizeInput.onchange = () => {
            this.drawNewImage();
        }

        colourInput.onchange = () => {
            this.drawNewImage();
        }

        downloadButton.onclick = () => {
            this.downloadImage();
        }
    }

    fileChanged() {
        let fileInput = document.getElementById("file-input");
        var file = fileInput.files[0];

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            if (e.target.readyState == FileReader.DONE) {
                this.result = e.target?.result
                this.drawNewImage();
            }
        }
    }

    drawNewImage() {
        const canvas = document.getElementById('main-canvas');
        const sizeInput = document.getElementById("size-input");
        if (canvas == null || sizeInput == null) {
            return;
        }

        const thickness = sizeInput.value;
        if (Math.sign(thickness) == -1) {
            thickness = 0;
        }

        let ctx = canvas.getContext("2d");
        let img = new Image();

        img.src = this.result;
        img.onload = () => {
            canvas.width = img.naturalWidth + (thickness * 2);
            canvas.height = img.naturalHeight + (thickness * 2);
            canvas.style.width = img.naturalWidth + (thickness * 2);
            canvas.style.height = img.naturalHeight + (thickness * 2);

            // fill with color
            ctx.fillStyle = document.getElementById("colour-input").value;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // draw original image in normal mode
            ctx.globalCompositeOperation = "source-over";
            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, thickness, thickness, img.naturalWidth, img.naturalHeight);
        }
    }

    downloadImage() {
        var canvas = document.getElementById("main-canvas");
        let fileInput = document.getElementById("file-input");

        if (canvas == null || fileInput == null || fileInput.files[0] == null) {
            return;
        }

        var aDownloadLink = document.createElement("a");
        aDownloadLink.download = "borderify-" + fileInput.files[0].name;

        var image = canvas.toDataURL();
        aDownloadLink.href = image;
        aDownloadLink.click();
    }
}

window.addEventListener("load", function () {
    new Borderify().addFileChangedEventListener();
});