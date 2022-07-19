import axios from "axios";
import { useCallback, useContext, useState } from "react";

import { User, UserLogin } from "interfaces/types";
import { useSnackbar } from 'notistack';
import useHandleHttpRequestError from '../useHandleHttpRequestError';
import { AuthContext } from "contexts/AuthContext";

const apiBasePath = "/api/v1/auth";

function useAuth() {
    const { setIsAuthenticated, setUser, user, isAuthenticated } = useContext(AuthContext);
    const { handleError } = useHandleHttpRequestError();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const register = useCallback(async (values: User, successCallback?: Function) => {
        setLoading(true);
        axios.post(`${apiBasePath}/register`, values)
            .then((res) => {
                setUser(res.data);
                enqueueSnackbar("Sign up successful, you can now sign in with your credentials");
                setLoading(false);
                if (successCallback) {
                    successCallback();
                }
            }).catch((err) => {
                setLoading(false);
                handleError(err);
            })
    }, [enqueueSnackbar, setLoading, handleError])

    const login = useCallback(async (values: UserLogin, successCallback?: Function) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("password", values.password);
        axios.post(`${apiBasePath}/token`, formData)
            .then((res) => {
                setLoading(false);
                localStorage.setItem("token", res.data.access_token);
                setIsAuthenticated(true);
                if (successCallback) {
                    successCallback();
                }
            }).catch(err => {
                setLoading(false);
                handleError(err);
            })
    }, [setLoading, handleError]);

    const loadCurrentUser = useCallback(async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        axios.get(`${apiBasePath}/me`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setLoading(false);
                setUser(res.data);
                setIsAuthenticated(true);
            }).catch(err => {
                setLoading(false);
                handleError(err);
            })
    }, [setLoading, handleError])

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
    }, [])

    return {
        register,
        login,
        logout,
        user,
        loading,
        loadCurrentUser,
        isAuthenticated
    }
}

export default useAuth