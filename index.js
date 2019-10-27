var Jimp = require("jimp");

var fileName = './wallpappers/download.jpg';



var date2 = new Date("12/21/2019");
var timeDiff = Math.abs(date2.getTime() -  Date.now());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

var imageCaption = `Faltam ${diffDays} para as férias `;
var loadedImage;
console.log(imageCaption )

writeInImage();

function writeInImage() {
    Jimp.read(fileName)
        .then(function (image) {
            loadedImage = image;
            return Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
        })
        .then(function (font) {
            console.log("foi");
            loadedImage.print(font, 50, 50, imageCaption)
                .write(fileName+"sadasd.jpg");
        })
        .catch(function (err) {
            console.error(err);
        });
}
