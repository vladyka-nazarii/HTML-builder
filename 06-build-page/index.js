const fs = require('fs');
const {rm, mkdir, copyFile, readFile, writeFile} = require('fs/promises');
const path = require('path');

async function makeDir(dirPath) {
  await rm(dirPath, { force: true, recursive: true });
  await mkdir(dirPath, { recursive: true });
};

async function makeHtml(components, template, result) {
  try {
    let html = (await readFile(template)).toString();
    fs.readdir(components, {withFileTypes: true}, (err, files) => {
      if (err) throw err;
      files.forEach(async element => {
        if (element.isFile() && path.extname(element.name) === '.html') {
          const componentText = (await readFile(path.join(__dirname, 'components', element.name))).toString();
          html = html.replace(`{{${path.parse(element.name).name}}}`, componentText);
          await writeFile(result, html);
        };
      });
    });
  } catch (err) {
    throw err;
  };
};

async function mergeCSS(from, to) {
  try {
    const writeStream = fs.createWriteStream(to, 'utf-8');
    fs.readdir(from, {withFileTypes: true}, (err, files) => {
      if (err) throw err;
      files.forEach(async element => {
        if (element.isFile() && path.extname(element.name) === '.css') {
          const elementPath = path.join(from, element.name);
          const readStream = fs.createReadStream(elementPath);
          readStream.pipe(writeStream);
        };
      })
    });
  } catch (err) {
    throw err;
  };
};

async function copyDir(from, to) {
  try {
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
  } catch (err) {
    throw err;
  };
};

async function build() {
  await makeDir(path.join(__dirname, 'project-dist'));
  await makeHtml(path.join(__dirname, 'components'), path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'));
  await mergeCSS(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist', 'style.css'));
  await copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
};

build();