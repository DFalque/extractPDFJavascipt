
const pdfLib = require('pdf-lib');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
const base64js = require('base64-js')
const fs = require('fs');


async function getScripts(src){
    const doc = await pdfjsLib.getDocument(src).promise;
    const allScripts = await doc.getJSActions()
    const arrayScripts = Object.values(allScripts)
    const allScriptsValues = []
    for (let key in allScripts) {
        allScriptsValues.push(allScripts[key][0]);
    }
   return allScriptsValues
    
}

async function main() {
    try {
        //Carga el pdf
        const pdfBytes = fs.readFileSync('output.pdf');
        const pdfDoc = await pdfLib.PDFDocument.load(pdfBytes)
        //en base 64
        const pdfBase64 = pdfBytes.toString('base64')
        // const buffer = Buffer.from(pdfBase64, 'base64');
        const buffer = base64js.toByteArray(pdfBase64);
        const scripts = await getScripts(pdfBytes)
        
        // const jsScript = pdfDoc
        // jsScript.addJavaScript(
        //         'main',
        //         "window.alert('Esto es una pruebaaaaa');"
        //       );

        // const doc = await pdfjs.getDocument('http://cdn.mozilla.net/pdfjs/helloworld.pdf').promise;
        // console.log(doc)

            // pdfjsLib.getDocument(buffer).then(pdf => {
            //     pdf.getJavaScript().then(script => {
            //         //Ejecutar script
            //         //   eval(script);
            //         console.log(script)
            //     });
            // });
            
        // console.log('esto corrio')
        // console.log(pdfDoc)
        // console.log(jsScript.javaScripts[0].embedder)
        // const {script, scriptName} = jsScript.javaScripts[0].embedder
        // console.log(script)
        const html = `
        <html >
        <script>
            document.addEventListener("DOMContentLoaded", function(event) {
            ejecutarScript();
            });
        </script>
        ${
        scripts.map(script => {
            return `<script>${script}</script>`}
        )}
          <body onload="ejecutarScript()">
            <iframe src=${`data:application/pdf;base64,${pdfBase64}`} width="100%" height="800"></iframe>
          </body>
        </html>
        `;
    
        fs.writeFileSync('otro.html', html);
    } catch (error) {
        console.log(error)
    }
}

main()




// const scriptRegex = /script/gi;
// const scriptMatch = content.items.find(textItem => scriptRegex.test(textItem.str));
// if (scriptMatch) {
//   console.log('Script encontrado en el PDF: ', scriptMatch.str);
// } else {
//   console.log('Script no encontrado en el PDF.');
// }


// for (var i = 1; i <= pdf.numPages; i++) {
//     pdf.getPage(i).then(function(page) {
//        ... 
//     });
// }