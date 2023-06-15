const express = require('express');
var teste1 = require("../teste1");
var teste2 = require("../teste2");
var teste3 = require("../teste3");
var teste4 = require("../teste4");
var teste5 = require("../teste5");


const routes = express.Router();



routes.get('/', function(req, res){
    res.send(`get user/ </br>
    get users/ </br>
    post users/ </br>
    delete users/ </br>
    put users/ </br>
    `);
});
  
routes.get("/user", teste1.getUser);
routes.get("/users", teste1.getUsers);
routes.post("/users", teste2)
routes.delete("/users", teste3)
routes.put("/users", teste4)
routes.get("/users/access", teste5);


module.exports = routes;