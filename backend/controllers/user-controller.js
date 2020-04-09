const router = require("express").Router();
const passport = require("passport");
const asyncWrapper = require("../utils/async-wrapper").AsyncWrapper;
const UsersService = require("../services/users-service");
const validator = require("../middleware/validator");
const AuthenticationError = require("../errors/authentication-error");
const protectedRoute = require("../middleware/protected-route");

const usersService = new UsersService();
// router.use(protectedRoute());
//POST REQUEST

//Register
router.post(
  "/sign-up",
  [validator("User")],
  asyncWrapper(async (req, res) => {
    let token = await usersService.create(req.body);
    res.send(token);
  })
);

//Log In
router.post(
  "/sign-in",
  [validator("User", "login")],
  asyncWrapper(async (req, res) => {
    let { email, password } = req.body;
    let token = await usersService.signIn(email, password);
    if (!token) {
      throw new AuthenticationError("Invalid Credentials");
    } else {
      // res.send(token);

      res.json({
        success: true,
        token: token,
      });
    }
  })
);

//GET REQUEST
router.get(
  "/",
  asyncWrapper(async (req, res) => {})
);

router.get(
  "/:id",
  asyncWrapper(async (req, res) => {})
);

router.get(
  "/dashboard", passport.authenticate('jwt', {session:false}), 
  asyncWrapper(async (req, res) => {
   usersService.findOne(req).then(user=>{
     res.status(200).json({
       user,
       message: ' succcess'
     })
   })
  })
);



//DELETE REQUEST
router.delete(
  "/",
  asyncWrapper(async (req, res) => {})
);

module.exports = router;
