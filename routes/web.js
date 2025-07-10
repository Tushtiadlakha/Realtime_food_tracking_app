const router = require('express').Router();
const homeController = require('../backend/http/controllers/homeController');
const authController = require('../backend/http/controllers/authController');
const cartController = require('../backend/http/controllers/cartController');
const guest = require('../backend/http/middlewares/guest');

router.get("/", homeController().index);

router.get("/cart", cartController().index);

router.get("/login", guest, authController().login);
router.post("/login", authController().postLogin);

router.get("/register", guest, authController().register);
router.post("/register", authController().postRegister)

router.post("/logout",authController().logout);

router.post('/update-cart',cartController().update)

module.exports = router;