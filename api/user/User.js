var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
    name: {
        type: String,
        unique: true,
        required: 'Enter your user name please'
    },
  email: String,
  password: {
      type: String,
      required: 'Enter a password'
  }
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');