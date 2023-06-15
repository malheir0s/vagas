const express = require('express');
const userController = require('../controllers/user')
const routes = express.Router();



routes.get('/', function(req, res){
    res.send(`get user/ </br>
    get users/ </br>
    post users/ </br>
    delete users/ </br>
    put users/ </br>
    `);
});
  
routes.get("/user", userController.getByName);
routes.get("/users", userController.getAll);
routes.post("/users", userController.create)
routes.delete("/users", userController.deleteByName)
routes.put("/users", userController.updateById)
routes.get("/users/access", userController.readCountByUserName);


module.exports = routes;