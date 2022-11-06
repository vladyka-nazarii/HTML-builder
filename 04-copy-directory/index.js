const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files-copy');
async function copyDir(from, to) {
  try {
    await fs.promises.rm(to, { force: true, recursive: true });
    await fs.promises.mkdir(to, { recursive: true });
    fs.readdir(from, {withFileTypes: true}, (err, files) => {
      if (err) throw err;
      files.sort((a, b) => a.name - b.name);
      files.forEach(async element => {
        if (element.isFile()) {
          await fs.promises.copyFile(path.join(from, element.name), path.join(to, element.name));
        };
        if(element.isDirectory()) {
          copyDir(path.join(from, element.name), path.join(to, element.name));
        };
      })
    });
    console.log('The folder was copied successfully');
  } catch {
    console.log('The folder could not be copied');
  }
};
copyDir(source, destination);