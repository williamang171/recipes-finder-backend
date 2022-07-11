import axios from "axios";
import { useCallback, useState } from "react";

import { Image } from "interfaces/types";
import useHandleHttpRequestError from '../useHandleHttpRequestError';

const apiBasePath = "/api/v1/unsplash";

interface UnsplashSearchResponse {
    results: Array<any>,
    total: number,
    total_pages: number
}

export interface SearchPhotosParams {
    page: number,
    query?: string,
    perPage?: number
}

const mapResponseData = (data: UnsplashSearchResponse) => {
    if (Array.isArray(data.results)) {
        return data.results.map(r => {
            return {
                img: r.urls.small,
                imgForSubmit: r.urls.regular,
                author: r.user.username,
                authorLink: r.user?.links?.html
            }
        })
    }
    return [];
}

function useUnsplash() {
    const [data, setData] = useState<Image[]>([]);
    const [nextPage, setNextPage] = useState(1);
    const { handleError } = useHandleHttpRequestError();

    const searchPhotos = useCallback((searchPhotosQuery: SearchPhotosParams) => {
        const { page, perPage = 24, query = "food" } = searchPhotosQuery;
        axios.get(`${apiBasePath}/search?query=${query}&perPage=${perPage}&page=${page}`)
            .then((res) => {
                setData((ds) => ds.concat(mapResponseData(res.data)));
                setNextPage((page) => page + 1);
            }).catch((err) => {
                handleError(err);
            })
    }, [setNextPage, handleError, setData])

    return {
        searchPhotos,
        data,
        nextPage
    }
}

export default useUnsplash