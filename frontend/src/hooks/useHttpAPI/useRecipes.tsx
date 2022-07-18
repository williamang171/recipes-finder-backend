import axios from "axios";
import { useCallback, useState } from "react";

import { Recipe } from "interfaces/types";
import { useSnackbar } from 'notistack';
import useHandleHttpRequestError from 'hooks/useHandleHttpRequestError';

const apiBasePath = "/api/v1/recipes";

function useRecipes() {
    const { handleError } = useHandleHttpRequestError();
    const { enqueueSnackbar } = useSnackbar();
    const [recipes, setRecipes] = useState<Array<Recipe>>([]);
    const [pending, setPending] = useState(false);

    const getOptions = useCallback(() => {
        const t = localStorage.getItem("token");
        return {
            headers: {
                authorization: `Bearer ${t}`
            }
        }
    }, []);

    const createRecipe = useCallback(async (values: Recipe) => {
        setPending(true);
        axios.post(`${apiBasePath}/`, values, getOptions())
            .then((res) => {
                const newRecipes = [
                    ...recipes,
                    res.data
                ]
                setRecipes(newRecipes);
                enqueueSnackbar("Recipe saved");
                setPending(false);
            }).catch(err => {
                setPending(false);
                handleError(err);
            })
    }, [getOptions, recipes, enqueueSnackbar, setPending, handleError])

    const removeRecipe = useCallback(async (id) => {
        setPending(true);
        axios.delete(`${apiBasePath}/${id}`, getOptions())
            .then(() => {
                const newRecipes = recipes.filter((r) => {
                    return r.id !== id;
                })
                setRecipes(newRecipes);
                enqueueSnackbar("Recipe removed");
                setPending(false);
            }).catch((err) => {
                setPending(false);
                handleError(err);
            })
    }, [getOptions, recipes, enqueueSnackbar, setPending, handleError])

    const getRecipes = useCallback(async () => {
        setPending(true);
        // const options = await getOptions();
        axios.get(`${apiBasePath}/`, getOptions())
            .then((res) => {
                setPending(false);
                setRecipes(res.data.results)
            }).catch((err) => {
                setPending(false);
                handleError(err);
            })
    }, [getOptions, setPending, handleError])

    return {
        recipes,
        createRecipe,
        getRecipes,
        removeRecipe,
        pending
    }
}

export default useRecipes