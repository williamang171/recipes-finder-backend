import React, { useCallback, useMemo, useEffect } from "react";
import { Box, Tooltip } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { styled } from "@mui/system";

import { Recipe } from "interfaces/types";
import useRecipes from "hooks/useHttpAPI/useRecipes";

interface StyledIconButtonProps extends IconButtonProps {
    isAuthenticated?: boolean
}

const StyledIconButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'isAuthenticated',
})<StyledIconButtonProps>(({ isAuthenticated, theme }) => ({
    ...(isAuthenticated === false && {
        ':hover': {
            cursor: "not-allowed",
        }
    }),
}));

interface ListItemExtraBookmarkIconProps {
    found: boolean | Object,
    isAuthenticated: boolean
}

const ListItemExtraBookmarkIcon = React.memo((props: ListItemExtraBookmarkIconProps) => {
    const { found, isAuthenticated } = props;
    if (isAuthenticated) {
        return found ?
            <BookmarkIcon fontSize='medium' /> :
            <BookmarkBorderIcon fontSize='medium' />
    }
    return <Tooltip title="Please log in first to save the recipe">
        <BookmarkBorderIcon fontSize='medium' />
    </Tooltip>
});

interface Props {
    fetchSavedRecipes: boolean
}

export default function useListItemExtraBookmark(props: Props) {
    const { fetchSavedRecipes } = props;
    const { isAuthenticated } = useAuth0();
    const { createRecipe, getRecipes: getSavedRecipes, recipes: savedRecipes = [], removeRecipe, pending: reqPending } = useRecipes();

    useEffect(() => {
        if (isAuthenticated && fetchSavedRecipes) {
            getSavedRecipes();
        }
    }, [getSavedRecipes, isAuthenticated, fetchSavedRecipes]);

    const savedRecipesMapByMealId = useMemo(() => {
        const obj: Record<string, Recipe> = {};
        savedRecipes.forEach((r: Recipe) => {
            if (r.mealDbId) {
                obj[r.mealDbId] = r
            }
        });
        return obj;
    }, [savedRecipes]);

    const listItemExtra = useCallback((recipe: Recipe) => {
        const found = recipe.mealDbId ? savedRecipesMapByMealId[recipe.mealDbId] : false;

        return (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pl: 1, pb: 1, mr: 1 }}>
                <StyledIconButton isAuthenticated={isAuthenticated} onClick={() => {
                    if (!isAuthenticated) {
                        return;
                    }
                    if (found) {
                        removeRecipe(found.id);
                        return;
                    }
                    createRecipe(recipe);
                }}
                >
                    <ListItemExtraBookmarkIcon found={found} isAuthenticated={isAuthenticated} />
                </StyledIconButton>
            </Box>
        )
    }, [isAuthenticated, savedRecipesMapByMealId, createRecipe, removeRecipe])

    return {
        listItemExtra,
        getRecipesPending: reqPending
    }
}