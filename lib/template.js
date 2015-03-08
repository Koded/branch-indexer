var Handlebars = require("handlebars");
var path = require("path");
var fs = require("fs");
var slug = require("slugg");

Handlebars.registerHelper('slug', function(link) {
  return new Handlebars.SafeString(slug(link));
});

Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);

  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

module.exports = function(config, cb) {

  module.host = config.host;

  var source = fs.readFileSync(path.resolve(__dirname, "..", "template.hbs"), 'utf-8');

  var template = Handlebars.compile(source);
  var result = template(config);

  cb(result);
};