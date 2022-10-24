#!/usr/bin/env node

'use strict';

const clear = require('clear');
const {confirm} = require('../utils');
const theme = require('../theme');

const run = async () => {
  clear();

  await confirm('Do you want to proceed?');

  clear();
};

module.exports = run;
