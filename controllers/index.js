const router = require('express').Router();
const { Blogpost, User } = require('../models');
const apiRoutes = require('./api');

router.get('/', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/api/users/login');
        return;
      }
    try {
        const blogpostData = await Blogpost.findAll({
            include: [{ model: User }]
        });
        const blogpostTotal = [];
        for (blogpost of blogpostData) {
            blogpostTotal.push(blogpost.dataValues);
        }

        res.render('homepage', {blogpostTotal});
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});
router.use('/api', apiRoutes);
module.exports = router;