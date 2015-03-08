var request = require("request");
var _ = require("lodash");
var Q = require("q");
var fs = require("fs");
var path = require("path");

var API_BASE = "/rest/api/1.0/";

var stash = function(config) {
  this.host = config.host;
  this.username = config.username;
  this.password = config.password;
  this.project = config.project;
  this.repo = config.repo;

  return this;
};

stash.prototype.getPullRequests = function() {

  var deferred = Q.defer();

  this.requestGet().then(function(results) {
    deferred.resolve(results);
  }, function(error) {
    this.logger.error(error.message);
    deferred.reject(error);
  });

  return deferred.promise;
};

stash.prototype.setLogger = function(logger) {
  this.logger = logger;

  return this;
};

stash.prototype.requestGet = function() {

  var options = {
    uri: this.buildUrl(),
    auth: {
      user: this.username,
      pass: this.password
    }
  };

  var deferred = Q.defer();

  request.get(options, function(error, response, body) {

    var results = JSON.parse(body);

    deferred.resolve(results);

    if (error) {
      deferred.reject(error);
      return;
    }
  });

  return deferred.promise;
};

/**
 * Get the full API url
 *
 * @returns {string}
 */
stash.prototype.buildUrl = function() {
  return this.host + API_BASE + 'projects/' + this.project + '/repos/' + this.repo + '/pull-requests';
};

module.exports = stash;
