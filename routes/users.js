var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const { User } = require('../db');
const db = require('../db');
const user = require('../db/models/user');

router.get('/', async (req, res, next) => {
    try {
        const users = await db.User.findAll();
        res.json(users)
    } catch (error) {
        handleError(res, error)
    }
});

router.post('/', 
[
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('birthday').isDate(),
    body('password').notEmpty(),
    body('gender').notEmpty(),
],
async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const resultado = await db.User.create(req.body)
        res.json({
            id: resultado.id
        })
    } catch (error) {
        handleError(error)
    }
});

router.put('/:id', 
[
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('birthday').isDate(),
    body('password').notEmpty(),
    body('gender').notEmpty(),
],
async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    try {
        const currentValue = await db.User.findByPk(id)
        if (!currentValue) {
            res.status(404).send(`User with Id ${id} not found`)
        } else {
            currentValue.first_name = req.body.first_name;
            currentValue.last_name = req.body.last_name;
            currentValue.birthday = req.body.birthday;
            currentValue.password = req.body.password;
            currentValue.gender = req.body.gender;
            await currentValue.save();
            res.json()
        } 
    } catch (error) {
        handleError(error)
    }
});

router.delete('/:id', 
async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = db.User.findByPk(id)
        if (user === null) {
            res.status(404).send(`User with Id ${id} not found`)
        } else {
            await currentValue.destroy();
            res.json()
        } 
    } catch (error) {
        handleError(error)
    }
});

const handleError = (res, error) => {
    console.log(error)
    res.status(500).json({
        error
    })
}

module.exports = router;
