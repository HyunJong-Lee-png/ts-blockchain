

declare module "myPackage" {
  interface Config {
    url: string
  }
  function init(config: Config): boolean
  function exit(code: number): number
}