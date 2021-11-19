import React, { useContext, useState, useEffect } from "react";
import { BoardContext } from "./Board";
import { BsThreeDots } from "react-icons/bs";
import Lane from "./Lane";
function BoardLanes(props) {
  const {
    onDragOverHandler,
    onDropHandler,
    onTaskContainerDragStartHandler,
    onTaskContainerDropHandler,
    onTaskContainerDragOverHandler,
  } = useContext(BoardContext);
  const [divWidth, setDivWidth] = useState(0);

  useEffect(() => {
    const totalWidth = props.stages.length * 292 + props.stages.length * 20;
    setDivWidth(totalWidth);
  }, []);

  return (
    <div>
      <div className='card--container' >
        {props.stages.map((stage, index) => (
          <>
            <div
              className="card-column"
              key={index}
              onDragStart={(event) =>
                onTaskContainerDragStartHandler(event, stage.id)
              }
              onDragOver={(event) => onTaskContainerDragOverHandler(event)}
              onDrop={(event) => onTaskContainerDropHandler(event, stage.id)}
            >
              <div className="card ">
                <div className="card-header ">
                  <h2 className="header--card ">
                    {stage.name}
                  </h2>
                  <BsThreeDots/>
                </div>
                <div
                  className="card-body"
                  onDrop={(event) => onDropHandler(event, stage.id)}
                  onDragOver={(event) => onDragOverHandler(event)}
                >
                  <Lane stage={stage} key={stage.id} />
                </div>
              </div>
            </div>
            <div
              onDrop={(event) => onTaskContainerDropHandler(event, stage.id)}
            ></div>
          </>
        ))}
      </div>
    </div>
  );
}

export default BoardLanes;
