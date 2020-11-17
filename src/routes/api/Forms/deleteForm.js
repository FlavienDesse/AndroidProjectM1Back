const ObjectId = require("mongoose").Types.ObjectId;
const Forms = require('../../../../models/Forms')
const User =  require('../../../../models/User')
const Widget = require('../../../../models/Widget');

module.exports = async function (req, res) {
    if (req.body._id !== undefined) {
        if (ObjectId.isValid(req.body._id)) {
            let actualUser = await User.findById(req.user.id);
            if(actualUser){
                if(actualUser.forms.includes(req.body._id)){
                    Forms.findById(req.body._id).populate("content").exec(async function (error,doc) {
                       if(error){
                           res.status(422).send(error)
                       }
                       else if(!doc){
                           res.status(422).send({errorMessage: "Form unfindable"});
                       }
                       else{
                           let pos = actualUser.forms.findIndex((elem)=>req.body._id === elem)
                           actualUser.forms.splice(pos,1);
                           await actualUser.save()
                           for (let elem of doc.content){
                               await elem.delete()
                           }
                            doc.delete()
                           res.status(200).send({
                               errorMessage : "Success"
                           })
                       }
                    })



                }
                else{
                    res.status(422).send({errorMessage: "On essaye de hack c'est pas ouf"});
                }
            }
            else{
                res.status(422).send({errorMessage: "Erreur"});
            }
        } else {
            res.status(422).send({errorMessage: "bad id provided"});
        }
    } else {
        res.status(422).send({errorMessage: "missing id"});
    }
};