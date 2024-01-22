export const isElectron = window && typeof window?.utools !== 'undefined'
export const SERVER_DEV = import.meta.env.DEV
export const PLATFORM = utools.isMacOS()
  ? 'darwin'
  : utools.isWindows()
  ? 'win32'
  : utools.isLinux()
  ? 'linux'
  : 'unknown'
