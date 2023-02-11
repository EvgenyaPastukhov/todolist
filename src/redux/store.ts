import { configureStore } from "@reduxjs/toolkit";
import { RootState } from "../types/rootState";
import  taskActions from './actions'

const initialState: RootState = {
    tasksList: []
};

const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case taskActions.addTask.type: {
            return {
                ...state,
                tasksList: [
                    ...state.tasksList,
                    action.payload
                ]
            };
        }

        case taskActions.editTask.type: {
            const idx = state.tasksList.findIndex(el => el.id === action.payload.id);
            const tasksList = [
                ...state.tasksList
            ];
            tasksList.splice(idx, 1, action.payload);

            return {
                ...state,
                tasksList: [
                    ...tasksList,

                ]
            }
        }

        case taskActions.deleteTask.type: {
            const idx = state.tasksList.findIndex(el => el.id === action.payload);
            debugger
            const tasksList = [
                ...state.tasksList
            ];
            tasksList.splice(idx, 1);

            return {
                ...state,
                tasksList: [
                    ...tasksList,

                ]
            }
        }

        default: return state;
    }
}

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState
});