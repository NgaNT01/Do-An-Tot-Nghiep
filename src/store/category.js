import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    "Games",
    "Music",
    "Sports",
    "Movie",
    "Dances",
    "Idols"
];

export const category = createSlice({
  name: "category",
  initialState: initialState,
});

export default category.reducer;
