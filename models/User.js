const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FormsSchema = require("./Forms").Forms;


let UserSchema = new Schema({
    forms:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Forms'
        }],
        required: false,
        default: [],
    },
    // 0 => peut créer des forms      1 => peut créer des utilisateurs
    type:{
        type:Number,
        required:true,
    },
    username:{
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
