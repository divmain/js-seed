var path = require("path");

module.exports = {
  src: "src",
  dest: "dist",
  srcFullPath: path.join(__dirname, "src"),
  destFullPath: path.join(__dirname, "dist"),
  root: __dirname,

  js: "js",
  assets: "assets",
  styles: "styles",
  testRunner: "src/test-runner.js",
  karmaConfig: "karma.conf.js"
};
