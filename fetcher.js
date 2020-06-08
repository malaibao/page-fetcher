const request = require('request');
const fs = require('fs');
const url = process.argv.slice(2, 3).join('');
const destination = process.argv.slice(3, 4).join('');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

request(url, (error, response, body) => {
  fs.open(destination, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        console.error(`${destination} already exists`);

        rl.question(
          'Do you want to overwrite the file? If yes, please enter "Y". ',
          (answer) => {
            if (answer === 'Y') {
              writeMyData(body, destination);
            } else {
              console.log('File remained unchanged.');
            }
            rl.close();
          }
        );

        return;
      }

      throw err;
    }

    writeMyData(body, destination);
  });
});

const writeMyData = (data, destination) => {
  fs.writeFile(destination, data, (error) => {
    if (error) {
      console.eror(error);
    } else {
      console.log('wrote to file uccesfully');
    }
  });
};
