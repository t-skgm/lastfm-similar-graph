/// <reference types="enzyme-adapter-preact-pure" />
/// <reference types="vite/client" />

declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}
