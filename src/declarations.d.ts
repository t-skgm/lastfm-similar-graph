/// <reference types="enzyme-adapter-preact-pure" />

declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}
