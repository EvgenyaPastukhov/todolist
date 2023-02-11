import React from 'react';
import Task from '../../components/Task/Task';
import { TaskType } from '../../types/task';
import styled from 'styled-components';

interface TasksListProps{
    count: number;
}

const StyledTasksList = styled.div<TasksListProps>`
  background-color: white;
  color: gray;
  font-size: 1rem;
  display: block;
  height: 60px;
  border-radius: 10px;
  margin-top: 1rem;
  text-align: center;
  padding: ${props => props.count === 0 ? '0' : '1rem'};
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`;


function TasksList({tasks}: {tasks: TaskType[]}) {
    return (
        <StyledTasksList count={tasks.length}>
            {tasks.map(el => (
                <Task 
                    id = {el.id}
                    title = {el.title}
                    status = {el.status}
                 />
            ))}
        </StyledTasksList>
    );
}

export default TasksList;
