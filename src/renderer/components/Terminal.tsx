import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import '../styles/Terminal.css';

interface TerminalProps {
  workingDirectory: string;
}

const Terminal: React.FC<TerminalProps> = ({ workingDirectory }: TerminalProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    try {
      // Create terminal
      const xterm = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Consolas, "Courier New", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#ffffff',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#e5e5e5',
      },
    });

    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);

    xterm.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = xterm;
    fitAddonRef.current = fitAddon;

    // Simple command handling (basic simulation)
    let currentLine = '';
    const prompt = () => {
      xterm.write('\r\n$ ');
    };

    xterm.writeln('Nova Terminal');
    xterm.writeln('Type your commands below (Note: This is a basic terminal simulation)');
    prompt();

    xterm.onData((data: string) => {
      const code = data.charCodeAt(0);

      if (code === 13) {
        // Enter
        xterm.write('\r\n');
        if (currentLine.trim()) {
          xterm.writeln(`Command executed: ${currentLine}`);
          xterm.writeln('(Full terminal support requires node-pty integration)');
        }
        currentLine = '';
        prompt();
      } else if (code === 127) {
        // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          xterm.write('\b \b');
        }
      } else if (code >= 32) {
        // Printable character
        currentLine += data;
        xterm.write(data);
      }
    });

    // Handle resize
    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        try {
          xterm.dispose();
        } catch (error) {
          console.warn('Error disposing terminal:', error);
        }
      };
    } catch (error) {
      console.error('Error initializing terminal:', error);
    }
  }, []);

  return (
    <div className="terminal-component">
      <div className="terminal-header">
        <span>Terminal</span>
      </div>
      <div className="terminal-body" ref={terminalRef}></div>
    </div>
  );
};

export default Terminal;

