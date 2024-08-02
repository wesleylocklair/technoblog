const router = require('express').Router();
const { Blogpost, User } = require('../../models');
//api//recipes

//needs a get , get by id , a post recipe that requires a user
router.get('/', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/api/users/login');
        return;
      }
    //goes through the recipe database and feeds the entries into a handelbars template
    try {
        const blogpostData = await Blogpost.findAll({
            include: [{ model: User }]
        });
        const blogpostTotal = [];
        for (blogpost of blogpostData) {
            blogpostTotal.push(blogpost.dataValues);
        }
        console.log(blogpostTotal);
        // res.json(recipeTotal);
    //   res.render('login');
    //handelbars call goes here
        res.render('blogpost', {blogpostTotal});
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

//it requires a user id, a title, a description, and a food type
router.post('/createblogpost', async (req, res) => {
    try {
        //sequelize function create
        //req.body has the variables
        console.log(JSON.stringify(req.body) + " this is where I am");
        console.log(req.body);
        console.log(typeof(req.body));
        const newBlogpost= await Blogpost.create(req.body);
      
        res.json(newBlogpost);
        //if there is a page for post successful, put the handelbars here
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

//login info
// {{!-- GET ROUTE --}}
//api/users/login
router.get('/createblogpost', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/api/users/login');
    return;
  }

  res.render('createblogpost');
});








router.get('/:id', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/api/users/login');
        return;
      }
    try {
        const blogpostTotal = [(await Blogpost.findByPk(req.params.id, {
            include: [{ model: User }]
        })).dataValues];
        //this should work
        console.log(blogpostTotal);
        // res.json(recipeData);
        res.render('blogpost', {blogpostTotal});
        
        //handelbars call goes here
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});






router.delete('/:id', async (req,res) => {
    try{
       
        const deleteBlogpost = await Blogpost.destroy({
            where: {
                id: req.params.id
            }
        });
        if(!deleteBlogpost){
            res.status(404).json('Blogpost not found!');
            return; //need to stop the call from reaching another res
        }
        res.json('Blogpost deleted!');
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




module.exports = router;
