const env = process.env

test('environment variables are set correctly', () => {
  expect(env.NODE_ENV).toBe('test')
  expect(env.SANITY).toBe('sane')
})
