const User = require('../services/user');

const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const user = await User.findUserById(req.params.id);

    res.status(200).send(user);
});

module.exports = router; 