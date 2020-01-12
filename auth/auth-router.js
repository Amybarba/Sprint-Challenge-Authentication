const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets.js');

const Users = require('../users/usersModel.js');

// implement registration
router.post('/register', (req, res) => {
  const user = req.body;
  const hast = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
  .then((newUser) => {
    const token = generateToken(newUser);
    res.status(201).json({  created_user: newUser, token: token })
  })
  .catch((error) => {
    Response.status(500).json(error)
  });
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  Users.findBy({ username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ username: user.username, token: token });
    } else {
      res.status(401).json({ message: 'Credentials failed' });
    }
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

function generateToken(user) {
  const payload = {
    userid: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '24h'
  }
  const token = jwt.sign(payload, secrets.jwtSecret, options);
  
  return token;
}

module.exports = router;
