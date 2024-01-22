export type Feature = {
  code: string
  explain: string
  platform: ('darwin' | 'win32' | 'linux') | Array<'darwin' | 'win32' | 'linux'>
  icon?: string
  cmds: (TextCmd | RegexCmd | OverCmd | ImgCmd | FilesCmd | WindowCmd)[]
}

export interface TextCmd {
  type: 'text'
  label: string
}

export interface RegexCmd {
  type: 'regex'
  label: string
  match: string
  minLength?: number
  maxLength?: number
}

export interface OverCmd {
  type: 'over'
  label: string
  exclude?: string
  minLength?: number
  maxLength?: number
}

export interface ImgCmd {
  type: 'img'
  label: string
}

export interface FilesCmd {
  type: 'files'
  label: string
  fileType?: 'file' | 'directory'
  match?: string
  minLength?: number
  maxLength?: number
}

export interface WindowCmd {
  type: 'window'
  label: string
  match: {
    app: string
    title?: string
    class?: string
  }
}
