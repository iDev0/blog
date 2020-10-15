const mongoose = require('mongoose');
const dbOptions = {
  useNewUrlParser : true,
  useUnifiedTopology : true,
  useFindAndModify : false
}

mongoose
  .connect(process.env.DATABASE_ADDRESS, dbOptions)
  .then(() => {
    console.log('db connected...')
  })
  .catch(err => {
    console.log(err.message)
  })