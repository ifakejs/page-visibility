import { PubSub } from '../src/PubSub'

describe('PubSub', () => {
  let instance: PubSub

  beforeEach(() => {
    instance = new PubSub()
  })

  it('should receive correct value when trigger event', done => {
    instance.on('test', (value: number) => {
      expect(value).toBe(1)
      done()
    })
    instance.trigger('test', 1)
  })

  it('should receive array of value when trigger multi arguments', done => {
    instance.on('test', (value: number) => {
      expect(value).toEqual([1, 2, 3])
      done()
    })
    instance.trigger('test', 1, 2, 3)
  })

  it('should not fire an unregistered event', () => {
    instance.trigger('test-fake', 1, 2, 3)
    expect(instance.listenEvent['test-fake']).toBe(undefined)
  })

  it('should trigger 1 times', done => {
    let trigger = 0
    const fn = () => {
      trigger++
      done()
    }
    instance.on('test', fn)
    instance.trigger('test', 1, 2, 3)
    instance.off('test', fn)
    instance.trigger('test', 1, 2, 3)
    expect(trigger).toBe(1)
  })

  it('off event failed', done => {
    let trigger = 0
    const fn = () => {
      trigger++
      done()
    }
    instance.on('test', fn)
    instance.off('test-fake', fn)
    instance.trigger('test', 1, 2, 3)
    expect(trigger).toBe(1)
  })

  it('off event failed when the callback name is error', done => {
    let trigger = 0
    const fn = () => {
      trigger++
      done()
    }
    instance.on('test', fn)
    // @ts-ignore
    instance.off('test')
    instance.trigger('test', 1, 2, 3)
    expect(trigger).toBe(1)
  })
})
