const request = require('request');
const fs = require('fs');
const url = process.argv.slice(2, 3).join('');
const destination = process.argv.slice(3, 4).join('');

request(url, (error, response, body) => {
  fs.open(destination, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        console.error(`${destination} already exists`);

        return;
      }

      throw err;
    }

    writeMyData(body, destination);
  });
  //   fs.access(destination, fs.constants.F_OK, (err) => {
  //     if (err) {
  //       console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
  //     } else {

  //     }
  //   });
  //   console.log('body:', body); // Print the HTML for the Google homepage.
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
