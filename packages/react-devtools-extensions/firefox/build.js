#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const build = require('../build');

const main = async () => {
  await build('firefox');
};

main();

module.exports = {main};
