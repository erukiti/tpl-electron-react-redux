const app = require('electron').app
const BrowserWindow = require('electron').BrowserWindow

app.on('window-all-closed', () => {
    app.quit()
})

let win

app.on('ready', () => {
    win = new BrowserWindow({
        width: 800,
        height: 600
    })
    win.loadURL(`file://${__dirname}/../renderer/index.html`)
    win.on('closed', () => {
        win = null
    })
    try {
        const client = require('electron-connect').client
        let cl = client.create(win)
        app.on('quit', () => {
            cl.sendMessage('quit')
        })
    } catch (err) {
        // console.dir(err)
        // nice catch !!!!!!
    }
})
