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
  testRunner: "frontend/test-runner.js",
  karmaConfig: "karma.conf.js",

  port: 3000,
  testPort: 3001,

  env: process.env.NODE_ENV || 'dev'
};
