import { useCallback, useContext, useState } from "react";
import axios from "axios";
import useHandleHttpRequestError from "hooks/useHandleHttpRequestError";
import { GlobalLoadingContext } from "contexts/GlobalLoadingContext";

const baseUrl = "https://www.themealdb.com/api/json/v1/1";

export const SEARCH_TYPE = {
    MEAL_NAME: "mealName",
    INGREDIENT: "ingredient"
}

export interface GetMealsOptions {
    searchQuery: string;
    searchType: string
}

export default function useMealDb() {
    const [meals, setMeals] = useState([]);
    const [mealsView, setMealsView] = useState([]);
    const [emptyResults, setEmptyResults] = useState(false);
    const { handleError } = useHandleHttpRequestError();
    const { setLoading, loading } = useContext(GlobalLoadingContext);

    const getMeals = useCallback(async (options: GetMealsOptions) => {
        const { searchType, searchQuery } = options;
        if (!searchQuery) {
            setMeals([]);
            setMealsView([]);
            return;
        }
        setEmptyResults(false);
        setLoading(true);
        const reqUrl = searchType === SEARCH_TYPE.INGREDIENT ? `${baseUrl}/filter.php?i=${searchQuery}` : `${baseUrl}/search.php?s=${searchQuery}`;
        try {
            const res = await axios.get(reqUrl);
            setMeals(res.data.meals || []);
            setLoading(false);
            if (Array.isArray(res.data.meals)) {
                setMealsView(res.data.meals.map((m: any) => {
                    return {
                        mealdb_id: m.idMeal,
                        name: m.strMeal,
                        image_url: m.strMealThumb,
                        url: `https://themealdb.com/meal.php?c=${m.idMeal}`
                    }
                }));
            }
            else {
                setMealsView([]);
                setEmptyResults(true);
            }
            return res;
        } catch (err) {
            handleError(err);
            setLoading(false);
            setEmptyResults(true);
        }
    }, [handleError, setLoading, setMeals, setMealsView, setEmptyResults])

    const reset = useCallback(() => {
        setMeals([]);
        setMealsView([]);
        setLoading(false);
        setEmptyResults(false);
    }, [setMeals, setMealsView, setLoading, setEmptyResults])

    return {
        getMeals,
        loading,
        meals,
        mealsView,
        reset,
        emptyResults
    }
}