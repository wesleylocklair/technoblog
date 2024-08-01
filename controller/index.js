const router = require('express').Router();

const apiRoutes = require('./api');

router.get('/', (req, res) => {
    res.render('landing', {logged_in: req.session.logged_in}); // homepage hanldebar
});
//logged_in: req.session.logged_in
router.use('/api', apiRoutes);

module.exports = router;