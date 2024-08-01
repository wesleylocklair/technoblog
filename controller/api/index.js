const router = require('express').Router();

const userRoutes = require('./dashboardRoutes');
// const recipeRoutes = require('./loginRoutes');

router.use('/dashboard', dashboardRoutes);
// router.use('/recipes', recipeRoutes);

module.exports = router;
