module.exports = {
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
