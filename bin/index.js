#!/usr/bin/env node

import { Command } from 'commander'
import { readFileSync } from 'node:fs'
import path from 'node:path'

import $T from './locales/index.js'
import {
  configCommand,
  getCommand
} from './commands/index.js'

const pkg = JSON.parse(readFileSync(path.join(import.meta.dirname, '../package.json')).toString())

const program = new Command()

program.addCommand(configCommand)
program.addCommand(getCommand)

program
  .version(pkg.version, '-v --version', $T('output the version number'))
  .addHelpCommand(false)
  .helpOption('-h --help', $T('display help for command'))
  .parse(process.argv)
