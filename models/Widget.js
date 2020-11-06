const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let Widget = new Schema({
    title: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    type:{
        type: Number,                                   // Correspond to which type of widget is refer to
        required: true,
    },

    /////////Questions => type :0/////////

    textField:{
        type: String,
        required: true,
    },
    textFieldResult:{
        type: String,
        required: true,
    },

    ///////////////////////

    /////////Note => type : 1/////////

    maxPoint:{
        type: Number,
        required: true,
    },
    minPoint:{
        type: Number,
        required: true,
    },
    resultPoint:{
        type: Number,
        required: true,
    },

    ///////////////////////
});


let Widget = mongoose.model("Widget", Widget);

module.exports = Widget;
