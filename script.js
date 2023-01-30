const pdfLib = require('pdf-lib');
const fs = require('fs');

async function main() {
    //Carga el pdf
    const pdfBytes = fs.readFileSync('sample.pdf');
    const pdfDoc = await pdfLib.PDFDocument.load(pdfBytes);

    // Crea una página vacía
    const page = pdfDoc.addPage();

    // Crea una instancia de un objeto javascript
    pdfDoc.addJavaScript(
        'main',
        "window.alert('Se ha reproducido el script');"
      );
    // Añade el código javascript

    // Añade el objeto javascript al pdf

    // Genera los bytes del pdf modificado
    const pdfBytesModified = await pdfDoc.save();

    // Guarda el pdf modificado en disco
    fs.writeFileSync('output.pdf', pdfBytesModified);
}

main().catch(console.error);
