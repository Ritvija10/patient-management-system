const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientID: {
        type: Number,
        
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    bloodGroup:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    disease: {
        type: String,
        required: true
    }
});
patientSchema.pre("save", async function () {
    if (!this.patientID) {
        const lastPatient = await mongoose
            .model("Patient")
            .findOne()
            .sort({ patientID: -1 });

        this.patientID = lastPatient ? lastPatient.patientID + 1 : 1;
    }
});

module.exports = mongoose.model('Patient', patientSchema);
