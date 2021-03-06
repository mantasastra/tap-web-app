import express from "express";
import TaskController from "./Task.controller";

const router = express.Router();

/**
 * @route GET api/tasks
 * @desc Get All Tasks
 * @access Public
 **/
router.get("/:email", TaskController.taskList);

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
 * @route PATCH api/tasks/completed
 * @desc PATCH request for making a task completed/uncomplete
 * @access Public
 */
router.patch("/completed", TaskController.tasksCompleted);

/**
 * @route GET api/tasks/calculate-suggest/email
 * @desc Get Calculates suggested tasks
 * @access Public
 **/
router.get("/calculate-suggest/:email", TaskController.taskCalculateSuggest);

/**
 * @route GET api/tasks/make-suggest/email
 * @desc Get Make Tasks Suggested
 * @access Public
 **/
router.get("/make-suggest/:email", TaskController.taskMakeSuggest);

module.exports = router;
