const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const passport = require('passport')
const app = express()

// 라우터 불러오기
const userRouter = require('./routes/user')



// 미들웨어 사용등록
dotEnv.config()

// 데이터 베이스 설정
require('./config/database')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }))
app.use(passport.initialize())

// passport config
require('./config/passport')(passport)

// 라우터 사용
app.use('/user', userRouter)

// 포트등록
const port = process.env.SERVER_PORT || 7000
app.listen(port, console.log(`server started... at ${port}`))
