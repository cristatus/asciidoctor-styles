const path = require("path")
const CleanCSS = require("clean-css")

const { baseDir, cssDir, processFiles, readContent, writeContent } = require("./common")

function minify(file) {
  const name = path.basename(file, ".css")
  const output = path.join(cssDir, `${name}.min.css`)

  console.log(`Generating ${path.relative(baseDir, output)}`)

  const css = readContent(file)
  const res = new CleanCSS().minify(css)

  writeContent(output, res.styles)
}

processFiles(
  cssDir,
  ".css",
  file => minify(file),
  file => !file.endsWith(".min.css"),
)
