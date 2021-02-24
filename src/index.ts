import { PubSub } from './PubSub'
import {
  getBrowserPrefix,
  getHiddenPropertyName,
  getVisibilityEvent,
  validConfigParams,
  PrefixParams,
  HiddenPropertyName,
  VisibilityEventName
} from './utils'
import { ValidConfigParams } from './types'

interface ObserveCb {
  // eslint-disable-next-line no-unused-vars
  (isVisible: boolean): () => void
}

const VISIBILITY_EVENT_NAME = '__VISIBILITY_EVENT_NAME__'

class PageVisibility extends PubSub {
  public isVisible: boolean
  public config: ValidConfigParams
  public listener: EventListenerOrEventListenerObject
  readonly browserPrefix: PrefixParams
  readonly hiddenPropertyName: HiddenPropertyName
  readonly visibilityEventName: VisibilityEventName
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
    this.observable()
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

  observable() {
    document.addEventListener(this.visibilityEventName, this.listener, false)
  }

  observe(cb: ObserveCb) {
    this.on(VISIBILITY_EVENT_NAME, (isVisible: boolean) => {
      cb && cb(isVisible)
    })
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
    if (this.isVisible) {
      return
    }
    this.isVisible = true
    this.trigger(VISIBILITY_EVENT_NAME, this.isVisible)
  }

  onHidden() {
    if (!this.isVisible) {
      return
    }
    this.isVisible = false
    this.trigger(VISIBILITY_EVENT_NAME, this.isVisible)
  }
}
const pageVisibility = new PageVisibility()

export { pageVisibility, ValidConfigParams }
