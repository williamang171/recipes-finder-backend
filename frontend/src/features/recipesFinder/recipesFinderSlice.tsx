import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Prediction } from "interfaces/types";

interface RecipesFinderState {
    tab: number,
    predictions: Array<Prediction>,
    imageUrl: string | null
}

const initialState: RecipesFinderState = {
    tab: parseInt(localStorage.getItem("primaryFindMethod") || "0") || 0,
    predictions: [],
    imageUrl: ""
}

const recipesFinderSlice = createSlice({
    name: 'recipesFinder',
    initialState: initialState,
    reducers: {
        setTab(state, action: PayloadAction<number>) {
            state.tab = action.payload;
        },
        setPredictions(state, action: PayloadAction<Array<Prediction>>) {
            state.predictions = action.payload;
        },
        clearPredictions(state) {
            state.predictions = [];
        },
        setImageUrl(state, action: PayloadAction<string | null>) {
            state.imageUrl = action.payload
        },
        clearImageUrl(state) {
            state.imageUrl = ""
        }
    }
})

export const { setPredictions, clearPredictions, setImageUrl, clearImageUrl, setTab } = recipesFinderSlice.actions

export default recipesFinderSlice.reducer