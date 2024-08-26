const router = require('express').Router();
const { User } = require('../../models');


//get all
router.get('/', async (req,res) => {
    if (!req.session.logged_in) {
        res.redirect('/api/users/login');
        return;
      }
    try {
        const userData = await User.findAll();
        const userTotal = [];
        for(user of userData){
            userTotal.push(user.dataValues);
        }
        // res.json(userTotal);
        //handelbars call go here
        //res.redirect('/');
        res.render('blogpost', {userTotal});
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//post, so creating a new user

router.post('/create', async (req,res) => {
    try {
        const userData = await User.create(req.body);
        res.json(userData);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    //this will be fed a name, a password, and an email
    try{
        //this gives a req.body.name, req.body.email, req.body.password
        //find the user by email, then do the comparisons
        const searchUser = await User.findOne({where: {email: req.body.email}});
        const passCheck = searchUser.checkPassword(req.body.password);
        if ((searchUser.name === req.body.name)&&passCheck){
            //put the loginedIn = true here
            console.log('here');
            req.session.logged_in = true;
            req.session.user_id = searchUser.id;
            req.session.save(() => {});
            res.json({answer : 'pass'});
        }
        else{
            res('false');
        }
    }
    catch (err) {
        res.status(404).json(err);
    }
}); 


//login info
// {{!-- GET ROUTE --}}
//api/users/login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


router.post('/logout', async (req, res) => {
    //if logged in
    if (req.session.logged_in) {
        req.session.destroy(() => { //destroy the log in
          res.status(204).end();
        });
    } 
    else { //otherwise, how are you here?
        res.status(404).end();
    }
});


//get by id
//works
//needs to be low to prevent it from eating the /login route
router.get('/:id', async (req,res) => {
    try {
        const userTotal = [(await User.findByPk(req.params.id)).dataValues];
        //handelbars call go here
        res.render('users', {userTotal});
    }
    catch (err) {
        res.status(500).json(err);
    }
});


//delete
//sort of works
//the onDelete cascade isn't working, so a user with recipes cannot be deleted
router.delete('/:id', async (req,res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!userData){
            res.status(404).json({message : 'No user was found'}); //the message template is because json
            return;
        }
        res.status(200).json(userData);

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;