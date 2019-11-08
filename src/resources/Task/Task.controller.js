const Task = require("./Task.model");

/**
 * GET /api/tasks
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.taskList = (req, res, next) => {
  Task.find({}, (err, tasks) => {
    res.send({ tasks: tasks });
  });
};

/**
 * GET /api/tasks/id
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.taskDetail = (req, res, next) => {
  Task.findOne({ _id: req.params.id }, err => {
    if (err) {
      res
        .status(500)
        .send(
          "Error occured trying to find a task. Please check if the information is correct."
        );
    }
  })
    .then(task => res.json(task))
    .catch(next);
};

/**
 * POST /api/tasks/add
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.addTask_post = (req, res, next) => {
  const newTask = new Task({
    userId: req.body.userId,
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    taskCreateDate: req.body.taskCreateDate,
    taskUpdateDate: req.body.taskUpdateDate,
    taskDueDate: req.body.taskDueDate,
    taskPriority: req.body.taskPriority,
    taskDifficulty: req.body.taskDifficulty,
    isTaskComplete: req.body.isTaskComplete,
    isTaskSuggested: req.body.isTaskSuggested
  });

  newTask.save((err, task) => {
    if (err) {
      res
        .status(500)
        .send(
          "Error occured while trying to add a task. Please check if the information is correct"
        );
    }

    res.send("Task has been added - " + `"${task.taskName}"`);
  });
};

/**
 * PUT /api/tasks/edit
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.editTask_post = (req, res, next) => {
  let taskId = req.body.taskId;

  const data = {
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    taskUpdateDate: req.body.taskUpdateDate,
    taskDueDate: req.body.taskDueDate,
    taskPriority: req.body.taskPriority,
    taskDifficulty: req.body.taskDifficulty,
    isTaskComplete: req.body.isTaskComplete,
    isTaskSuggested: req.body.isTaskSuggested
  };

  Task.findByIdAndUpdate(taskId, data, (err, task) => {
    if (err) {
      res
        .status(500)
        .send(
          "Error occured while trying to edit a task. Please check if the information is correct"
        );
    }

    res.send("Task has been updated.");
  }).catch(next);
};

/**
 * POST /api/tasks/delete
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.deleteTask_post = async (req, res, next) => {
  const resultMessage = await Task.findByIdAndDelete(req.body.taskId)
    .then(() => "Task has been deleted.")
    .catch(next);

  res.json({ resultMessage });
};