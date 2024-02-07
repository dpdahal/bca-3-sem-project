const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
mongoose.connect('mongodb://127.0.0.1:27017/bcacrud');
const User = mongoose.model('User', {
    name: String,
    email: String,
    address: String
});
const app = express();
app.use(cors())
app.use(express.json());
app.get('/', async (req, res) => {
    const sData = await User.find({});
    return res.status(200).send(sData);
});
app.post('/', async (req, res) => {
    const sR = new User(req.body);
    await sR.save();
    return res.status(201).send(sR);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});