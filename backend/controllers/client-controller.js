const router = require("express").Router();
const asyncWrapper = require("../utils/async-wrapper").AsyncWrapper;
const ClientsService = require('../services/clients-service')
const validator = require("../middleware/validator");

const clientsService = new ClientsService();


//GET REQUEST
router.get(
  "/",
  asyncWrapper(async (req, res) => {})
);

router.get(
  "/:id",
  asyncWrapper(async (req, res) => {})
);

//POST REQUEST
router.post(
  "/",
  asyncWrapper(async (req, res) => {})
);

//DELETE REQUEST
router.delete(
  "/",
  asyncWrapper(async (req, res) => {})
);

module.exports = router;
