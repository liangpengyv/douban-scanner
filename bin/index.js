#!/usr/bin/env node

const { Command } = require('commander')

const $T = require('./locales')
const pkg = require('../package.json')

const program = new Command()

program.addCommand(require('./commands/config'))
program.addCommand(require('./commands/get'))

program
  .version(pkg.version, '-v --version', $T('output the version number'))
  .addHelpCommand(false)
  .helpOption('-h --help', $T('display help for command'))
  .parse(process.argv)
