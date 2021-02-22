export class PubSub {
  public listenEvent: Record<any, any>
  constructor() {
    this.listenEvent = {}
  }
  on(key: string, fn: Function): void {
    if (!this.listenEvent[key]) {
      this.listenEvent[key] = []
    }
    this.listenEvent[key].push(fn)
  }
  trigger(...arg: any[]): void {
    const fnName = arg[0]
    const args = arg.splice(1)
    const fns = this.listenEvent[fnName]
    if (!fns) {
      return
    }
    for (let i = 0; i < fns.length; i++) {
      const fnTarget = fns[i]
      fnTarget.apply(this, args.length > 1 ? [args] : args)
    }
  }
  off(key: string, fn: Function): void {
    const fns = this.listenEvent[key]
    if (!fns) {
      return
    }
    if (fns?.length && typeof fn === 'function') {
      for (let i = 0; i < fns.length; i++) {
        const _fns = fns[i]
        if (_fns === fn) {
          fns.splice(i, 1)
        }
      }
    }
  }
}
