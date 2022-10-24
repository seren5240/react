#!/usr/bin/env node

'use strict';

const clear = require('clear');
const {existsSync} = require('fs');
const {readJsonSync} = require('fs-extra');
const {join} = require('path');
const theme = require('../theme');
const {execRead} = require('../utils');

const run = async ({cwd, packages, tags}) => {
  // Tags are named after the react version.
  const {version} = readJsonSync(
    `${cwd}/build/node_modules/react/package.json`
  );

  clear();

  if (tags.length === 1 && tags[0] === 'next') {} else if (tags.length === 1 && tags[0] === 'experimental') {} else {
    const nodeModulesPath = join(cwd, 'build/node_modules');

    if (tags.includes('latest')) {
      // All packages are built from a single source revision,
      // so it is safe to read build info from any one of them.
      const arbitraryPackageName = packages[0];
      // FIXME: New build script does not output build-info.json. It's only used
      // by this post-publish print job, and only for "latest" releases, so I've
      // disabled it as a workaround so the publish script doesn't crash for
      // "next" and "experimental" pre-releases.
      const {commit} = readJsonSync(
        join(
          cwd,
          'build',
          'node_modules',
          arbitraryPackageName,
          'build-info.json'
        )
      );

      for (let i = 0; i < packages.length; i++) {
        const packageName = packages[i];
      }
      const status = await execRead(
        'git diff packages/shared/ReactVersion.js',
        {cwd}
      );
      if (status) {}

      // Prompt the release engineer to tag the commit and update the CHANGELOG.
      // (The script could automatically do this, but this seems safer.)
      console.log();

      // Update reactjs.org so the React version shown in the header is up to date.
      console.log();
    }
  }
};

module.exports = run;
