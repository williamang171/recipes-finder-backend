import { useEffect, useCallback } from "react";
import { Box, IconButton } from "@mui/material";
import Alert from '@mui/material/Alert';
import { useAuth0 } from "@auth0/auth0-react";
import DeleteIcon from '@mui/icons-material/Delete';

import { Recipe } from "interfaces/types";
import Layout from "components/Layout";
import RecipesList from "components/RecipesList";
import useRecipes from "hooks/useHttpAPI/useRecipes";

export default function SavedRecipesPage() {
    const { recipes, getRecipes, removeRecipe, pending } = useRecipes();
    const { isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        getRecipes();
    }, [getRecipes]);

    const handleDeleteClick = useCallback((id: any) => {
        removeRecipe(id);
    }, [removeRecipe])

    const listItemExtra = useCallback((recipe: Recipe) => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pl: 1, pb: 1, mr: 1 }}>
                <IconButton onClick={() => {
                    handleDeleteClick(recipe.id)
                }}
                >
                    <DeleteIcon fontSize='medium' />
                </IconButton>
            </Box>
        )
    }, [handleDeleteClick]);

    const renderEmpty = useCallback(() => {
        if (isLoading) {
            return null;
        }
        return <Alert severity="info">
            No saved recipes yet
        </Alert>
    }, [isLoading]);

    return <Layout>
        {<RecipesList empty={renderEmpty} loading={pending || isLoading} recipes={recipes} listItemExtra={listItemExtra} />}
    </Layout>
}