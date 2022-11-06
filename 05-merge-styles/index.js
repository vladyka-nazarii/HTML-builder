const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, 'styles');
const destination = path.join(__dirname, 'project-dist', 'bundle.css');
async function mergeCSS(from, to) {
  try {
    fs.readdir(from, {withFileTypes: true}, (err, files) => {
      if (err) throw err;
      files.forEach(async element => {
        if (element.isFile()) {
          await fs.promises.copyFile(path.join(from, element.name), path.join(to, element.name));
        };
      })
    });
    console.log('The folder was copied successfully');
  } catch {
    console.log('The folder could not be copied');
  };
};
mergeCSS(source, destination);