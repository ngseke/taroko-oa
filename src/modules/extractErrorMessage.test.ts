import { extractErrorMessage } from './extractErrorMessage'

describe('extractErrorMessage', () => {
  test('extractErrorMessage', () => {
    const message = 'test message'
    expect(extractErrorMessage(new Error(message))).toBe(message)
    expect(extractErrorMessage({
      response: { data: { message } },
    })).toBe(message)
    expect(extractErrorMessage(message)).toBe(message)
  })
})
