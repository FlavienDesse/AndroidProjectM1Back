const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FormsSchema = require("./Forms").FormsSchema;


let UserSchema = new Schema({
    forms:{
        type: [FormsSchema],
        required: false,
    },
    userName:{
        type:String,
        required: true,
        unique:true,
    },
    creationDate :{
        type:Date,
        default:Date.now()
    },
    password: {
        type: String,
        required: true
    },
});



let User = mongoose.model("User", UserSchema);

module.exports = User;
