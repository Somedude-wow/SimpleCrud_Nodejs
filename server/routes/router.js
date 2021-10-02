const express = require('express')
const route = express.Router()

const services = require('../services/render')
const controller = require('../controller/controller')

/**   
*  @description Root
*  @method GET/
*/
route.get('/',services.homeRoutes)

//////OLD CODE
// route.get('/add-user',(req,res)=>{
//     res.render('add_user')
//     //res.send("Crud Application")
// })

/**   
*  @description add user
*  @method GET/add_user
*/
route.get('/add-user',services.add_user)

/**   
*  @description update user
*  @method GET/update_user
*/
route.get('/update-user',services.update_user)

//API ROUTES
route.post('/api/users',controller.create)
route.get('/api/users',controller.find)
route.put('/api/users/:id',controller.update)
route.delete('/api/users/:id',controller.delete)

module.exports = route