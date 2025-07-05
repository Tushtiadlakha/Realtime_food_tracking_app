const Menu = require('../../models/menu');

function homeController()
{
    return {
        async index(req,res) 
        {
            const food = await Menu.find();
            res.render('home', {food: food});
        }
    }
}

module.exports = homeController;

