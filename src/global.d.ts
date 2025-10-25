/// <reference types="node" />

declare global {
  interface Window {
    require: any;
  }
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

