import axios from "axios";
import { useCallback, useContext, useState } from "react";

import { Recipe } from "interfaces/types";
import { useSnackbar } from 'notistack';
import useHandleHttpRequestError from 'hooks/useHandleHttpRequestError';
import { GlobalLoadingContext } from "contexts/GlobalLoadingContext";

const apiBasePath = "/api/v1/recipes";

function useRecipes() {
    const { handleError } = useHandleHttpRequestError();
    const { enqueueSnackbar } = useSnackbar();
    const [recipes, setRecipes] = useState<Array<Recipe>>([]);
    // const [pending, setPending] = useState(false);
    const { setLoading } = useContext(GlobalLoadingContext);

    const getOptions = useCallback(() => {
        const t = localStorage.getItem("token");
        return {
            headers: {
                authorization: `Bearer ${t}`
            }
        }
    }, []);

    const createRecipe = useCallback(async (values: Recipe) => {
        setLoading(true);
        axios.post(`${apiBasePath}/`, values, getOptions())
            .then((res) => {
                const newRecipes = [
                    ...recipes,
                    res.data
                ]
                setRecipes(newRecipes);
                enqueueSnackbar("Recipe saved");
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                handleError(err);
            })
    }, [getOptions, recipes, enqueueSnackbar, setLoading, handleError])

    const removeRecipe = useCallback(async (id) => {
        setLoading(true);
        axios.delete(`${apiBasePath}/${id}`, getOptions())
            .then(() => {
                const newRecipes = recipes.filter((r) => {
                    return r.id !== id;
                })
                setRecipes(newRecipes);
                enqueueSnackbar("Recipe removed");
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                handleError(err);
            })
    }, [getOptions, recipes, enqueueSnackbar, setLoading, handleError])

    const getRecipes = useCallback(async () => {
        setLoading(true);
        // const options = await getOptions();
        axios.get(`${apiBasePath}/`, getOptions())
            .then((res) => {
                setLoading(false);
                setRecipes(res.data.results)
            }).catch((err) => {
                setLoading(false);
                handleError(err);
            })
    }, [getOptions, setLoading, handleError])

    return {
        recipes,
        createRecipe,
        getRecipes,
        removeRecipe
    }
}

export default useRecipes