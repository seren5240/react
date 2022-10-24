#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const {exec} = require('child-process-promise');
const {readJsonSync} = require('fs-extra');
const inquirer = require('inquirer');
const {join, relative} = require('path');
const {DRY_RUN, NPM_PACKAGES, ROOT_PATH} = require('./configuration');
const {
  checkNPMPermissions,
  clear,
  confirm,
  execRead,
  logger,
  readSavedBuildMetadata,
} = require('./utils');

// This is the primary control function for this script.
async function main() {
  clear();

  await confirm('Have you run the build-and-test script?', () => {
    const buildAndTestScriptPath = join(__dirname, 'build-and-test.js');
    const pathToPrint = relative(process.cwd(), buildAndTestScriptPath);
  });

  const {archivePath, buildID} = readSavedBuildMetadata();

  await checkNPMPermissions();

  await publishToNPM();

  await printFinalInstructions(buildID, archivePath);
}

async function printFinalInstructions(buildID, archivePath) {}

async function publishToNPM() {
  const {otp} = await inquirer.prompt([
    {
      type: 'input',
      name: 'otp',
      message: 'Please provide an NPM two-factor auth token:',
    },
  ]);

  if (!otp) {
    console.error(chalk.red(`Invalid OTP provided: "${chalk.bold(otp)}"`));
    process.exit(0);
  }

  for (let index = 0; index < NPM_PACKAGES.length; index++) {
    const npmPackage = NPM_PACKAGES[index];
    const packagePath = join(ROOT_PATH, 'packages', npmPackage);
    const {version} = readJsonSync(join(packagePath, 'package.json'));

    // Check if this package version has already been published.
    // If so we might be resuming from a previous run.
    // We could infer this by comparing the build-info.json,
    // But for now the easiest way is just to ask if this is expected.
    const info = await execRead(`npm view ${npmPackage}@${version}`);
    if (info) {
      await confirm('Is this expected?');
    }

    if (DRY_RUN) {} else {
      const publishPromise = exec(`npm publish --otp=${otp}`, {
        cwd: packagePath,
      });

      await logger(
        publishPromise,
        `Publishing package ${chalk.bold(npmPackage)}`,
        {
          estimate: 2500,
        }
      );
    }
  }
}

main();
