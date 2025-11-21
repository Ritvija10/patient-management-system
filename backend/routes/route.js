const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');



router.post('/', async (req, res) => {
   try {
    console.log(" Incoming POST Body");
    console.log(req.body);

    const patient = new Patient(req.body);

    await patient.save(); 

    console.log("Patient Saved Successfully:", patient);

    res.status(201).json(patient);
  } catch (err) {
    console.log("BACKEND ERROR ");
     console.log(err.errors);
    console.error(err);     
    res.status(400).json({ error: err.message });
  }
});



router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(patient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ message: "Patient record  deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
