const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('TextAnalyzer')
  .description('CLI to do file-based tasks')
  .version('0.8.0');

program
  .command('countWords')
  .description('Count the number of words in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        // let totalWords = 0;
        // for(let i = 0; i < data.length; i ++ ){
        //     if(data[i] === ' '){
        //         totalWords ++;
        //     }
        // }
        // totalWords ++;
        const totalWords = data.trim().split(/\s+/).length;
        console.log(`There are ${totalWords} words in ${file}`);
      }
    });
  });


  program
  .command('countLines')
  .description('Count the number of words in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        const lines = data.trim().split('\n').length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });


  program
  .command('countCharacters') 
  .description('Count the number of characters in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        const characters = data.length;
        console.log(`There are ${characters} characters in ${file}`);
      }
    });
  });

  program
  .command('countParagraphs')
  .description('Count the number of paragraphs in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        const paragraphs = data.trim().split(/\n\s*\n/).length;
        console.log(`There are ${paragraphs} paragraphs in ${file}`);
      }
    });
  });

  program
  .command('mostCommonWord')
  .description('Find the most common word in the file')
  .argument('<file>', 'file to analyze')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        const words = data.match(/\b\w+\b/g);
        const frequency = {};
        words.forEach(word => {
          frequency[word] = (frequency[word] || 0) + 1;
        });
        const mostCommonWord = Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b);
        console.log(`The most common word in ${file} is "${mostCommonWord}"`);
      }
    });
  });


  program.on('help', () => {
    console.log('\nExamples:');
    console.log('  $ node index.js countWords file.txt');
    console.log('  $ node index.js countLines file.txt');
    console.log('  $ node index.js countCharacters file.txt');
    console.log('  $ node index.js countParagraphs file.txt');
    console.log('  $ node index.js mostCommonWord file.txt');
  });

program.parse();
