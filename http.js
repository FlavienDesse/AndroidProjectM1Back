const app = require('./app.js')
const connectDb = require('./mongoDbConnection.js');


connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`)
  })
})