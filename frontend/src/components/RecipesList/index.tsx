
import { Grid, Box } from "@mui/material";

import RecipeListItem from "components/RecipesList/RecipeListItem";
import { Recipe } from "interfaces/types";
import GlobalLoader from "components/GlobalLoader";

interface Props {
    recipes: Array<Recipe>,
    listItemExtra?(recipe: Recipe): any,
    loading?: boolean,
    empty?(): any
}

export default function RecipesList(props: Props) {
    const { recipes = [], empty, listItemExtra, loading = false } = props;

    if (recipes.length === 0 && loading === false && empty) {
        return empty();
    }

    return (
        <Box sx={{ position: "relative" }}>
            <GlobalLoader loading={loading} />
            <Grid container spacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}
            >
                {recipes.map((r, i) => {
                    return (
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={i}>
                            <RecipeListItem extra={listItemExtra} name={r.name} url={r.url} imageUrl={r.image_url} mealDbId={r.mealdb_id} id={r.id} />
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}