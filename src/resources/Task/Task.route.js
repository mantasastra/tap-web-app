const express = require("express");
const router = express.Router();

const TaskController = require("./Task.controller");

/**
 * @route GET api/tasks
 * @desc Get All Tasks
 * @access Public
 **/
router.get("/", TaskController.taskList);

/**
 * @route GET api/tasks/id
 * @desc GET request for one Task
 * @access Public
 **/
router.get("/:id", TaskController.taskDetail);

/**
 * @route POST api/tasks/add
 * @desc POST request for creating and adding a Task
 * @access Public
 **/
router.post("/add", TaskController.addTask_post);

/**
 * @route PUT api/tasks/edit/id
 * @desc PUT request for editing a Task
 * @access Pusblic
 **/
router.put("/edit/:id", TaskController.editTask_post);

/**
 * @route POST api/tasks/delete/id
 * @desc POST request for deleting a Task
 * @access Public
 **/
router.delete("/delete/:id", TaskController.deleteTask_post);

/**
 * @route GET api/tasks/completed/all
 * @desc GET request for completed tasks
 * @access Public
 **/
router.get("/completed/all", TaskController.tasksCompleted_get);

/**
 * @route PATCH api/tasks/completed/add
 * @desc PATCH request for making a task completed
 * @access Public
 */
router.patch("/completed/add", TaskController.tasksCompleted_add);

module.exports = router;
