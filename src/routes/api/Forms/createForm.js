const Forms = require('../../../../models/Forms');
const Widget = require('../../../../models/Widget');
const User = require('../../../../models/User');


module.exports =async function (req, res) {
    if (req.body.title !== undefined && req.body.arrayWidget !== undefined) {
        let arrayOfCreatedWidget = [];
        let error = false;
        let index = 0;
        for (let element of req.body.arrayWidget) {
            if (element.title !== undefined && element.type !== undefined) {
                let temp;
                if (element.type === 0) {
                    if (element.textField !== undefined) {
                        temp = new Widget({
                            title: element.title,
                            type: 0,
                            order:index,
                            textField: element.textField
                        })
                    } else {
                        error = true
                        break
                    }
                } else if (element.type === 1) {
                    if (element.maxPoint !== undefined && element.minPoint !== undefined) {
                        temp = new Widget({
                            title: element.title,
                            type: 0,
                            order,index,
                            maxPoint: element.maxPoint,
                            minPoint: element.minPoint,
                        })
                    } else {
                        error = true
                        break
                    }
                } else {
                    error = true
                    break
                }
                index+=1;
                arrayOfCreatedWidget.push(temp)
            } else {
                error = true
                break
            }

        }
        if (error) {
            res.status(202).send({
                message: "Incomplete body"
            })
        } else {

            let actualUser = await User.findById(req.user.id);
            let smallId = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
            
            while(actualUser.allForms.equal((elem)=> elem.smallId === smallId)){
                smallId = Math.random().toString(36).substr(2, 5);

            }


            if(actualUser){
                for (let elem of arrayOfCreatedWidget){
                    elem.save()
                }
                let newForm = new Forms({
                    title: req.body.title,
                    content: arrayOfCreatedWidget,
                    isClosed: false,
                    smallId: smallId
                });


                actualUser.forms =  actualUser.forms.concat(newForm)
                await actualUser.save()
                await newForm.save()

                res.status(200).send({
                    message : "Success"
                })
            }
            else{
                res.status(202).send({
                    message : "Error"
                })
            }
        }

    } else {
        res.status(202).send({
            message: "Incomplete body"
        })
    }
};