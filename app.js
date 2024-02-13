const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/college');
const User  = mongoose.model('User', {
    name: String,
    email: String,
});
app.get('/', async(req, res) => {
    let users = await User.find({});
    return res.json({users});
});

app.get('/:id', async(req, res) => {
    let id = req.params.id;
    let user = await User.findOne({_id:id});
    return res.json({user});
});

app.post('/', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    return res.json({message: 'User created!'});
});

app.delete('/:id', async (req, res) => {
    let id = req.params.id;
    await User.deleteOne({_id:id});
    return res.json({message: 'User deleted!'});
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});