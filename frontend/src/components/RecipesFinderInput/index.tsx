import { useCallback, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useAppSelector, useAppDispatch } from 'hooks/useReduxHooks';

import { setPredictions, setImageUrl, setTab } from "features/recipesFinder/recipesFinderSlice"
import { Prediction } from 'interfaces/types';
import SearchRecipesViaText from 'components/SearchRecipes/SearchRecipesViaText';

import InputViaUpload from "./InputViaUpload";
import InputViaUrl from "./InputViaUrl";
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'components/ErrorFallback';

export default function RecipesFinderInput() {
    const dispatch = useAppDispatch();
    const { imageUrl, tab } = useAppSelector((state) => {
        return {
            imageUrl: state.recipesFinder.imageUrl,
            tab: state.recipesFinder.tab,
        }
    })

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        dispatch(setPredictions([]));
        dispatch(setImageUrl(""));
        dispatch(setTab(newValue));
    };

    const dispatchSetImageUrl = useCallback((imageUrl: string) => {
        dispatch(setImageUrl(imageUrl))
    }, [dispatch]);

    const dispatchSetPredictions = useCallback((predictions: Array<Prediction>) => {
        dispatch(setPredictions(predictions));
    }, [dispatch])

    useEffect(() => {
        return function reset() {
            dispatch(setTab(0));
        }
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleChangeTab} aria-label="input tabs">
                    <Tab label="Image via URL" />
                    <Tab label="Image via Upload" />
                    <Tab label="Text" />
                </Tabs>
            </Box>
            <Box sx={{ mt: 3 }} />
            <ErrorBoundary FallbackComponent={ErrorFallback} >
                {tab === 0 && <InputViaUrl setImageUrl={dispatchSetImageUrl} imageUrl={imageUrl} setPredictions={dispatchSetPredictions} />}
                {tab === 1 && <InputViaUpload setImageUrl={dispatchSetImageUrl} setPredictions={dispatchSetPredictions} />}
                {tab === 2 && <SearchRecipesViaText />}
            </ErrorBoundary>
        </Box>
    )
}