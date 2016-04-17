'use strict'

const webpack = require('webpack')
const conf = require('./webpack.config.js')
const packager = require('electron-packager')
const Zip = require('node-7z')
const fs = require('fs')

const compiler = webpack(conf)

const confPackage = JSON.parse(fs.readFileSync('./package.json'))

compiler.run((err, stats) => {
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

    const packagerConfDarwin = {
        dir: 'build',
        out: 'release/',
        name: confPackage.name,
        arch: 'x64',
        asar: true,
        platform: 'darwin',
        version: confPackage.dependencies['electron-prebuilt'],
        icon: 'src/app.icns',
        overwrite: true
    }

    if (process.env.ELECTRON_SIGN_DARWIN) {
        packagerConfDarwin['sign'] = process.env.ELECTRON_SIGN_DARWIN
    }

    packager(packagerConfDarwin, (err2, path) => {
        let archive = new Zip()
        archive.add(`release/${confPackage.name}-darwin-${confPackage.version}.7z`, `release/${confPackage.name}-darwin-x64/`, {
            m0: '=BCJ',
            m1: '=LZMA:d=21'
        }).then(() => {

        }).catch(err3 => console.error(err3))
    })

    const packagerConfWin32 = {
        dir: 'build',
        out: 'release/',
        name: confPackage.name,
        arch: ['ia32', 'x64'],
        asar: true,
        platform: 'win32',
        version: confPackage.dependencies['electron-prebuilt'],
        icon: 'tmp/app.ico',
        overwrite: true
    }

    packager(packagerConfWin32, (err2, pathes) => {
        pathes.forEach((path) => {
            const a = path.split('-')
            const platform = a[1]
            const arch = a[2]

            let archive = new Zip()
            archive.add(`release/${confPackage.name}-${platform}-${arch}-${confPackage.version}.7z`, path, {
                m0: '=BCJ',
                m1: '=LZMA:d=21'
            }).then(() => {

            }).catch(err3 => console.error(err3))

        })

    })

})
