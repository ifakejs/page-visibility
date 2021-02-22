import { PubSub } from './PubSub'
import {
  getBrowserPrefix,
  getHiddenPropertyName,
  getVisibilityEvent,
  validConfigParams
} from './utils'
import { ValidConfigParams } from './types'

export const VISIBILITY_EVENT_NAME = Symbol('VISIBILITY_EVENT_NAME')

class PageVisibility extends PubSub {
  public config: ValidConfigParams
  public isVisible: boolean
  public listener: EventListenerOrEventListenerObject
  readonly browserPrefix: string | null
  readonly hiddenPropertyName: string
  readonly visibilityEventName: string
  constructor() {
    super()
    this.config = {
      trackFocus: false,
      trackBlur: false
    }
    this.isVisible = true
    this.browserPrefix = getBrowserPrefix()
    this.hiddenPropertyName = getHiddenPropertyName(this.browserPrefix)
    this.visibilityEventName = getVisibilityEvent(this.browserPrefix)
    this.listener = this.handleVisibilityChange.bind(this)
    this.observe()
  }

  // placeholder
  setConfig(config: ValidConfigParams): void {
    const isValid = validConfigParams(config)
    if (isValid) {
      this.config = {
        ...this.config,
        ...config
      }
    }
  }

  observe() {
    document.addEventListener(this.visibilityEventName, this.listener, false)
  }

  unobserve() {
    document.removeEventListener(this.visibilityEventName, this.listener, false)
  }

  handleVisibilityChange(forcedFlag: boolean | any) {
    if (typeof forcedFlag === 'boolean') {
      if (forcedFlag) {
        return this.onVisible()
      }
      return this.onHidden()
    }

    if ((document as any)[this.hiddenPropertyName]) {
      return this.onHidden()
    }

    return this.onVisible()
  }

  onVisible() {
    // prevent double execution
    if (this.isVisible) {
      return
    }
    // change flag value
    this.isVisible = true
    this.trigger(VISIBILITY_EVENT_NAME, true)
  }

  onHidden() {
    // prevent double execution
    if (!this.isVisible) {
      return
    }
    // change flag value
    this.isVisible = false
    this.trigger(VISIBILITY_EVENT_NAME, false)
  }
}
const pageVisibility = new PageVisibility()

export { pageVisibility, ValidConfigParams, PageVisibility, PubSub }
