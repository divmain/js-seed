var path = require("path");

module.exports = {
  src: "frontend",
  dest: "frontend-dist",
  srcFullPath: path.join(__dirname, "frontend"),
  destFullPath: path.join(__dirname, "frontend-dist"),
  root: __dirname,

  js: "js",
  assets: "assets",
  styles: "styles",
  testRunner: "frontend/spec/test-runner.js",
  karmaConfig: "karma.conf.js",

  port: 3000,
  testPort: 3001
};
