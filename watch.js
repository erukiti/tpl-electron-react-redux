'use strict'

const webpack = require('webpack')
const conf = require('./webpack.config.js')

const compiler = webpack(conf)

let electron = null

compiler.watch({}, (err, stats) => {
    if (err) {
        // FIXME
        console.dir(err)
        return
    }

    if (stats.hasWarnings()) {
        stats.compilation.warnings.forEach(warning => {
            // FIXME
            console.dir(warning)
        })
    }

    if (stats.hasErrors()) {
        stats.compilation.errors.forEach(error => {
            console.log(error.error.toString())
            if (error.error.codeFrame) {
                console.log(error.error.codeFrame)
            }
        })
        return
    }

    if (!electron) {
        electron = require('electron-connect').server.create({ path: 'build/' })
        electron.start()
        electron.on('quit', () => process.exit(0))
    } else {
        electron.restart()
    }
})
