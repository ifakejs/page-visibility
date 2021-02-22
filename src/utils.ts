import { ValidConfigParams } from './types'

const browserPrefixes: Array<string> = ['moz', 'ms', 'o', 'webkit']

export function getHiddenPropertyName(prefix: string | null) {
  return prefix ? prefix + 'Hidden' : 'hidden'
}

export function getVisibilityEvent(prefix: string | null) {
  return (prefix ? prefix : '') + 'visibilitychange'
}

export function getBrowserPrefix() {
  for (let i = 0; i < browserPrefixes.length; i++) {
    if (getHiddenPropertyName(browserPrefixes[i]) in document) {
      // return vendor prefix
      return browserPrefixes[i]
    }
  }
  // no vendor prefix needed
  return null
}

export function validConfigParams(config: ValidConfigParams) {
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
