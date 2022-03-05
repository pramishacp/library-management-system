const User = require('../services/user');

const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const user = await User.findUserById(req.params.id);

    if (!user) return res.status(404).send('The user with the given ID was not found.');

    res.status(200).send(user);
});

module.exports = router; 