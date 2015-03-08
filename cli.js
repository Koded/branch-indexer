#!/usr/bin/env node

var commander = require('commander');
var packageJson = require('./package.json');
var logger = require('winston');
var Q = require("q");

var Stash = require("./lib/stash");
var template = require("./lib/template");

commander
  .version(packageJson.version)
  .usage('[options] <host> <project> <repo>')
  .option('-u, --username <username>', 'Stash username')
  .option('-p, --password <password>', 'Stash password')
  .parse(process.argv);

var current = new Stash({
  host: commander.args[0],
  username: commander.username,
  password: commander.password,
  project: commander.args[1],
  repo: commander.args[2]
}).setLogger(logger);

current.getPullRequests().then(function(results) {
  template({
    host: commander.args[0],
    results: results
  }, function(out) {
    console.log(out);
  });
});
