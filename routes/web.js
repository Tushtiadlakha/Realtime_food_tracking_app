const router = require('express').Router();
const homeController = require('../backend/http/controllers/homeController');
const authController = require('../backend/http/controllers/authController');
const cartController = require('../backend/http/controllers/cartController');

router.get("/", homeController().index);

router.get("/cart", cartController().index);

router.get("/login", authController().login);

router.get("/register", authController().register);
router.post("/register", authController().postRegister)

router.post('/update-cart',cartController().update)


module.exports = router;