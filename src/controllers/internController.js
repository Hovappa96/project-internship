const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")


const createIntern = async function (req, res) {
    try {
        let data = req.body;
        let name = req.body.name;
        let email = req.body.email;
        let mobile = req.body.mobile;
        let collegeId = req.body.collegeId;
        // let collegeName = req.body.collegeName;

        if (!name) {
            res.status(400).send({ status: false, msg: 'name is required' })
        }

        if (!email) {
            res.status(400).send({ status: false, msg: 'email is required' })
        }

        if (!mobile) {
            res.status(400).send({ status: false, msg: 'mobile is required' })
        }

        if (!collegeId) {
            res.status(400).send({ status: false, msg: 'collegeId is required' })
        }

        // if(!collegeName){
        //     res.status(400).send({ status: false, msg: 'college name is required' })
        // }
        // let checkName = await collegeModel.findOne({ fullName: collegeName })
        // if (!checkName) {
        //     return res.status(404).send({ status: false, msg: "No college is found provide valid college name" })
        // }
        
        // data.collegeId = checkName._id
        let checkName = await collegeModel.findById(collegeId)
        if(!checkName){
            return res.status(404).send({ status: false, msg: "No college is found provide valid college id" })
        }
        let saveIntern = await internModel.create(data)
        res.status(201).send({ status: true, msg: "intern is created successfully", data: saveIntern })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports.createIntern = createIntern;