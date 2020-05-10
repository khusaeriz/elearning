/* eslint-disable */
const clear = require('clear');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');

const _config = require(__dirname + '/../ormconfig.json');

const run = async () => {
  clear();
  console.log(
    chalk.green(figlet.textSync('INSTALASI', { horizontalLayout: 'full' })),
  );

  const config1 = await inquirer.prompt([
    {
      name: 'TYPE',
      type: 'list',
      choices: ['MySQL', 'PostgreSQL'],
      message: 'Pilih database yang akan digunakan:',
      filter: (val) => (val === 'MySQL' ? 'mysql' : 'postgres'),
    },
    {
      name: 'HOST',
      type: 'input',
      message: 'Masukan host database (kosongkan untuk menggunakan localhost):',
      filter: (val) => (val === '' ? 'localhost' : val),
    },
  ]);
  
  const config2 = await inquirer.prompt([
    {
      name: 'PORT',
      type: 'input',
      message:
        'Masukan port database (kosongkan untuk menggunakan port default):',
      filter: (val) => {
        if (val !== '') return parseInt(val);
        if (config1.TYPE === 'mysql') return 3306;

        return 5432;
      },
    },
    {
      name: 'USERNAME',
      type: 'input',
      message:
        'Masukan username database (kosongkan untuk menggunakan username default):',
      filter: (val) => {
        if (val !== '') return val;
        if (config1.TYPE === 'mysql') return 'root';

        return 'postgres';
      },
    },

    {
      name: 'PASSWORD',
      type: 'input',
      message:
        'Masukan password database (kosongkan untuk menggunakan password default):',
      filter: (val) => {
        if (val !== '') return val;
        if (config1.TYPE === 'mysql') return '';

        return 'postgres';
      },
    },

    {
      name: 'DATABASE',
      type: 'input',
      message: 'Masukan nama database yang akan digunakan (default elearning):',
      filter: (val) => {
        if (val !== '') return val;

        return 'elearning';
      },
    },
  ]);

  const config = { ...config1, ...config2 };
  _config.type = config.TYPE;
  _config.host = config.HOST;
  _config.port = config.PORT;
  _config.username = config.USERNAME;
  _config.password = config.PASSWORD;
  _config.database = config.DATABASE;

  console.log('menyimpan konfigurasi');

  fs.writeFile(
    __dirname + '/../ormconfig.json',
    JSON.stringify(_config, null, 2),
    'utf-8',
    (err) => (err ? console.log(err) : null),
  );
};

run();
