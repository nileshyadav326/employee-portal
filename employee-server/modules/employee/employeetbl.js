import employeedb from './employeedb';


module.exports.addEmployee = (req, res) => {
    employeedb.addEmployee(req.body)
        .then((data) => {
            return res.status(200).send({ success: true, data: data });
        })
        .catch((err) => {
            return res.status(500).send({ success: false, data: err });
        });
}

module.exports.updateEmployee = (req, res) => {
    if (!req.body.id) {
        return res.status(400).send({ success: false, data: 'Invalid Request' });
    }
    
    employeedb.updateEmployee(req.body)
        .then((data) => {
            return res.status(200).send({ success: true, data: data });
        })
        .catch((err) => {
            return res.status(500).send({ success: false, data: err });
        });
}

module.exports.deleteEmployee = (req, res) => {
    if (!req.body.id) {
        return res.status(400).send({ success: false, data: 'Invalid Request' });
    }
    employeedb.deleteEmployee(req.body.id).then(data=>{
        return res.status(200).send({ success: true, data: data });
    })
}

module.exports.listEmployee = (req, res) => {
    employeedb.listEmployee()
        .then((data) => {
            return res.status(200).send({success: true, data: data});
        });
}
