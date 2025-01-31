const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const inputFilePath = path.join(__dirname, 'Kartamyshev Kostiantyn.pages');
const outputDir = path.join(__dirname, 'assets');
const libreOfficePath = '/opt/homebrew/bin/soffice';

const adjustFileName = () => {
  const outputFileName = 'Kartamyshev-Kostiantyn-Javascript-Developer-CV.pdf';
  const oldPath = path.join(outputDir, 'Kartamyshev Kostiantyn.pdf');
  const newPath = path.join(outputDir, outputFileName);

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err.message}`);
      return;
    }
    console.log('PDF CV file generated successfully.');
  });
};

exec(`${libreOfficePath} --headless --convert-to pdf "${inputFilePath}" --outdir "${outputDir}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);

  adjustFileName();
});