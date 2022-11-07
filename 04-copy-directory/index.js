const fs = require('fs');
const {rm, mkdir, copyFile} = require('fs/promises');
const path = require('path');

const source = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files-copy');

async function copyDir(from, to) {
  try {
    await rm(to, { force: true, recursive: true });
    await mkdir(to, { recursive: true });
    fs.readdir(from, {withFileTypes: true}, (err, files) => {
      if (err) throw err;
      files.forEach(async element => {
        if (element.isFile()) {
          await copyFile(path.join(from, element.name), path.join(to, element.name));
        };
        if (element.isDirectory()) {
          await copyDir(path.join(from, element.name), path.join(to, element.name));
        };
      })
    });
    console.log('The folder was copied successfully');
  } catch {
    console.log('The folder could not be copied');
  };
};

copyDir(source, destination);