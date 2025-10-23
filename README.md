# Nova Editor

A modern code editor built with Electron and React, inspired by VS Code.

## Features

✨ **Core Features:**
- 📝 **Monaco Editor Integration** - The same powerful editor used in VS Code
- 📁 **File Explorer** - Browse and open files from your workspace
- 🗂️ **Multi-Tab Support** - Work with multiple files simultaneously
- 💻 **Integrated Terminal** - Built-in terminal for running commands
- 🎨 **Syntax Highlighting** - Support for JavaScript, TypeScript, Python, HTML, CSS, and more
- 💾 **File Operations** - Open, save, and edit files with ease
- 🎯 **Status Bar** - View file information and editor status
- 🌙 **Dark Theme** - Beautiful dark theme inspired by VS Code

## Screenshots

The editor features a modern, clean interface with:
- Sidebar file explorer
- Tab-based file navigation
- Monaco editor with syntax highlighting
- Integrated terminal
- Status bar with file information

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

This will start both the Webpack dev server and Electron app.

## Building

To build the application for production:

```bash
npm run build
```

To package the application:

```bash
npm run package
```

The packaged application will be in the `release` folder.

## Usage

### Opening Files and Folders

- **Open File**: `Ctrl/Cmd + O` or File → Open File
- **Open Folder**: `Ctrl/Cmd + Shift + O` or File → Open Folder
- **Save File**: `Ctrl/Cmd + S` or File → Save

### Working with Files

1. **File Explorer**: Click on the folder icon in the sidebar to browse files
2. **Tabs**: Click on file names to switch between open files
3. **Close Tab**: Click the × button on any tab to close it
4. **Modified Files**: Tabs with unsaved changes show a blue dot

### Terminal

The integrated terminal appears at the bottom of the editor. You can use it to run commands in your workspace directory.

## Supported Languages

- JavaScript (.js, .jsx)
- TypeScript (.ts, .tsx)
- Python (.py)
- HTML (.html, .htm)
- CSS (.css, .scss, .sass)
- JSON (.json)
- Markdown (.md)
- And many more...

## Keyboard Shortcuts

- `Ctrl/Cmd + O` - Open File
- `Ctrl/Cmd + Shift + O` - Open Folder
- `Ctrl/Cmd + S` - Save File
- `Ctrl/Cmd + Q` - Quit
- `F11` - Toggle Fullscreen
- `Ctrl/Cmd + Plus` - Zoom In
- `Ctrl/Cmd + Minus` - Zoom Out

## Technology Stack

- **Electron** - Desktop application framework
- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Monaco Editor** - VS Code's editor component
- **XTerm.js** - Terminal emulator
- **Webpack** - Module bundler

## Project Structure

```
nova-editor/
├── src/
│   ├── main/              # Electron main process
│   │   └── main.ts        # Main process entry point
│   └── renderer/          # React renderer process
│       ├── components/    # React components
│       ├── styles/        # CSS stylesheets
│       ├── App.tsx        # Main app component
│       ├── index.tsx      # Renderer entry point
│       └── index.html     # HTML template
├── dist/                  # Build output
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── webpack.main.config.js # Webpack config for main process
└── webpack.renderer.config.js # Webpack config for renderer
```

## Future Enhancements

Potential features for future versions:
- Command palette (Ctrl+Shift+P)
- Find and replace
- Extensions system
- Git integration
- Multiple themes
- Settings panel
- IntelliSense and autocomplete
- Debugging support
- Split editor view
- Real terminal integration with node-pty

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT License - feel free to use this project for learning or building your own editor!

## Acknowledgments

- Inspired by [Visual Studio Code](https://code.visualstudio.com/)
- Built with [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- Terminal powered by [XTerm.js](https://xtermjs.org/)

