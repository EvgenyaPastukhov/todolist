import React, { ChangeEvent, useState, MouseEvent } from "react";
import { useDispatch } from 'react-redux';
import { TaskType } from '../../types/task';
import IconButton from '../IconButton/IconButton';
import taskActions from "../../redux/actions";
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { TaskStatus } from "../../types/taskStatus";
import styled from 'styled-components';

interface TaskProps{
    status: TaskStatus;
}
  

const StyledTask = styled.div<TaskProps>`
    background-color: white;
    color: ${props => props.status === TaskStatus.Completed ? 'gray' : '#484444'};
    cursor: pointer;
    text-decoration: ${props => props.status === TaskStatus.Completed ? 'line-through' : 'none'};
    display: flex;
    justify-content: space-between;
    text-align: center;
    border-top: 2px solid gray;
    padding: 1rem;
    box-sizing: border-box;
    width: 100%;

    &:first-child {
        border-top: none;
    }
`;

const StyledEditingTask = styled.div`
    background-color: white;
    color: gray;
    font-size: 1.25rem;
    display: flex;
    justify-content: space-between;
    border-top: 2px solid gray;
    text-align: center;
    padding: 1rem;
    box-sizing: border-box;
    width: 100%;

    &:first-child {
        border-top: none;
    }
`;

function Task({ id, title, status }: TaskType) {
    const dispatch = useDispatch();
    const [editingMode, setEditingMode] = useState(false);
    const [value, setValue] = useState(title);

    const onStatusChange = (event: MouseEvent) => {
        dispatch(taskActions.editTask({
            id,
            title,
            status: status === TaskStatus.Added ? TaskStatus.Completed : TaskStatus.Added
        }))
    }

    const onEditButtonClick = (event: any) => {
        event.stopPropagation();
        setEditingMode(true);
    }

    const onSaveTitleClick = (event: any) => {
        event.stopPropagation();
        dispatch(taskActions.editTask({
            id,
            title: value,
            status
        }))
        setEditingMode(false);
    }

    const onDeleteButtonClick = (event: any) => {
        event.stopPropagation();
        dispatch(taskActions.deleteTask(id))
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    return (
        editingMode
            ? (<StyledEditingTask>
                <input type='text' value={value} onChange={handleChange}></input>
                <IconButton
                    name={faCheckCircle}
                    onClick={onSaveTitleClick}
                />
            </StyledEditingTask>)
            : (<StyledTask status={status} onClick={(e) => onStatusChange(e)}>
                {title}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    width: 100
                }}>
                    {status === TaskStatus.Added && (<IconButton
                        name={faPenToSquare}
                        onClick={onEditButtonClick}
                    />)}
                    <IconButton
                        name={faTrashCan}
                        onClick={onDeleteButtonClick}
                    />
                </div>
            </StyledTask>)
    )
}

export default Task;