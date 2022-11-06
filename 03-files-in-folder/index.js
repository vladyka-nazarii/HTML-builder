const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.sort((a, b) => a.name - b.name);
  files.forEach(element => {
    if (element.isFile()) {
      fs.stat(path.join(__dirname, 'secret-folder', element.name), (err, stats) => {
        if (err) throw err;
        console.log(`${path.parse(element.name).name} - ${path.parse(element.name).ext.slice(1)} - ${stats.size / 1024}kb`);
      });
    };
  });
});