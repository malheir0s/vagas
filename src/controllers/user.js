const userModel = require('../models/user');

const getByName = ( req, res, next ) => {
    var name =  req.query.name;
    return res.getByName(name);
};

const getAll = ( req, res, next ) => {
    res.send(userModel.getAll())
};

const create = ( req, res, next ) => {
    var name =  req.body.name;
    var job =  req.body.job;
    
    res.send(userModel.create(name, job));
};


function deleteByName (req, res) {
  
    var name =  req.query.name;

    userModel.deleteByName(name)

    res.send("success");

};

function updateById(req, res) {
    const id =  req.query.id;
    const {name, job} = req.body
    res.send(userModel.updateById(id, name, job));

};

function readCountByUserName(req, res){
    var name =  req.query.name;
    res.send(userModel.readCountByUserName(name));

};

module.exports = {
    getByName,
    getAll,
    create,
    deleteByName,
    updateById,
    readCountByUserName
};
