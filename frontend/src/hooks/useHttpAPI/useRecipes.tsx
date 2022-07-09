
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import { useCallback, useState } from "react";
import { pick } from 'lodash';

import { Recipe } from "interfaces/types";
import { useSnackbar } from 'notistack';
import useHandleHttpRequestError from '../useHandleHttpRequestError';

const apiBasePath = "/recipes";

function useRecipes() {
    const { getAccessTokenSilently } = useAuth0();
    const { handleError } = useHandleHttpRequestError();
    const { enqueueSnackbar } = useSnackbar();
    const [recipes, setRecipes] = useState<Array<Recipe>>([]);
    const [pending, setPending] = useState(false);

    const getOptions = useCallback(async () => {
        const t = await getAccessTokenSilently();
        return {
            headers: {
                authorization: `Bearer ${t}`
            }
        }
    }, [getAccessTokenSilently]);

    const createRecipe = useCallback(async (values: Recipe) => {

        setPending(true);
        axios.post(`${apiBasePath}/`, values)
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
        axios.delete(`${apiBasePath}/${id}`)
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
        axios.get(`${apiBasePath}/`)
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