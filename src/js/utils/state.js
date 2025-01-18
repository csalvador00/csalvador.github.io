import { createSlice, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { STORAGEKEY, ACTIONTYPE } from "./enums.config.js";

let loading = createSlice(
    {
        name: ACTIONTYPE.LOADING,
        initialState: {
            value: false,
        },
        reducers: {
            startLoading: state => {
                state.value = true;
            },
            stopLoading: state => {
                state.value = false;
            }
        }
    });

let drag = createSlice(
    {
        name: ACTIONTYPE.DRAGGING,
        initialState: {
            value: false,
        },
        reducers: {
            startDragging: state => {
                state.value = true;
            },
            stopDragging: state => {
                state.value = false;
            }
        }
    });

let dragObjectType = createSlice(
    {
        name: ACTIONTYPE.DRAGOBJTYPE,
        initialState: {
            value: null,
        },
        reducers: {
            setObjtType: ( state, payload) => {
                state.value = payload.payload;
            },
            clearObjectType: state => {
                state.value = null;
            }
        }
    });

let draggableAreaPosition = createSlice(
    {
        name: ACTIONTYPE.DRAGGABLEAREAPOSITION,
        initialState: {
            value: {
                x: 0,
                z: 0
            },
        },
        reducers: {
            setDraggableAreaPosition: (state, payload) => {
                state.value = {x: payload.x, z: payload.z}
            },
            clearDraggableAreaPosition: (state, payload) => {
                state.value = {x: 0, z: 0}
            }
        }
    });

let gridItemsList = createSlice(
    {
        name: ACTIONTYPE.GRIDITEMSLIST,
        initialState: {
            value: [],
        },
        reducers: {
            updateGridItemsList: ( state, payload) => {
                state.value = payload.payload;
                window.localStorage.setItem( STORAGEKEY.GRIDITEMS, JSON.stringify(payload.payload));
            }
        }
    });


export const { startLoading, stopLoading } = loading.actions;
export const { startDragging, stopDragging } = drag.actions;
export const { setObjtType, clearObjectType } = dragObjectType.actions;
export const { setDraggableAreaPosition, clearDraggableAreaPosition } = draggableAreaPosition.actions;
export const { updateGridItemsList } = gridItemsList.actions;

export const store = configureStore({
    reducer: {
        isLoading: loading.reducer,
        isDragging: drag.reducer,
        objectType: dragObjectType.reducer,
        draggableAreaPosition: draggableAreaPosition.reducer,
        gridItemsList: gridItemsList.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});

window["store"] = store;