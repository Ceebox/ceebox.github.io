class Borderify {

    constructor() { }

    addFileChangedEventListener() {
        let fileInput = document.getElementById("file-input");
        if (fileInput == null) {
            return;
        }

        let canvas = document.getElementById('main-canvas');
        if (canvas == null) {
            return;
        }

        let ctx = canvas.getContext("2d");
        let img = new Image();

        fileInput.onchange = () => {
            var file = fileInput.files[0];

            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                if (e.target.readyState == FileReader.DONE) {
                    img.src = e.target.result;
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
                            s = 5,  // Thickness
                            x = 5,  // Final pos
                            y = 5;

                        // Draw images at offsets from the array scaled by the thickness
                        for (let i = 0; i < dArr.length; i += 2) {
                            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
                            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, x + dArr[i] * s, y + dArr[i + 1] * s, contentWidth * aspectRatio, contentWidth);
                        }

                        // fill with color
                        ctx.globalCompositeOperation = "source-in";
                        ctx.fillStyle = "#ffffff";
                        ctx.fillRect(0, 0, canvas.width, canvas.height);

                        // draw original image in normal mode
                        ctx.globalCompositeOperation = "source-over";
                        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, ((x * s) / 2), ((y * s) / 2), (contentWidth * aspectRatio) - (x * s), contentWidth - (y * s));
                    }
                }
            }
        }
    }
}

window.addEventListener("load", function () {
    new Borderify().addFileChangedEventListener();
});