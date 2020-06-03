const request = require('request');
const fs = require('fs');
const url = process.argv.slice(2, 3).join('');
const destination = process.argv.slice(3, 4).join('');

console.log(url);
console.log(destination);
request(url, (error, response, body) => {
  //   console.log('body:', body); // Print the HTML for the Google homepage.
  fs.writeFile(destination, body, (err) => {
    if (err) {
      console.eror(err);
    } else {
      console.log('wrote to file uccesfully');
    }
  });
});
