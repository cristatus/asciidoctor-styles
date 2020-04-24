const path = require("path")
const sass = require("node-sass")

const { baseDir, scssDir, cssDir, processFiles, writeContent } = require("./common")

function compile(file) {
  const name = path.basename(file, `.scss`)
  const output = `${cssDir}/${name}.css`

  console.log(`Compiling ${path.relative(baseDir, file)}`)

  const result = sass.renderSync({
    file,
    outputStyle: `expanded`,
    precision: 6,
  })

  // save output
  writeContent(output, result.css)
}

// process argv
processFiles(scssDir, ".scss", file => compile(file))
