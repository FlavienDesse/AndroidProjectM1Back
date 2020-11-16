const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let WidgetSchema = new Schema({
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
        default:""
    },
    textFieldResult:{
        type: [String],
        default:[]
    },

    ///////////////////////

    /////////Note => type : 1/////////

    maxPoint:{
        type: Number,
        default:0
    },
    minPoint:{
        type: Number,
        default:0
    },
    resultPoint:{
        type: [Number],
        default:[]
    },

    ///////////////////////
});


let Widget = mongoose.model("Widget", WidgetSchema);

module.exports = Widget;
