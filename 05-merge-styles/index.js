const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, 'styles');
const destination = path.join(__dirname, 'project-dist', 'bundle.css');
function mergeCSS(from, to) {
  try {
    const writeStream = fs.createWriteStream(to, 'utf-8');
    fs.readdir(from, {withFileTypes: true}, (err, files) => {
      if (err) throw err;
      files.forEach(element => {
        if (element.isFile() && path.extname(element.name) === '.css') {
          const elementPath = path.join(from, element.name);
          const readStream = fs.createReadStream(elementPath);
          readStream.pipe(writeStream);
        };
      })
    });
    console.log('Files was merged successfully');
  } catch {
    console.log('Files could not be merged');
  };
};
mergeCSS(source, destination);