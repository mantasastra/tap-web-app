import React, { Component } from "react";
import * as Yup from "yup";
import axios from "axios";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Layout from "../../Layout/Layout";
import TaskForm from "../../shared/Forms/TaskForm";

const CustomPaper = withStyles(() => ({
  root: {
    minWidth: "20rem",
    marginBottom: 2,
    borderRadius: "1%",
  },
}))(Paper);

export class EditTask extends Component {
  state = {
    editSuccessful: false,
  };

  /* istanbul ignore next */
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const taskUpdateDate = Date.now();
      const body = {
        taskName: values.taskName,
        taskDescription: values.taskDescription,
        taskUpdateDate,
        taskDueDate: values.taskDueDate,
        taskPriority: values.taskPriority,
        taskDifficulty: values.taskDifficulty,
        isTaskComplete: values.isTaskComplete,
        isTaskSuggested: values.isTaskSuggested,
      };

      setSubmitting(true);

      await axios
        .put(`/api/tasks/edit/${this.props.location.state.task._id}`, body, {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then(
          () => {
            console.log("Task edited.");
          },
          (error) => {
            console.log("Error occured while editing a task.", error);
          }
        );

      await axios
        .get(`/api/tasks/calculate-suggest/${this.props.userEmail}`, {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then(() => {})
        .catch((err) => console.log(err));

      await axios
        .get(`/api/tasks/make-suggest/${this.props.userEmail}`, {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then(() => {})
        .catch((err) => console.log(err));

      setSubmitting(false);
      this.setState((prevState) => ({
        ...prevState,
        editSuccessful: true,
      }));
    } catch (e) {
      console.log(e);
      setSubmitting(false);
      this.setState((prevState) => ({
        ...prevState,
        editSuccessful: false,
      }));
    }
  };

  render() {
    const { editSuccessful } = this.state;

    if (editSuccessful) {
      this.props.history.goBack();
    }

    // Set Date to yesterday for validation
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    const taskSchema = Yup.object().shape({
      taskName: Yup.string()
        .typeError("You must enter a text.")
        .min(2, "Task name is too short.")
        .max(30, "Task name is too long.")
        .required("Task name is required."),
      taskDescription: Yup.string()
        .typeError("You must enter a text.")
        .min(2, "Task description is too short.")
        .max(150, "Task description is too long."),
      taskDueDate: Yup.number().min(
        moment(currentDate),
        "Task due date cannot be in the past."
      ),
      taskPriority: Yup.string(),
      taskDifficulty: Yup.string(),
      isTaskComplete: Yup.boolean(),
      isTaskSuggested: Yup.boolean(),
    });

    const { task } = this.props.location.state;

    return (
      <Layout>
        <CustomPaper elevation={3}>
          <Formik
            initialValues={{
              taskName: task.taskName,
              taskDescription: task.taskDescription,
              taskUpdateDate: Date.now(),
              taskDueDate: Date.parse(task.taskDueDate),
              taskPriority: task.taskPriority,
              taskDifficulty: task.taskDifficulty,
              isTaskComplete: false,
              isTaskSuggested: false,
            }}
            validationSchema={taskSchema}
            onSubmit={this.handleSubmit}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                setFieldValue,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
              } = props;

              return (
                <TaskForm
                  title="Edit a Task"
                  values={values}
                  touched={touched}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  isValid={isValid}
                  routeBack={this.props.history.goBack}
                />
              );
            }}
          </Formik>
        </CustomPaper>
      </Layout>
    );
  }
}

export default withRouter(EditTask);
