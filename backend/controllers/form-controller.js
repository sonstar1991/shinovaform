const router = require("express").Router();
const asyncWrapper = require("../utils/async-wrapper").AsyncWrapper;
const FormsService = require("../services/forms-service");
const validator = require("../middleware/validator");
const protectedRoute = require("../middleware/protected-route");

const formsService = new FormsService();

router.use(protectedRoute());

//POST REQUEST
router.post(
  "/",
  [validator("Form")],
  asyncWrapper(async (req, res) => {
    
    const {title, fields} = req.body
    const addForm = await formsService.create({
      userId: req.decoded.id,
      title,
      fields
    })
    res.send({
      message: "Form Created Successfully",
      form: addForm
    })
  })
);

//GET REQUEST
router.get(
  "/",
  asyncWrapper(async (req, res) => {
    let userId = req.user;
    let forms = await formsService.findAll(userId);
    res.send(forms);
  })
);

router.get(
  "/:id",
  asyncWrapper(async (req, res) => {
    let id = req.param.id;
    let form = await formsService.findOne(id);
    res.send(form);
  })
);

//DELETE REQUEST
router.delete(
  "/:id",
  asyncWrapper(async (req, res) => {
    let id = req.param.id;
    await formsService.deleteOne(id);
    res.sendStatus(200);
  })
);

module.exports = router;
