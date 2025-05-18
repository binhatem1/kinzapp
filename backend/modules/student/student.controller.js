const Student = require('./student.model');
const multer = require('multer');
const path = require('path');
const { getUserId } = require('../user/controller/user.controller');
const { json } = require('stream/consumers');

const allStudents = async (req, res) => {
    try {
        const students = await Student.find({ mentor: userID });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, progess, amount, email, rating } = req.body;

    try {
        const student = await Student.findByIdAndUpdate(id, {
            name,
            progess,
            amount,
            email,
            rating
        }, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addStudent = async (req, res) => {
    const { name, progess, amount, email, rating } = req.body;
    console.log("STUDENT" + getUserId());
    const student = new Student({
        name,
        progess,
        amount,
        email,
        rating,
        avatar :req.file ? req.file.filename:null,
        mentor: getUserId(),
    });
    try {
        const savedStudent = await student.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = path.extname(file.originalname)
        const extnameValid = allowedTypes.test(extname.toLowerCase());
        const mimetypeValid = allowedTypes.test(file.mimetype);

        if (!(extnameValid && mimetypeValid)) {            
            cb(new Error('Only image files are allowed!'));
        }
        cb(null, file.fieldname + "-" + Date.now() + extname);
    },
});
const fileUploadHandler = multer({ storage: storage });
const upload = fileUploadHandler.single("avatar");



module.exports = { getStudent, addStudent, updateStudent, deleteStudent, allStudents, upload };  