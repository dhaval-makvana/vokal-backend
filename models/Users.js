const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema ({
    name: {
        type: String
    },
    contactNumber: {
        type: String
    },
    comments: {
        type: Array
    },
    posts: {
        type: Array
    },
    email: {
        type: String
    }
})

UserSchema.plugin(passportLocalMongoose, {
    selectFields: 'username contactNumber password email name'
})

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;