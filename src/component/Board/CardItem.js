import React, { useState, useContext, useEffect } from "react";
import { BoardContext } from "./Board";
import { Card } from "react-bootstrap";
import TaskForm from "./NewTask/TaskForm";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import avatar from './../../assets/avtar2.svg'
const formateDate = (date) => {


  var day = "" + date.getDate();

  if (day.length < 2) day = "0" + day;

  return date.getMonth() + "/" + day + "/" + date.getFullYear();
};

const initialEditedValues = {
  title: "",
  description: "",
  startDate: new Date(),
};

function CardItem(props) {
  const [show, setShow] = useState(false);
  const [editedValues, setFormValues] = useState(initialEditedValues);
  const handleClose = () => setShow(false);
  const { taskState, onDeletingTask, onUpdatingTask } = useContext(
    BoardContext
  );

  const handleShow = () => {
    setShow(true);
  };

  const clickHandler = (type) => {
    if (type === "edit") {
      var formValues = taskState.find((task) => {
        return task.id === props.task.id;
      });
      setFormValues(formValues);
      handleShow();
    } else if (type === "delete") {
      onDeletingTask(props.task.id);
    }
  };

  const handleUpdate = (values, submitProps) => {
    submitProps.setSubmitting(false);
    onUpdatingTask(values);
    setShow(false);
    submitProps.resetForm();
  };

  return (
    <>
      <TaskForm
        editedValues={editedValues}
        taskState="Update"
        show={show}
        handleClose={handleClose}
        onSubmit={handleUpdate}
      ></TaskForm>
      <Card key={props.task.id} className="card-task">
        <Card.Body>
        {props.task.img&&<img src={props.task.img}/>}
          <Card.Title>
            {props.task.title}{" "}
            <div className="card-task-option ">
              <a onClick={() => clickHandler("edit")}>
                <FiEdit2 />
              </a>
            </div>
          </Card.Title>
          <div>
            {props.task.description}{" "}
          </div>
          <table>
            <tbody>
              <tr>
                <td>
                  <AiOutlineClockCircle/>
                  {formateDate(props.task.startDate)}
                </td>
                <td className='img--container'>
                  <img src={avatar} />
                  <img src={avatar} />
                  <img src={avatar} />
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardItem;
