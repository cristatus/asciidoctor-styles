const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")

const baseDir = path.dirname(__dirname)
const buildDir = path.join(baseDir, "build")

const adocDir = path.join(baseDir, "adoc")
const scssDir = path.join(baseDir, "scss")
const cssDir = path.join(baseDir, "css")

function processFiles(src, ext, callback, test = () => true) {
  if (process.argv.length > 2) {
    process.argv
      .slice(2)
      .filter(test)
      .forEach(name => callback(path.join(src, `${name}${ext}`)))
  } else {
    fs.readdirSync(src)
      .filter(file => path.extname(file) === `${ext}`)
      .filter(test)
      .forEach(file => callback(path.join(src, file)))
  }
}

function readContent(inputFile) {
  return fs.readFileSync(inputFile)
}

function writeContent(outputFile, content) {
  // ensure parent directory exists
  mkdirp.sync(path.dirname(outputFile))
  // write content
  fs.writeFileSync(outputFile, content)
}

module.exports = {
  baseDir,
  buildDir,
  adocDir,
  scssDir,
  cssDir,
  processFiles,
  readContent,
  writeContent,
}
