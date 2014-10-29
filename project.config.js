var path = require("path");

module.exports = {
  src: "frontend",
  dest: "frontend-dist",
  frontendFullPath: path.join(__dirname, "frontend"),
  destFullPath: path.join(__dirname, "frontend-dist"),
  root: __dirname,

  js: "js",
  assets: "assets",
  styles: "styles",
  testRunner: "spec/frontend/test-runner.js",
  karmaConfig: "karma.conf.js",
  spec: "spec",

  port: 3000,
  testPort: 3001
};
