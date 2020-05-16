const path = require("path")
const asciidoctor = require("@asciidoctor/core")()
const highlightJsExt = require("asciidoctor-highlight.js")

const { baseDir, buildDir, adocDir, processFiles } = require("./common")

// register highlight.js extension
highlightJsExt.register(asciidoctor.Extensions)

// highlight.js extension is not adding hljs class to code tag
asciidoctor.Extensions.register(function () {
  this.postprocessor(function () {
    this.process((doc, output) => output.replace(/class="highlight"/g, 'class="hljs highlight"'))
  })
})

function convert(file, { standalone = true, attributes = {} } = {}) {
  console.log(`Converting ${path.relative(baseDir, file)}`)

  asciidoctor.convertFile(file, {
    standalone,
    base_dir: path.join(adocDir, "examples"),
    to_dir: buildDir,
    safe: "unsafe",
    mkdirs: true,
    attributes: {
      ...attributes,
      docinfo: "shared-head",
      linkcss: true,
      stylesheet: "../css/asciidoctor-next.css",
      imagesdir: "../adoc/images",
      "source-highlighter": "highlightjs-ext",
    },
  })
}

// process argv
processFiles(`${adocDir}/examples`, ".adoc", file => convert(file))
