import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, TextField } from "@mui/material";
import debounce from "lodash/debounce";

import useMealDb, { SEARCH_TYPE } from "hooks/useHttpAPI/useMealDb";
import RecipesList from "components/RecipesList";
import RadioSearchType from "./RadioSearchType";
import useListItemExtraBookmark from "./useListItemExtraBookmark";
import NoRecipesFound from "./NoRecipesFound";

export default function SearchRecipesViaText() {
    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState(SEARCH_TYPE.INGREDIENT);
    const { getMeals, mealsView, loading, emptyResults } = useMealDb();

    useEffect(() => {
        getMeals({
            searchQuery: searchQuery,
            searchType: searchType
        })
    }, [searchQuery, searchType, getMeals])

    const { listItemExtra } = useListItemExtraBookmark({
        fetchSavedRecipes: true
    });

    const handleRadioChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchType(e.target.value);
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, []);

    const handleUpdateSearchQuery = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const debouncedUpdateSearchQuery = useMemo(() => {
        return debounce(handleUpdateSearchQuery, 300);
    }, [handleUpdateSearchQuery])

    const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        debouncedUpdateSearchQuery(e);
    }, [handleChange, debouncedUpdateSearchQuery]);

    const renderEmpty = () => {
        if (emptyResults) {
            return <NoRecipesFound searchQuery={searchQuery} searchType={searchType} />
        }
        return null;
    }

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
    }, [])

    return <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
        <TextField fullWidth value={search} onChange={handleChangeInput} sx={{
            mb: 1
        }} variant='outlined' label='Search Query' size="small"
            autoFocus
        />
        <RadioSearchType onChange={handleRadioChange} value={searchType} />
        <RecipesList loading={loading} empty={renderEmpty} recipes={mealsView} listItemExtra={listItemExtra} />
        <Box sx={{ mb: 2 }} />
    </Box>
}