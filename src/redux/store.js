import { configureStore } from '@reduxjs/toolkit';
import noteSlice from "../redux/note-slice";

export const store = configureStore({
    reducer: {
        noteData: noteSlice
    }
})