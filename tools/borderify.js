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
            const contentWidth = document.getElementsByClassName("content")[0].clientWidth
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            console.log(aspectRatio);
            canvas.width = contentWidth * aspectRatio;
            canvas.height = contentWidth;
            canvas.style.width = contentWidth * aspectRatio;
            canvas.style.height = contentWidth;

            // https://stackoverflow.com/a/28416298
            let dArr = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1], // offset array
                x = 5,  // Final pos
                y = 5;

            let thickness = document.getElementById("size-input").value;

            // Draw images at offsets from the array scaled by the thickness
            for (let i = 0; i < dArr.length; i += 2) {
                // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
                ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, x + dArr[i] * thickness, y + dArr[i + 1] * thickness, contentWidth * aspectRatio, contentWidth);
            }

            // fill with color
            ctx.globalCompositeOperation = "source-in";
            ctx.fillStyle = document.getElementById("colour-input").value;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // draw original image in normal mode
            ctx.globalCompositeOperation = "source-over";
            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, ((x * thickness) / 2), ((y * thickness) / 2), (contentWidth * aspectRatio) - (x * thickness), contentWidth - (y * thickness));
        }
    }
}

window.addEventListener("load", function () {
    new Borderify().addFileChangedEventListener();
});