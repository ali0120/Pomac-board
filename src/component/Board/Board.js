import React, { useState, useEffect, useReducer, createContext } from "react";
import NewTask from "./NewTask/NewTask";
import BoardLanes from "./BoardLanes";
import './Board.css'
import imageCard from '../../assets/avatar.png'
const stagesData = [
  { name: "Tasks", id: 1 },
  { name: "Done", id: 2 }
];
const taskData = [
  {
    id: 1,
    title:"Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    stage: 1,
    startDate: new Date(2012, 11, 11),
  },
  {
    id: 3,
    img:imageCard,
    title:"Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    stage: 2,
    startDate: new Date(2012, 11, 11),
  }
];

export const BoardContext = createContext({});

function reducer(state, action) {
  switch (action.type) {
    case "ON_DROP":
      const droppedTask = action.payload;
      const updatedTasks = state.map((task) => {
        if (task.id === droppedTask.id) {
          return droppedTask;
        }
        return task;
      });
      return updatedTasks;
    case "LOAD_DATA":
      return action.payload;
    case "ADD_NEW":
      return [...state, action.payload];
    case "ON_DELETE":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}
function Board() {
  const [taskState, dispatch] = useReducer(reducer, taskData);
  const [stages, setStage] = useState(stagesData);

  useEffect(() => {
    dispatch({ type: "LOAD_DATA", payload: taskState });
  }, [taskState, stages]);

  const onDragStartHandler = (event, taskId, stageId) => {
    var data = {
      taskId: taskId,
      stageId: stageId
    };
    event.dataTransfer.setData("text/plain", JSON.stringify(data));
    event.dataTransfer.effectAllowed = "move";
  };

  const onTaskContainerDragStartHandler = (event, laneId) => {
    let fromBox = JSON.stringify({ laneId: laneId });
    event.dataTransfer.setData("laneId", fromBox);
  };
  const onTaskContainerDragOverHandler = (event) => {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
    }
  };

  const onTaskContainerDropHandler = (event, droppedLaneId) => {
   
  };


  const onDragOverHandler = (event) => {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
    }
  };

  const onDropHandler = (event, droppedStageId) => {
    let droppedData = event.dataTransfer.getData("text/plain");
    droppedData = JSON.parse(droppedData);
    const filterTask = taskState.filter((x) => x.id === droppedData.taskId);
    filterTask[0].stage = droppedStageId;
    dispatch({ type: "ON_DROP", payload: filterTask[0] });
  };

  const onAddingNewTask = (dataFromChild) => {
    dataFromChild.stage = 1;
    dataFromChild.id = taskState.length + 1;
    dispatch({ type: "ADD_NEW", payload: dataFromChild });
  };

  const onUpdatingTask = (dataFromChild) => {
    console.log(dataFromChild);
    dispatch({ type: "ON_DROP", payload: dataFromChild });
  };

  const ContextData = {
    taskState,
    onDragStartHandler,
    onDragOverHandler,
    onDropHandler,
    onUpdatingTask,
    onTaskContainerDragStartHandler,
    onTaskContainerDropHandler,
    onTaskContainerDragOverHandler
  };

  return (
    <div className="container-fluid">
        <div >
          <NewTask addNewTask={onAddingNewTask} />
        </div>
        <div >
          <BoardContext.Provider value={ContextData}>
            <BoardLanes stages={stages}></BoardLanes>
          </BoardContext.Provider>
        </div>
      </div>
  );
}

export default Board;
