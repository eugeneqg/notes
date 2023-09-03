import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    note: {
        text: "",
        title: "",
        noteId: "",
        folder: "",
        important: false,
        deleted: false,
        createdAt: 0
    }
}

export const noteSlice = createSlice({
    name: "noteSlice",
    initialState,
    reducers: {
        updateState: (state, action) => {
            state.note = action.payload;
        }
    }
});

export const {updateState} = noteSlice.actions;
export default noteSlice.reducer;