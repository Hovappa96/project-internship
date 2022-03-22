const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

const createCollege = async function (req, res) {
    try {
        let data = req.body;
        let name = req.body.name;
        let fullName = req.body.fullName;
        let logoLink = req.body.logoLink;

        if (!name) {
            res.status(400).send({ status: false, mag: 'name is required' })
        }

        if (!fullName) {
            res.status(400).send({ status: false, mag: 'fullname is required' })
        }

        if (!logoLink) {
            res.status(400).send({ status: false, mag: 'url is required' })
        }

        let savecollege = await collegeModel.create(data)
        res.status(201).send({ status: true, msg: 'document created successfully', data: savecollege })
    }
    catch (err) {
        res.status(500).send({ status: false, mag: err.message })
    }
}



const getCollegeDetails = async function (req, res) {
    try {
        let data = req.query.collegeName;
        if (!data) {
            res.status(400).send({ status: false, msg: "No parameters passed" })
        }
        let name = data;
        let getCollegeId = await collegeModel.findOne({ name })
        if (!getCollegeId) {
            return res.status(404).send({ status: false, msg: "no college is present" })
        }

        const getCollege = JSON.parse(JSON.stringify(getCollegeId));
        let id = getCollegeId._id
        let findIntern = await internModel.find({ collegeId: id, isDeleted: false })

        if (Object.keys(findIntern) == 0) {
            return res.status(404).send({ status: false, msg: "No intern or intern data deleted" })
        }
        getCollege.intern = [...findIntern]

        res.status(200).send({ status: true, msg: "interns list", data: getCollege })

    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}



module.exports.createCollege = createCollege;
module.exports.getCollegeDetails = getCollegeDetails;