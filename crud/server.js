const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/bcacrud');
const Student = mongoose.model('Student', {
    name: String,
    email: String,
    address: String
});
const app = express();
app.use(express.json());
app.get('/', async(req, res) => {
    const sData = await Student.find({});
    return res.status(200).send(sData);
});
app.post('/', async(req, res) => {
    const sR = new Student(req.body);
    await sR.save();
    return res.status(201).send(sR);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});