var Userdb = require('../model/model')

//create and save new user
exports.create = (req,res)=>{
    //vallidate request
    if(!req.body){
        res.status(400).send({message : "content cannot be empty!"})
        return
    }

    //create user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save in database
    user.save(user)
    .then(data=>{
        //res.send(data)

        res.redirect('/add-user')
    })
    .catch(err=>{
        res.status(500).send(
            {message : err.message || "Some error occured while creating a create operation"}
        )
    })

}

//get and return single user
exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id
        Userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message:"Mentioned user not found from id"})
            }
            else{
                res.send(data)
            }
           
        })
        .catch(error =>{
            res.status(500).send({message:error.message||"Error in finding user data"})
        })
    }
    else{
        Userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(error =>{
            res.status(500).send({message:error.message||"Error in finding user data"})
        })
    }
}

//update user by id
exports.update = (req,res)=>{
    if(!req.body){
        return res.status(400)
        .send({message:"Empty Data to update"})
    }

    const id = req.params.id
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Cannot update user id, user not found"})
        }
        else {
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message:"Error update info"})
    })
}

//delete user by id
exports.delete = (req,res)=>{
    const id = req.params.id

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Cannot delete with id"})
        }
        else {
            res.send({message:"User deleted successfully"})
        }
    })
    .catch(err =>{
        res.status(500).send({message:"Message not delete with id"})
    })

}
