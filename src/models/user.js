const data  =  [
    {
        id: 1,
        name: "João Oliveira",
        job: "Desenvolvedor"
    }
]

function getByName (name){
    for(let i = 0; i < data.length;  i++) {
        if(i.name == name) {
            return (data[i]);
        }
    }
};

function getAll (){
    return data;  
};

function create (name, job){
    var newUser = {
        name: name,
        job: job,
    }

    data.push(newUser)
    return newUser;
}

function deleteByName(name){
    for(let i = 0; i < data.length;  i++) {
        if(i.name == name) {
            data[i] = null;
        }
    }
}

function updateById(id, name, job){
    const reg = data.find(d => id == id);
    reg.name = name;
    reg.job = job;
    return reg;
}

function readCountByUserName(name){
    return "Usuário " +  name  + "  foi lido 0 vezes.";
};

module.exports = {
    getByName,
    getAll,
    create,
    deleteByName,
    updateById,
    readCountByUserName
};
