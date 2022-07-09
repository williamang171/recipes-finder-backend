import { useState } from 'react';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/system";

import { useAppSelector } from 'hooks/useReduxHooks';
import ImageToPredict from './ImageToPredict';
import PredictionsList from "./PredictionsList";
import SearchRecipes from 'components/SearchRecipes';
import { useMediaQuery } from '@mui/material';

export default function RecipesFinderOutput() {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const theme = useTheme();
    const overLg = useMediaQuery(theme.breakpoints.up('lg'));

    const { imageUrl, predictions } = useAppSelector((state) => {
        return {
            imageUrl: state.recipesFinder.imageUrl,
            predictions: state.recipesFinder.predictions
        }
    })

    return (
        <Box >
            <Paper sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', flexWrap: overLg ? "nowrap" : "wrap" }}>
                <ImageToPredict imageUrl={imageUrl} />
                <PredictionsList predictions={predictions} setSearchQuery={setSearchQuery} setOpen={setOpen} />
            </Paper>
            <SearchRecipes searchQuery={searchQuery} open={open} setOpen={setOpen} />

        </Box>

    );
}
