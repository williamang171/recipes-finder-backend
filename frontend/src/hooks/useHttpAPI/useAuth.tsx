import axios from "axios";
import { useCallback, useContext, useState } from "react";

import { User, UserLogin } from "interfaces/types";
import { useSnackbar } from 'notistack';
import useHandleHttpRequestError from '../useHandleHttpRequestError';
import { AuthContext } from "contexts/AuthContext";

const apiBasePath = "/users";

function useAuth() {
    const { setIsAuthenticated, setUser, user, isAuthenticated } = useContext(AuthContext);
    const { handleError } = useHandleHttpRequestError();
    const { enqueueSnackbar } = useSnackbar();
    const [pending, setPending] = useState(false);

    const register = useCallback(async (values: User, successCallback?: Function) => {
        setPending(true);
        axios.post(`${apiBasePath}/`, values)
            .then((res) => {
                setUser(res.data);
                enqueueSnackbar("Sign up successful, you can now sign in with your credentials");
                setPending(false);
                if (successCallback) {
                    successCallback();
                }
            }).catch(err => {
                setPending(false);
                handleError(err);
            })
    }, [enqueueSnackbar, setPending, handleError])

    const login = useCallback(async (values: UserLogin, successCallback?: Function) => {
        setPending(true);
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("password", values.password);
        axios.post(`/token`, formData)
            .then((res) => {
                setPending(false);
                localStorage.setItem("token", res.data.access_token);
                setIsAuthenticated(true);
                if (successCallback) {
                    successCallback();
                }
            }).catch(err => {
                setPending(false);
                handleError(err);
            })
    }, [setPending, handleError]);

    const loadCurrentUser = useCallback(async () => {
        setPending(true);
        const token = localStorage.getItem("token");
        axios.get(`/users/me`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setPending(false);
                setUser(res.data);
                setIsAuthenticated(true);
            }).catch(err => {
                setPending(false);
                handleError(err);
            })
    }, [setPending, handleError])

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
        pending,
        loadCurrentUser,
        isAuthenticated
    }
}

export default useAuth