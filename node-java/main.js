var app = require('app');
var BrowserWindow = require('browser-window');
var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 1024
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});