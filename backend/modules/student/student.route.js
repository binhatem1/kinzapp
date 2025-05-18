const router = require('express').Router();
const { getStudent, addStudent, updateStudent, deleteStudent, allStudents, upload } = require('./student.controller');
//const { addUser,loginUser,authUser } = require('../controller/user.controller');
router.get('/student', allStudents);
router.get('/student/:id', getStudent);
router.post('/student', upload, addStudent);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

module.exports = router;