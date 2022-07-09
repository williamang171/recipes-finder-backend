import { configureStore } from '@reduxjs/toolkit'
import recipesFinderReducer from 'features/recipesFinder/recipesFinderSlice'

export const store = configureStore({
    reducer: {
        recipesFinder: recipesFinderReducer,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch