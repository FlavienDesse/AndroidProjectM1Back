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
                    Forms.findById(req.body._id).populate("widget").exec(async function (error,doc) {
                       if(error){
                           res.status(500).send(error)
                       }
                       else if(!doc){
                           res.status(202).send({message: "Form unfindable"});
                       }
                       else{
                           let pos = actualUser.forms.findIndex((elem)=>req.body._id === elem)
                           actualUser.forms.splice(pos,1);
                           await actualUser.save()
                           for (let elem of doc.widget){
                               await elem.delete()
                           }
                           await doc.delete()

                           User.findById(req.user.id).populate("forms").exec(async function (err, user) {
                               if (err) {
                                   res.status(500).send(err);
                               } else if (user !== null) {
                                   User.populate(user, {
                                       path: 'forms.widget',
                                       model: 'Widget',
                                   }, function (err, result) {
                                       if (result) {
                                           user.password = undefined;
                                           res.send(user)
                                       }
                                   })
                               }

                           });

                       }
                    })



                }
                else{
                    res.status(202).send({message: "On essaye de hack c'est pas ouf"});
                }
            }
            else{
                res.status(202).send({message: "Erreur"});
            }
        } else {
            res.status(202).send({message: "bad id provided"});
        }
    } else {
        res.status(202).send({message: "missing id"});
    }
};