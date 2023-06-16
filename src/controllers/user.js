const userModel = require('../models/user');

const getByName = ( req, res, next ) => {
    var name =  req.query.name;

    user = userModel.getByName(name);

    if(user){
        res.send(user);
    } else {
        res.status(400).json({'error': 'User not found.'})
    }
};

const getAll = ( req, res, next ) => {
    res.send(userModel.getAll())
};

const create = ( req, res, next ) => {
    var {name, job} =  req.body;
    if (typeof name !== 'string' || typeof job !== 'string'){
        res.status(400).json({'error': 'Fields \'name\' and \'job\' are required and should be a string.'})
    } else {
        res.status(201).json(userModel.create(name, job));
    }
};


function deleteByName (req, res, next) {
    var name =  req.query.name;

    if(userModel.deleteByName(name)){
        res.send('success');
    }{
        res.status(400).json({'error': 'User not found.'});
    }

};

function updateById(req, res, next) {
    var id =  req.query.id;

    if ((/^\d+$/.test(id))){
        id = parseInt(id)
    } else{
        return res.status(400).json({'error': 'parameter \'id\' should be a number.'})
    }

    const {name, job} = req.body

    updatedUser = userModel.updateById(id, name, job)

    if(updatedUser){
        res.send(updatedUser);
    } else{
        res.status(400).json({'error': 'User not found.'})
    }
};

function readCountByUserName(req, res, next){
    var name =  req.query.name;
    read_count = userModel.readCountByUserName(name);
    
    (typeof read_count === 'number') ? res.send(read_count) : res.status(400).json({'error': 'User not found.'})
};

module.exports = {
    getByName,
    getAll,
    create,
    deleteByName,
    updateById,
    readCountByUserName
};
