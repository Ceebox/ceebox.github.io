class Borderify {

    constructor() { }

    addFileChangedEventListener() {
        let fileInput = document.getElementById("file-input");
        if (fileInput == null) {
            return;
        }

        fileInput.onchange = () => {
            this.fileChanged()
        }

        let sizeInput = document.getElementById("size-input");
        if (sizeInput == null) {
            return;
        }

        sizeInput.onchange = () => {
            this.fileChanged();
        }

        let colourInput = document.getElementById("colour-input");
        if (colourInput == null) {
            return;
        }

        colourInput.onchange = () => {
            this.fileChanged();
        }
    }

    fileChanged() {
        let fileInput = document.getElementById("file-input");
        var file = fileInput.files[0];

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            if (e.target.readyState == FileReader.DONE) {
                this.drawNewImage(e.target?.result);
            }
        }
    }

    drawNewImage(imageData) {
        let canvas = document.getElementById('main-canvas');
        if (canvas == null) {
            return;
        }

        let ctx = canvas.getContext("2d");
        let img = new Image();

        img.src = imageData;
        img.onload = () => {
            let thickness = document.getElementById("size-input").value;

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
}

window.addEventListener("load", function () {
    new Borderify().addFileChangedEventListener();
});