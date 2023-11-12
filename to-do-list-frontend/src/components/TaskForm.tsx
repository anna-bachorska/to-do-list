import React, { useState } from "react";
import styled from "styled-components";
import { TaskType } from '../../models/models';

const TaskFormStyle = styled.form`
  margin-bottom: 80px;
`;

const TaskButtonStyle = styled.button`
  padding: 0 40px;
  border-radius: 6px;
  cursor: pointer;
`;

const TaskInputStyle = styled.input`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
`;

interface TaskFormProps {
  onFormSubmit: (task: TaskType) => void;
}

function TaskForm({ onFormSubmit }: TaskFormProps) {
  const [countId, setCountId] = useState(1);

  const [input, setInput] = useState("");

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setCountId((prevValue) => prevValue + 1);

    onFormSubmit({
      id: countId,
      content: input,
      done: false,
    });

    setInput("");
  };

  return (
    <TaskFormStyle className="task-form" onSubmit={handleSubmit}>
      <TaskInputStyle
        type="text"
        placeholder="task"
        value={input}
        content="text"
        className="task-input"
        onChange={handleChange}
      />
      <TaskButtonStyle className="task-button">add</TaskButtonStyle>
    </TaskFormStyle>
  );
}

export default TaskForm;
