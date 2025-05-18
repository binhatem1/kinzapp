const { da } = require('date-fns/locale');
const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    progress : { type: Number, },
    amount : { type: Number, },
    email: { type: String,  },
    avatar:{type: String},
    mentor : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Student', studentSchema);



/*

const roles = {
    novice: "novice",
    building: "building",
    formation: "formation",
    graduated: "graduated",
}

const areas = {
    area1: "area1",
    area2: "area2",
    area3: "area3",
    area4: "area4",
    area5: "area5",
    area6: "area6",
    area7: "area7",
    area8: "area8",
}

role: { type: String, enum: Object.values(roles), default: roles.novice },
    area: { type: String, enum: Object.values(areas), required: true },
    location: { type: String },
    academicYear: { type: String },
    phoneNumber: { type: String },
    img: { data: Buffer, contentType: String },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
*/