import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: true,
    backgroundColor: '#1e1e1e',
    icon: path.join(__dirname, 'icon.png'),
  });

  //loading the electron app through https://localhost:3000
  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  createMenu();
}

function createMenu() {
  const template: any = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open File',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            openFile();
          },
        },
        {
          label: 'Open Folder',
          accelerator: 'CmdOrCtrl+Shift+O',
          click: () => {
            openFolder();
          },
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('save-file');
            }
          },
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

async function openFile() {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openFile'],
    filters: [
      { name: 'All Files', extensions: ['*'] },
      { name: 'Text Files', extensions: ['txt', 'md'] },
      { name: 'JavaScript', extensions: ['js', 'jsx', 'ts', 'tsx'] },
      { name: 'HTML', extensions: ['html', 'htm'] },
      { name: 'CSS', extensions: ['css', 'scss', 'sass'] },
    ],
  });

  if (!result.canceled && result.filePaths.length > 0) {
    const filePath = result.filePaths[0];
    const content = fs.readFileSync(filePath, 'utf-8');
    mainWindow?.webContents.send('file-opened', {
      path: filePath,
      content: content,
      name: path.basename(filePath),
    });
  }
}

async function openFolder() {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openDirectory'],
  });

  if (!result.canceled && result.filePaths.length > 0) {
    const folderPath = result.filePaths[0];
    mainWindow?.webContents.send('folder-opened', folderPath);
  }
}

// IPC Handlers
ipcMain.handle('read-file', async (event, filePath: string) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return { success: true, content };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('write-file', async (event, filePath: string, content: string) => {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('read-directory', async (event, dirPath: string) => {
  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    const result = items.map((item) => ({
      name: item.name,
      isDirectory: item.isDirectory(),
      path: path.join(dirPath, item.name),
    }));
    return { success: true, items: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-file-stats', async (event, filePath: string) => {
  try {
    const stats = fs.statSync(filePath);
    return {
      success: true,
      isDirectory: stats.isDirectory(),
      isFile: stats.isFile(),
      size: stats.size,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
