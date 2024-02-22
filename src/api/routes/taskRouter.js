const router = require("express").Router();
const taskController = require("../controllers/taskController");

router.post("/addTask",taskController.addTask);
router.patch("/updateTask/:id",taskController.updateTask);
router.get("/importExcel",taskController.importExcel);
router.get("/sendEmailListTask",taskController.sendEmailListTask)
module.exports = router;