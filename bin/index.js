#!/usr/bin/env node

const { Command } = require('commander')
const pkg = require('../package.json')

const program = new Command()

program.addCommand(require('./commands/config'))

program
  .version(pkg.version)
  .parse(process.argv)
