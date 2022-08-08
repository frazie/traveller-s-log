const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

//  @desc   Login/landing page
//  @route   Get /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

//  @desc   dashboard
//  @route   Get /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    console.log()
    res.render('dashboard')
})

module.exports = router