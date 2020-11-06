const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Widget = require("./Widget.js").Widget;


let FormsSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    content:{
        type:[Widget],
        required: true,
    },


});




let FormsSchema = mongoose.model("FormsSchema", FormsSchema);

module.exports = FormsSchema;
