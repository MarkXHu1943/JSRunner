import { transform } from '@babel/standalone'

export function compileTypeScript(code: string, tsconfig?: any) {
  const res = transform(code, {
    filename: 'temp.ts',
    presets: ['typescript'],
    ...tsconfig
  })
  return res.code
}
