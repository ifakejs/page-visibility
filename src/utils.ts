import { ValidConfigParams } from './types'

type BrowserPrefixes = 'moz' | 'ms' | 'o' | 'webkit'
type ReturnedHiddenProperty = 'mozHidden' | 'msHidden' | 'oHidden' | 'webkitHidden' | 'hidden'
type ReturnedVisibilityEvent =
  | 'mozvisibilitychange'
  | 'msvisibilitychange'
  | 'ovisibilitychange'
  | 'webkitvisibilitychange'
  | 'visibilitychange'
export type PrefixParams = BrowserPrefixes | null

// base prefix
const browserPrefixes: Array<string> = ['moz', 'ms', 'o', 'webkit']

export function getHiddenPropertyName(prefix: PrefixParams): ReturnedHiddenProperty {
  if (prefix) {
    return <ReturnedHiddenProperty>`${prefix}Hidden`
  }
  return 'hidden'
}

export function getVisibilityEvent(prefix: PrefixParams): ReturnedVisibilityEvent {
  if (prefix) {
    return <ReturnedVisibilityEvent>`${prefix}visibilitychange`
  }
  return 'visibilitychange'
}

export function getBrowserPrefix(): PrefixParams {
  for (let i = 0; i < browserPrefixes.length; i++) {
    const prefix = <BrowserPrefixes>browserPrefixes[i]
    if (getHiddenPropertyName(prefix) in document) {
      // return vendor prefix
      return prefix
    }
  }
  // no vendor prefix needed
  return null
}

export function validConfigParams(config: ValidConfigParams): Error | boolean {
  const validKey = ['trackFocus', 'trackBlur']
  if (typeof config !== 'object') {
    throw new Error('Config should be an object')
  }
  for (const key in config) {
    if (!validKey.includes(key)) {
      throw new Error('The valid params key are trackFocus and trackBlur')
    }
  }
  return true
}
