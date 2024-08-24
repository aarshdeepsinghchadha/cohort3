const { Command } = require('commander');
const program = new Command();

program
  .name('evenChecker')
  .description('CLI to check if a number is even or not')
  .version('1.0.0');

program
  .command('check')
  .description('Check if a number is even')
  .argument('<number>', 'number to check')
  .action((number) => {
    const num = parseInt(number, 10);

    if (isNaN(num)) {
      console.error('Invalid number. Please provide a valid integer.');
      process.exit(1);
    }

    if (num % 2 === 0) {
      console.log(`${num} is an even number.`);
    } else {
      console.log(`${num} is an odd number.`);
    }
  });

  program
  .command('help')
  .description('Display help information')
  .action(() => {
    program.help();
  });

program.parse();
