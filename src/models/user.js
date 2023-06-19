const jwt = require('jsonwebtoken');
const data = [ // stores user data
    {
        id: 1,
        name: "João Oliveira",
        job: "Desenvolvedor",
        read_count: 0,
        permissions: []
    }
]

const tokens = {}; // stores user tokens in format: <user_id> : <token>

function getByName(name) {
    user = data.find(user => user.name === name);
    if (user) {
        user.read_count += 1;
    }
    return user;
};

function getAll() {
    return data;
};

function create(name, job, permissions) {
    last_user = data[data.length - 1];
    new_id = last_user ? last_user.id + 1 : 1;
    var new_user = {
        name: name,
        job: job,
        id: new_id,
        read_count: 0,
        permissions: permissions ? permissions : []
    }

    data.push(new_user)
    return new_user;
}

function deleteByName(name) {
    const indice = data.findIndex(user => user.name === name);
    if (indice !== -1) {
        data.splice(indice, 1);
        return true;
    } else {
        return false;
    }
}

function updateById(id, name, job) {
    const reg = data.find(user => user.id === id);

    if (reg) {
        reg.name = name;
        reg.job = job;
    }
    return reg;
}

function readCountByUserName(name) {
    user = data.find(user => user.name === name);
    return user ? user.read_count : false;
};

function generateToken(id, name) {
    user = data.find(user => user.id === id)
    if (user && user.name === name) {
        const token = jwt.sign(
            {
                id: id
            }, process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )
        tokens[id] = token; // storing token
        return true;
    }
    else {
        return false;
    }
}

module.exports = {
    getByName,
    getAll,
    create,
    deleteByName,
    updateById,
    readCountByUserName,
    data,
    tokens,
    generateToken
};
