const express = require('express')
const app = express()

const apiRouter = require('./controllers')

// REVIEW consider using an API version prefix ie: /api/0.0.1/
app.use('/api', apiRouter)

app.listen(3001, () => console.log('Example app listening on port 3001!'))
