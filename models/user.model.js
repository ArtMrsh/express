const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   name: { type: String },
   email: { type: String }
})

userSchema.pre('save', function (next) {
  let model = this;
  if (this.isModified('password')) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(model.password, salt, function (err, hash) {
        model.password = hash;
        next();
      });
    });
  }
});

module.exports = mongoose.model('User', userSchema);