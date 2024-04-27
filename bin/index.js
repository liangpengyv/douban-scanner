#!/usr/bin/env node

const { Command } = require('commander')

const pkg = require('../package.json')

const program = new Command()

program.addCommand(require('./commands/config'))
program.addCommand(require('./commands/get'))

program
  .version(pkg.version)
  .parse(process.argv)
