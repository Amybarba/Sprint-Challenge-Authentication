const router = require('express').Router();
const UsersModel = require('./users-model.js');

router.get('/', (req, res) => {
    UsersModel.find()
    .then(users => {
        res.json(users)
    })
    .catch(error => res.send(error));
});

module.exports = router;