# Quick Start Guide

Get Nova Editor up and running in 3 simple steps!

## Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including Electron, React, Monaco Editor, and more.

## Step 2: Start the Application

Once installation is complete, start the editor:

```bash
npm start
```

This command will:
1. Start the Webpack development server
2. Launch the Electron application
3. Open the editor window

## Step 3: Start Coding!

When the editor opens:

1. **Open a folder**: Press `Ctrl+Shift+O` (or `Cmd+Shift+O` on Mac)
2. **Browse files**: Use the file explorer on the left sidebar
3. **Edit files**: Click on any file to open it in the editor
4. **Save changes**: Press `Ctrl+S` (or `Cmd+S` on Mac)

## Tips

- **Multiple files**: Open multiple files and switch between them using tabs
- **Terminal**: Use the integrated terminal at the bottom to run commands
- **Modified files**: Files with unsaved changes show a blue dot on their tab
- **Dark theme**: The editor uses a beautiful dark theme by default

## Troubleshooting

### If `npm install` fails:

Try using the legacy peer deps flag:
```bash
npm install --legacy-peer-deps
```

### If the editor won't start:

1. Make sure port 3000 is available
2. Check that Node.js version is 16 or higher: `node --version`
3. Delete `node_modules` and `dist` folders, then run `npm install` again

### If Monaco Editor doesn't load:

1. Clear your build: `rm -rf dist` (or `rmdir /s dist` on Windows)
2. Rebuild: `npm run build`
3. Restart: `npm start`

## Building for Production

To create a distributable version:

```bash
npm run build
npm run package
```

The packaged app will be in the `release` folder.

## Need Help?

Check the full README.md for more detailed documentation and features!

