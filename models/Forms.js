const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let FormsSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    content:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Widget'
        }],
        required: true,
        default: []
    },
    isClosed:{
      type:Boolean,
      required:true,
      default:false,
    },
    smallId:{
      type:String,
      required:true,
    },
    IPAdressPeopleAnswered:{
        type:String,
        default:[]
    },
});




let Forms = mongoose.model("Forms", FormsSchema);

module.exports = Forms;
