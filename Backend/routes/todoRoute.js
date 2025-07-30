const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
} = require("../controller/todoController");

// Protect all routes with the auth middleware
router.use(protect);

router.route("/")
    .get(getTodo)
    .post(createTodo);

router.route("/:id")
    .put(updateTodo)
    .delete(deleteTodo);

module.exports = router;