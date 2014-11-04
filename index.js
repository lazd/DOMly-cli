#!/usr/bin/env node

var domly = require('domly');
var fs = require('fs');
var program = require('commander');
var pkg = require('./package.json');

program
  .version(pkg.version)
  .usage('[options] <files ...>')
  .option('-d, --debug', 'Dump debug data')
  .option('-s, --strip-whitespace', 'Strip whitespace')
  .option('--no-frags', 'Don\'t use cached DocumentFragments')
  .option('--append-class-names', 'Append CSS classnames instead of setting them directly')
  .option('--preserve-handle-attr', 'Preserve the handle attribute on created elements')
  .option('--preserve-comments', 'Preserve comments when parsing HTML')
  .parse(process.argv);

// Invert this arg as Commander tries to name it as a negated argument
program.noFrags = !program.frags;

program.args.forEach(function(filepath) {
  var result = domly.precompile(fs.readFileSync(filepath).toString(), {
    debug: program.debug,
    stripWhitespace: program.stripWhitespace,
    noFrags: program.noFrags,
    appendClassNames: program.appendClassNames,
    preserveHandleAttr: program.preserveHandleAttr,
    preserveComments: program.preserveComments
  });

  if (!program.debug) {
    console.log(result);
  }
});
