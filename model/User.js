const { default: mongoose } = require('mongoose');
var mangoose = require('mongoose');
var Schema = mongoose.Schema;

try{
    mongoose.connect("mongodb://127.0.0.1:27017/UserDetails",
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("DB was connected successfully");
}catch(error){
    console.log(error);
}

var UserSchema = new Schema({
    fullName: {
        type:String,
        required:[true, 'Full Name was required']
    },
    email: {
        type: String,
        unique: [true, 'Email already exist'],
        trim: true,
        lowerCase: true,
        required: [true, 'Email was required'],
        validate: {
            validator: function(v){
                return '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
            }
        }
    },
    password: {
        type: String,
        required: [true, "Password should be specified"]
    },
    preferences: {
        type: String,
        enum: ["business","entertainment","general","health","science","sports","technology"]
    }
});

module.exports = mongoose.model('Users', UserSchema);