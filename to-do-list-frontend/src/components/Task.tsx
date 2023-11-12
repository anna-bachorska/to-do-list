import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { TaskType } from '../../models/models';

import styled from "styled-components";

const TaskStyle = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TaskTextStyle = styled.div`
  margin-right: auto;
`;

const ButtonDeleteStyle = styled.button`
  border-radius: 6px;
  padding: 0 10px;
  cursor: pointer;
`;

const CheckboxStyle = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

interface TaskProps {
  items: TaskType[];
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
}

function Task({ items, deleteTask, completeTask }:TaskProps) {  
  return <div>
    {
      items.map((item, index) => (
        <TaskStyle key={index}>
          <TaskTextStyle
            key={item.id}
            className={item.done ? "line-through-on" : "line-through-off"}
          >
            {item.content}
          </TaskTextStyle>
          <CheckboxStyle
            type="checkbox"
            checked={item.done}
            className="edit-checkbox"
            onChange={() => completeTask((item.id as number))}
          ></CheckboxStyle>
          <ButtonDeleteStyle
            className="delete-button"
            onClick={() => deleteTask((item.id as number))}
          >
            delete
          </ButtonDeleteStyle>
        </TaskStyle>
      ))
    }
  </div>;
}

export default Task;
