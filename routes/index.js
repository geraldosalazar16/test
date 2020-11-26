
var express = require('express');
var router = express.Router();
const { User } = require('../db');
const db = require('../db');
const user = require('../db/models/user');

/* GET home page. */
router.get('/',async function(req, res, next) {
  const users = await db.User.findAll();
  res.render('index', { title: 'List of Users', users });
});

router.get('/add',async function(req, res, next) {
  res.render('add_user', { title: 'Create User'});
});

router.get('/details/:id',async function(req, res, next) {
  const id = req.params.id
  if(id) {
    const user = await db.User.findByPk(id);
    res.render('details', { title: 'Details User', user});
  }else  {
    res.redirect('/');
  }

});

module.exports = router;
