var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

fs.copyFile(path.join(process.env.PWD, '/Web.config'), path.join(process.env.PWD, '/dist/Web.config'), (err) => {
  if (err) throw err;
  console.log(chalk.green('Web.Config has been successfully created.'));
});