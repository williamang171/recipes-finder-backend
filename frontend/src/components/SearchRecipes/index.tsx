import React, { useEffect, useState, useCallback } from "react";
import { Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import IconButton from "@mui/material/IconButton";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import CloseIcon from "@mui/icons-material/Close"

import RecipesList from "components/RecipesList";
import useMealDb, { SEARCH_TYPE } from "hooks/useHttpAPI/useMealDb";
import RadioSearchType from "./RadioSearchType";
import useListItemExtraBookmark from "./useListItemExtraBookmark";
import NoRecipesFound from "./NoRecipesFound";

interface SearchRecipesProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    searchQuery: string
}

export default function SearchRecipes(props: SearchRecipesProps) {
    const [searchType, setSearchType] = useState(SEARCH_TYPE.INGREDIENT)
    const { open, setOpen, searchQuery } = props;
    const { getMeals, mealsView, reset: resetUseMealDb, emptyResults } = useMealDb();

    const { listItemExtra } = useListItemExtraBookmark({
        fetchSavedRecipes: open
    });

    const handleClose = () => {
        setOpen(false);
        resetUseMealDb();
    }

    const fetchMeals = useCallback(async ({ searchType, searchQuery }) => {
        await getMeals({
            searchQuery,
            searchType
        });
    }, [getMeals])

    useEffect(() => {
        if (!open || !searchQuery || !searchType) {
            return;
        }
        fetchMeals({
            searchQuery,
            searchType
        });
    }, [open, searchQuery, searchType, fetchMeals]);

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchType(e.target.value);
    };

    const renderEmpty = () => {
        if (emptyResults) {
            return <NoRecipesFound searchQuery={searchQuery} searchType={searchType} />
        }
        return null;
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={{
            maxHeight: "90%",
        }}
            maxWidth={'xl'}
            fullWidth
            PaperProps={{
                sx: {
                    minHeight: "94%",
                    maxHeight: "94%",
                    top: '50%',
                    transform: 'translate(0%, -50%)',
                }
            }}
        >
            <DialogTitle>
                <Typography id="modal-modal-title" variant="h6" component="div" mb={1}>
                    Query given: {searchQuery}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 16,
                        top: 16,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <RadioSearchType onChange={handleRadioChange} value={searchType} />
                <RecipesList empty={renderEmpty} recipes={mealsView} listItemExtra={listItemExtra} />

            </DialogContent>
        </Dialog>

    )
}