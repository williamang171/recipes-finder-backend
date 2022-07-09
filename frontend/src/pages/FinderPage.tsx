import { Box } from "@mui/material"
import ErrorFallback from "components/ErrorFallback";

import NewUserAlert from "components/NewUserAlert";
import Layout from "components/Layout"
import RecipesFinderInput from "components/RecipesFinderInput";
import RecipesFinderOutput from "components/RecipesFinderOutput";
import { useAppSelector } from "hooks/useReduxHooks";
import { ErrorBoundary } from "react-error-boundary";

export default function FinderPage() {
    const { tab } = useAppSelector(state => {
        return {
            tab: state.recipesFinder.tab
        }
    });

    return <Layout>
        <NewUserAlert />
        <RecipesFinderInput />
        <Box sx={{ mb: 4 }} />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            {tab === 2 ? null : <RecipesFinderOutput />}
        </ErrorBoundary>
    </Layout>
} 