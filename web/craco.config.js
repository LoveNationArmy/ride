module.exports = {
  eslint: {
    mode: 'extends',
    configure: {
      extends: 'react-app',
      parser: 'babel-eslint',
      env: {
        browser: true
      },
      rules: {
        'jsx-a11y/alt-text': 'off'
      }
    }
  },
  babel: {
    plugins: [
      [
        'flow-runtime', {
          annotate: true,
          assert: true
        }
      ]
    ]
  }
}
