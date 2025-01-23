const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const inputFilePath = path.join(__dirname, 'Kartamyshev Kostiantyn.pages');
const outputDir = path.join(__dirname, 'assets');
const outputFileName = 'Kartamyshev-Kostiantyn-Frontend-Developer-CV-2.pdf';
const libreOfficePath = '/opt/homebrew/bin/soffice';

const command = `${libreOfficePath} --headless --convert-to pdf "${inputFilePath}" --outdir "${outputDir}"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);

  // Rename the output file
  const generatedPdfPath = path.join(outputDir, 'Kartamyshev Kostiantyn.pdf');
  const newPdfPath = path.join(outputDir, outputFileName);

  fs.rename(generatedPdfPath, newPdfPath, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err.message}`);
      return;
    }
    console.log('PDF CV file generated successfully.');
  });

});