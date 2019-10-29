var Jimp = require("jimp");

var fileName = './wallpappers/download.jpg';



var date2 = new Date("12/21/2019");
var timeDiff = Math.abs(date2.getTime() -  Date.now());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

var imageCaption = `Faltam ${diffDays} para as férias `;
var loadedImage;

let name = 'sadasd';

const argumentCommands = {
    '-h': () => {
        console.log("Comandos:\n-h: Exibe esse texto de ajuda\n-n [NOME]: Define o nome do arquivo de saída\n");
        return false;
    },
    '-n': (args) => {
        name = `${args.splice(0,1)}`;
        return true;
    }
}

function evaluateArg(args) {
    if (args.length) {
        // existem argumentos
        const toBeEvaluated = args.splice(0,1)[0];
        const run = argumentCommands[toBeEvaluated] ? argumentCommands[toBeEvaluated](args) : false;
        if (!argumentCommands[toBeEvaluated]) {
            console.log(`Argumento "${toBeEvaluated}" não reconhecido`);
        }
        return { run: run, args: args };
    } else {
        // sem argumentos, só executar o programa
        return { run: true, args: args };
    }
}

function main(args = process.argv.slice(2)) {
    let run = true;
    let evaluate = args.length;

    while (evaluate) {
        const evaluation = evaluateArg(args);

        // se algum argumento, em qualquer posição, impede de rodar,
        // o programa não deve rodar.
        run = run ? evaluation.run : false;

        evaluate = evaluation.args.length;
    }

    if (run)
        writeInImage()
}

function writeInImage() {
    console.log(imageCaption)
    Jimp.read(fileName)
        .then(function (image) {
            loadedImage = image;
            return Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
        })
        .then(function (font) {
            console.log("foi");
            loadedImage.print(font, 50, 50, imageCaption)
                .write(`./wallpappers/${name}.jpg`);
        })
        .catch(function (err) {
            console.error(err);
        });
}

main();