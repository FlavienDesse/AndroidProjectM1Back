const app = require('./app')
const connectDb = require('./mongoDbConnection');


connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`)
  })
})