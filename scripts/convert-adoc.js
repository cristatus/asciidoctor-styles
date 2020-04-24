const path = require("path")
const asciidoctor = require("@asciidoctor/core")()

const { baseDir, buildDir, adocDir, processFiles } = require("./common")

function convert(file, { standalone = true, attributes = {} } = {}) {
  console.log(`Converting ${path.relative(baseDir, file)}`)

  asciidoctor.convertFile(file, {
    standalone,
    to_dir: buildDir,
    mkdirs: true,
    attributes: {
      ...attributes,
      linkcss: true,
      stylesheet: "../css/asciidoctor.css",
      imagesdir: "../adoc/images",
    },
  })
}

// process argv
processFiles(`${adocDir}/examples`, ".adoc", file => convert(file))
