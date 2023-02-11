import { createAction } from '@reduxjs/toolkit';
import { TaskType } from '../types/task';

const taskActions = {
    addTask: createAction<TaskType>('addTask'),
    editTask: createAction<any>('editTask'),
    deleteTask: createAction<any>('deleteTask'),
};

export default taskActions;