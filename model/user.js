const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar')
const normalize = require('normalize-url');

const userSchema = new mongoose.Schema(
  {
    name : {
      type : String,
      required : true
    },
    email : {
      type : String,
      required: true
    },
    password : {
      type : String,
      required : true
    },
    profileImage : {
      type : String
    },
    role : {
      type : String,
      default : 'user'
    },
    resetPasswordLink : ""
  },
  {
    timestamps : true
  }
)

// 저장하기 직전
userSchema.pre('save', async function (next) {
  try {
    console.log('entered...')

    // const avatar = gravatar.url(this.email, {
    //   s : '200',
    //   r : 'pg',
    //   d : 'mm'
    // })

    const avatar = normalize(
      gravatar.url(this.email, {
        s : '200',
        r : 'pg',
        d : 'mm'
      }),
      { forceHttps : true }
    )

    this.profileImage = avatar

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(this.password, salt)
    this.password = passwordHash

    console.log('exited...')
    next()
  } catch (err) {
    next(err)
  }
})

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}


module.exports = mongoose.model('user', userSchema)