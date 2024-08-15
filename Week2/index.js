const fs = require('fs');

const datafromA = fs.readFileSync('./a.txt', 'utf8');
const datafromB = fs.readFileSync('./b.txt', 'utf8');
console.log(datafromA);
console.log(datafromB);