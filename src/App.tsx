import React, { ChangeEvent, useState } from 'react';
import './App.css';
import TasksList from './pages/TasksList/TasksList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './types/rootState';
import taskActions from './redux/actions';
import { TaskStatus } from './types/taskStatus';
import styled from 'styled-components';


const Header = styled.header`
  background-color: #af7eeb;
  font-size: 1.5rem;
  line-height: 60px;
  display: block;
  height: 60px;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;
  color: white;
  font-weight: 700;
`;

const StyledApp = styled.div`
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 700px;
`;

const StyledInputWrapper = styled.div`
  background-color: #fbbacf;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  color: white;
  height: 100px;
  padding: 1rem 2rem;
  width: 100%;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  border: gray;
  border-radius: 4px;
  padding: 0 10px;
  height: 40px;
  width: 400px;
`;

const StyledAddTaskButton = styled.button`
  background-color: #e73dff;
  cursor: pointer;
  border: none;
  color: white;
  font-size: 1rem;
  border-radius: 4px;
  height: 42px;
  width: 140px;
`;

const ErrorMessage = styled.div`
  background-color: white;
  text-align: center;
  border: 2px solid red;
  border-radius: 10px;
  color: red;
  box-sizing: border-box;
  margin-top: 1rem;
  padding: 1rem;
  width: 100%;
`;

function App() {
  const tasks = useSelector((state: RootState) => state.tasksList)
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }
  const onAddNewTaskClick = () => {
    setButtonClicked(true);
    if (!inputValue.length) {
      return;
    }

    const id = tasks.length + 1;
    dispatch(taskActions.addTask({
      id,
      title: inputValue,
      status: TaskStatus.Added
    }));
    setInputValue('');
    setButtonClicked(false);
  }
  return (
    <StyledApp>
      <Header>My ToDoList</Header>
      <main>
        <StyledInputWrapper>
          <StyledInput type='text' value={inputValue} onChange={handleChange}></StyledInput>
          <StyledAddTaskButton onClick={onAddNewTaskClick}>
            Add new task
          </StyledAddTaskButton>
        </StyledInputWrapper>
        {!inputValue.length && buttonClicked && <ErrorMessage>Please, add task title</ErrorMessage>}
        <TasksList tasks={tasks} />
      </main>
    </StyledApp>
  );
}

export default App;
