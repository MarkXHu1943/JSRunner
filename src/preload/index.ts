import type { readFileSync as _readFileSync } from 'fs'
import type { Buffer as _Buffer } from 'buffer'
import type _vm from 'vm'

declare global {
  interface Window {
    preload: {
      electron: any
      Buffer: typeof _Buffer
      require: NodeRequire
      vm: typeof _vm
      readFileSync: typeof _readFileSync
    }
  }
}

const empty = () => null

export const electron = window?.preload?.electron || {}
export const Buffer = window?.preload?.Buffer || {}
export const require = window?.preload?.require || empty
export const vm = window?.preload?.vm || {}
export const readFileSync = window?.preload?.readFileSync || empty
