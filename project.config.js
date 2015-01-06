var path = require("path");

var config = module.exports = {};

config.root = __dirname;
config.src = "src";
config.dest = "dist";
config.srcFullPath = path.join(config.root, config.src);
config.destFullPath = path.join(config.root, config.dest);

config.js = "js";
config.assets = "assets";
config.styles = "styles";
config.karmaConfig = "karma.conf.js";
config.testRunner = path.join(config.src, "test-runner.js");
