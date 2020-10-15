const userModel = require('../model/user')
const jwt = require('jsonwebtoken')


//  회원가입
exports.create = (req, res) => {

  const { name, email, password } = req.body

  userModel
    .findOne({email})
    .then(user => {
      if (user) {
        return res.json({
          message : 'user is existed...'
        })
      }

      const newUser = new userModel({
        name,
        email,
        password
      })

      newUser
        .save()
        .then(user => {
          res.json({
            message : 'user created ...',
            userInfo : user
          })
        })
        .catch(err => {
          res.status(500).json(err)
        })

    })
    .catch(err => {
      res.status(500).json(err)
    })
}

// 로그인
exports.login = (req, res) => {

  const { email, password } = req.body

  userModel
    .findOne({ email })
    .then(user => {
      if (!user) {
        return res.json({
          message : 'user is not found...'
        })
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(400).json({
            message : 'password is incorrect'
          })
        }

        // json web token
        const token = jwt.sign(
          { id : user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn : '1d'}
        )

        res.json({
          message : 'user login...',
          success : isMatch,
          token,
        })

      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

// 회원정보 불러오기
exports.current = (req, res) => {
  userModel
    .findById(req.user.id)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}