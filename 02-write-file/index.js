const fs = require('fs');
const path = require('path');
const process = require('process');
const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');
console.log('Hello! Please type text here...');
process.stdin.on('data', data => {
  if (data.toString().toLowerCase().trim() === 'exit') process.exit();
  stream.write(data);
});
process.on('exit', () => console.log('Good buy!'));
process.on('SIGINT', () => process.exit());
